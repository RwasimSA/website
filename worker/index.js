/* ─────────────────────────────────────────────────────────────
   Worker الموقع: يقدّم أصول public/ كما هي، ويضيف بوابة دخول
   GitHub OAuth للوحة التحكم (/admin — Decap CMS) على مسارين:

   GET /api/oauth/authorize  → تحويل لصفحة موافقة GitHub
   GET /api/oauth/callback   → تبادل الكود بتوكن وإعادته للوحة

   ويوفر تخزين ملفات على Cloudflare R2 (اختيار الجمعية):

   GET  /files/<key>   → تقديم ملف من حاوية R2 (كاش سنة)
   POST /api/media     → رفع ملف (multipart: file) — محمي: يتطلب
                         Authorization: token <github> لحساب له
                         صلاحية دفع على مستودع الموقع

   يتطلب في إعدادات الـWorker على Cloudflare:
   - سرّان: GITHUB_CLIENT_ID و GITHUB_CLIENT_SECRET (من OAuth App
     بCallback: https://<النطاق>/api/oauth/callback)
   - ربط R2: حاوية rwasim-files على binding اسمه FILES
   - ربط D1: قاعدة rwasim-content على binding اسمه DB
     (يقرأ منها GET /api/content محتوى الموقع الحي — تحرره لوحة ديوان)
   تُضاف الروابط في wrangler.jsonc بعد إنشاء الموارد
   ───────────────────────────────────────────────────────────── */

const REPO = 'RwasimSA/website'

/* التحقق أن التوكن لحساب يملك صلاحية دفع على المستودع */
async function canPush(token) {
  try {
    const r = await fetch(`https://api.github.com/repos/${REPO}`, {
      headers: { authorization: `token ${token}`, 'user-agent': 'rwasim-worker', accept: 'application/vnd.github+json' },
    })
    if (!r.ok) return false
    const j = await r.json()
    return !!(j.permissions && (j.permissions.push || j.permissions.admin))
  } catch { return false }
}

const sanitize = (name) =>
  name.replace(/[^\w.\u0600-\u06FF-]+/g, '-').replace(/-+/g, '-').slice(0, 120)

const OAUTH_AUTHORIZE = 'https://github.com/login/oauth/authorize'
const OAUTH_TOKEN = 'https://github.com/login/oauth/access_token'

const html = (body) =>
  new Response(`<!doctype html><html><body>${body}</body></html>`, {
    headers: { 'content-type': 'text/html;charset=UTF-8' },
  })

/* صفحة الرد للوحة — بروتوكول Decap: رسالة handshake ثم النتيجة */
const authResponse = (status, payload) =>
  html(`<script>
    (function () {
      function receiveMessage(e) {
        window.opener.postMessage(
          'authorization:github:${status}:${JSON.stringify(payload).replace(/'/g, "\\'")}',
          e.origin
        )
        window.removeEventListener('message', receiveMessage)
      }
      window.addEventListener('message', receiveMessage, false)
      window.opener.postMessage('authorizing:github', '*')
    })()
  </script>`)

export default {
  async fetch(request, env) {
    const url = new URL(request.url)

    if (url.pathname === '/api/oauth/authorize') {
      if (!env.GITHUB_CLIENT_ID) {
        return html('لم تُضبط مفاتيح GitHub بعد — أضف GITHUB_CLIENT_ID وGITHUB_CLIENT_SECRET في إعدادات الـWorker.')
      }
      const state = crypto.randomUUID()
      const redirect = new URL(OAUTH_AUTHORIZE)
      redirect.searchParams.set('client_id', env.GITHUB_CLIENT_ID)
      redirect.searchParams.set('redirect_uri', `${url.origin}/api/oauth/callback`)
      redirect.searchParams.set('scope', 'repo,user')
      redirect.searchParams.set('state', state)
      return Response.redirect(redirect.toString(), 302)
    }

    if (url.pathname === '/api/oauth/callback') {
      const code = url.searchParams.get('code')
      if (!code) return authResponse('error', { error: 'لا يوجد كود تفويض' })
      try {
        const res = await fetch(OAUTH_TOKEN, {
          method: 'POST',
          headers: { accept: 'application/json', 'content-type': 'application/json' },
          body: JSON.stringify({
            client_id: env.GITHUB_CLIENT_ID,
            client_secret: env.GITHUB_CLIENT_SECRET,
            code,
          }),
        })
        const data = await res.json()
        if (data.error) return authResponse('error', { error: data.error_description || data.error })
        return authResponse('success', { token: data.access_token, provider: 'github' })
      } catch (e) {
        return authResponse('error', { error: String(e) })
      }
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

    if (url.pathname === '/api/media' && request.method === 'POST') {
      if (!env.FILES) return Response.json({ error: 'تخزين الملفات غير مفعّل بعد' }, { status: 501 })
      const auth = request.headers.get('authorization') || ''
      const token = auth.replace(/^(token|Bearer)\s+/i, '')
      if (!token || !(await canPush(token))) {
        return Response.json({ error: 'غير مصرّح — يتطلب حساباً له صلاحية على المستودع' }, { status: 401 })
      }
      const form = await request.formData()
      const file = form.get('file')
      if (!file || typeof file === 'string') return Response.json({ error: 'لا يوجد ملف' }, { status: 400 })
      if (file.size > 200 * 1024 * 1024) return Response.json({ error: 'الحد الأقصى 200MB' }, { status: 413 })
      const key = `${new Date().toISOString().slice(0, 10)}-${crypto.randomUUID().slice(0, 8)}/${sanitize(file.name)}`
      await env.FILES.put(key, file.stream(), {
        httpMetadata: { contentType: file.type || 'application/octet-stream' },
      })
      return Response.json({ url: `/files/${key}`, key })
    }

    /* كل ما عدا ذلك: أصول الموقع الثابتة */
    return env.ASSETS.fetch(request)
  },
}
