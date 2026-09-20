/* ─────────────────────────────────────────────────────────────
   Worker الموقع الرسمي rwasim.sa:
   - يقدّم أصول public/ (مع توجيه SPA لمسارات الصفحات)
   - GET  /api/content  محتوى الموقع الحي من قاعدة D1 (تحرره لوحة ديوان)
   - POST /api/hit      عدّاد الزيارات (بلا كوكيز ولا بيانات شخصية)
   - GET  /files/<key>  تقديم ملفات R2 المرفوعة من اللوحة
   ───────────────────────────────────────────────────────────── */

export default {
  async fetch(request, env) {
    const url = new URL(request.url)

    /* ══ عدّاد الزيارات: إشارة من المتصفح لكل صفحة تُعرض ══
       بلا كوكيز ولا تخزين لأي بيانات شخصية — عدّ يومي لكل مسار فقط */
    if (url.pathname === '/api/hit' && request.method === 'POST') {
      if (!env.DB) return new Response(null, { status: 204 })
      try {
        const ua = request.headers.get('user-agent') || ''
        if (/bot|crawl|spider|preview|facebookexternalhit|whatsapp/i.test(ua)) return new Response(null, { status: 204 })
        const { path } = await request.json()
        const clean = typeof path === 'string' ? path.split('?')[0].slice(0, 100) : '/'
        const day = new Date().toISOString().slice(0, 10)
        await env.DB.prepare(
          `INSERT INTO hits (day, path, count) VALUES (?, ?, 1)
           ON CONFLICT(day, path) DO UPDATE SET count = count + 1`).bind(day, clean).run()
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
