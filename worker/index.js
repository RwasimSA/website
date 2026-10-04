/* ─────────────────────────────────────────────────────────────
   Worker الموقع الرسمي rwasim.sa:
   - يقدّم أصول public/ (مع توجيه SPA لمسارات الصفحات)
   - GET  /api/content  محتوى الموقع الحي من قاعدة D1 (تحرره لوحة ديوان)
   - POST /api/hit      عدّاد الزيارات (بلا كوكيز ولا بيانات شخصية)
   - GET  /files/<key>  تقديم ملفات R2 المرفوعة من اللوحة
   - POST /api/forms    استبانتا الشراكة والتطوع (تُحفظ وتظهر في لوحة ديوان)
   ───────────────────────────────────────────────────────────── */

/* حقول الاستبانتين — مطابقة للنموذج في الموقع (src/components/RequestForm.jsx) */
const FORM_SPECS = {
  partner: {
    title: 'طلب شراكة',
    fields: ['org', 'orgType', 'contactName', 'role', 'phone', 'email', 'area', 'details'],
    required: ['org', 'orgType', 'contactName', 'phone', 'email', 'area', 'details'],
    long: ['details'],
    labels: { org: 'اسم الجهة', orgType: 'نوع الجهة', contactName: 'اسم المسؤول', role: 'المسمى الوظيفي',
      phone: 'الجوال', email: 'البريد', area: 'مجال الشراكة', details: 'نبذة عن الشراكة' },
  },
  volunteer: {
    title: 'طلب تطوع',
    fields: ['name', 'gender', 'age', 'city', 'phone', 'email', 'qualification', 'areas', 'availability', 'experience'],
    required: ['name', 'gender', 'age', 'city', 'phone', 'areas', 'availability'],
    long: ['experience'],
    labels: { name: 'الاسم', gender: 'الجنس', age: 'الفئة العمرية', city: 'المدينة', phone: 'الجوال', email: 'البريد',
      qualification: 'المؤهل والتخصص', areas: 'مجالات الاهتمام', availability: 'الوقت المتاح', experience: 'خبرات سابقة' },
  },
}

const sha256hex = async (s) => [...new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(s)))]
  .map((b) => b.toString(16).padStart(2, '0')).join('')

/* إشعار بريدي بالطلب الجديد — يعمل فقط حين يُربط بريد الإرسال (NOTIFY)
   عبر توجيه البريد في Cloudflare، والمستلم عنوان موثّق (info@rwasim.sa) */
async function notifyByEmail(env, kind, data) {
  if (!env.NOTIFY || !env.NOTIFY_FROM || !env.NOTIFY_TO) return
  const spec = FORM_SPECS[kind]
  const { EmailMessage } = await import('cloudflare:email')
  const b64 = (str) => btoa(unescape(encodeURIComponent(str)))
  const lines = spec.fields
    .filter((k) => (Array.isArray(data[k]) ? data[k].length : data[k]))
    .map((k) => `${spec.labels[k]}: ${Array.isArray(data[k]) ? data[k].join('، ') : data[k]}`)
  const body = `${spec.title} جديد من موقع رواسم\n\n${lines.join('\n')}\n\nتجد كل الطلبات في لوحة التحكم ← الطلبات الواردة:\nhttps://cms.rwasim.sa`
  const subject = `${spec.title} جديد — ${data.org || data.name || ''}`.trim()
  const mime = [
    `From: =?UTF-8?B?${b64('موقع رواسم')}?= <${env.NOTIFY_FROM}>`,
    `To: ${env.NOTIFY_TO}`,
    `Subject: =?UTF-8?B?${b64(subject)}?=`,
    `Message-ID: <${crypto.randomUUID()}@rwasim.sa>`,
    `Date: ${new Date().toUTCString()}`,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: base64',
    '',
    b64(body).replace(/.{76}/g, '$&\r\n'),
  ].join('\r\n')
  await env.NOTIFY.send(new EmailMessage(env.NOTIFY_FROM, env.NOTIFY_TO, mime))
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url)

    /* ══ استبانتا «كن شريكاً» و«تطوع معنا» ══
       حماية خفيفة بلا إزعاج للزائر: حقل مخفي يملؤه الآليون فقط، ورفض
       الإرسال الفوري غير البشري، وحدّ 5 طلبات في الساعة لكل اتصال
       (بصمة مجزّأة يومياً لا تُعيد عنوان الاتصال) */
    if (url.pathname === '/api/forms' && request.method === 'POST') {
      if (!env.DB) return Response.json({ error: 'الخدمة غير متاحة حالياً' }, { status: 503 })
      let body
      try { body = await request.json() } catch { return Response.json({ error: 'بيانات غير صالحة' }, { status: 400 }) }
      const spec = FORM_SPECS[body?.kind]
      if (!spec) return Response.json({ error: 'نوع الطلب غير معروف' }, { status: 400 })
      if (body.hp || (typeof body.t === 'number' && body.t < 1500)) return Response.json({ ok: true })

      const src = body.fields && typeof body.fields === 'object' ? body.fields : {}
      const data = {}
      for (const k of spec.fields) {
        const v = src[k]
        if (Array.isArray(v)) data[k] = v.filter((x) => typeof x === 'string').map((x) => x.trim().slice(0, 80)).filter(Boolean).slice(0, 12)
        else data[k] = typeof v === 'string' ? v.trim().slice(0, spec.long.includes(k) ? 2000 : 200) : ''
      }
      const missing = spec.required.filter((k) => (Array.isArray(data[k]) ? !data[k].length : !data[k]))
      if (missing.length) return Response.json({ error: 'أكمل الحقول المطلوبة' }, { status: 400 })
      if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) return Response.json({ error: 'البريد الإلكتروني غير صحيح' }, { status: 400 })

      try {
        const day = new Date().toISOString().slice(0, 10)
        const ipHash = await sha256hex(`${request.headers.get('cf-connecting-ip') || ''}|${day}|rwasim-forms`)
        const recent = await env.DB.prepare(
          `SELECT COUNT(*) AS n FROM submissions WHERE ip_hash = ? AND created_at > datetime('now', '-1 hour')`).bind(ipHash).first()
        if (recent && recent.n >= 5) return Response.json({ error: 'استقبلنا طلبات كثيرة من اتصالك — حاول بعد قليل' }, { status: 429 })
        await env.DB.prepare('INSERT INTO submissions (kind, data, ip_hash) VALUES (?, ?, ?)')
          .bind(body.kind, JSON.stringify(data), ipHash).run()
      } catch {
        return Response.json({ error: 'تعذّر حفظ الطلب — أعد المحاولة' }, { status: 500 })
      }
      if (ctx) ctx.waitUntil(notifyByEmail(env, body.kind, data).catch(() => {}))
      return Response.json({ ok: true })
    }

    /* ══ عدّاد الزيارات: إشارة من المتصفح لكل صفحة تُعرض ══
       بلا كوكيز ولا تخزين لأي بيانات شخصية — عدّ يومي فقط:
       hits   = مشاهدات الصفحات لكل مسار (كل تنقّل)
       visits = الزيارات (مرة لكل جلسة، يحددها المتصفح بـ visit: true) */
    if (url.pathname === '/api/hit' && request.method === 'POST') {
      if (!env.DB) return new Response(null, { status: 204 })
      try {
        const ua = request.headers.get('user-agent') || ''
        if (/bot|crawl|spider|preview|facebookexternalhit|whatsapp/i.test(ua)) return new Response(null, { status: 204 })
        const { path, visit } = await request.json()
        const clean = typeof path === 'string' ? path.split('?')[0].slice(0, 100) : '/'
        const day = new Date().toISOString().slice(0, 10)
        const ops = [env.DB.prepare(
          `INSERT INTO hits (day, path, count) VALUES (?, ?, 1)
           ON CONFLICT(day, path) DO UPDATE SET count = count + 1`).bind(day, clean)]
        if (visit === true) ops.push(env.DB.prepare(
          `INSERT INTO visits (day, count) VALUES (?, 1)
           ON CONFLICT(day) DO UPDATE SET count = count + 1`).bind(day))
        await env.DB.batch(ops)
      } catch { /* الإحصاء لا يُفشل شيئاً */ }
      return new Response(null, { status: 204 })
    }

    /* ══ محتوى الموقع من قاعدة D1 — يقرأه الموقع وقت التشغيل ══ */
    if (url.pathname === '/api/content' && request.method === 'GET') {
      if (!env.DB) return Response.json({ error: 'القاعدة غير مربوطة بعد' }, { status: 501 })
      const { results } = await env.DB.prepare('SELECT key, value FROM content').all()
      const out = {}
      for (const r of results) out[r.key] = JSON.parse(r.value)
      return Response.json(out, { headers: { 'cache-control': 'public, max-age=60' } })
    }

    /* ══ تخزين الملفات على R2 ══ */
    if (url.pathname.startsWith('/files/')) {
      if (!env.FILES) return new Response('تخزين الملفات غير مفعّل بعد', { status: 501 })
      const key = decodeURIComponent(url.pathname.slice('/files/'.length))
      const obj = await env.FILES.get(key)
      if (!obj) return new Response('الملف غير موجود', { status: 404 })
      const headers = new Headers()
      obj.writeHttpMetadata(headers)
      headers.set('cache-control', 'public, max-age=31536000, immutable')
      return new Response(obj.body, { headers })
    }

    /* كل ما عدا ذلك: أصول الموقع الثابتة */
    return env.ASSETS.fetch(request)
  },
}
