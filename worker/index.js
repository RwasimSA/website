/* ─────────────────────────────────────────────────────────────
   Worker الموقع: يقدّم أصول public/ كما هي، ويضيف بوابة دخول
   GitHub OAuth للوحة التحكم (/admin — Decap CMS) على مسارين:

   GET /api/oauth/authorize  → تحويل لصفحة موافقة GitHub
   GET /api/oauth/callback   → تبادل الكود بتوكن وإعادته للوحة

   يتطلب سرّين في إعدادات الـWorker على Cloudflare:
   GITHUB_CLIENT_ID و GITHUB_CLIENT_SECRET (من GitHub OAuth App
   يكون Callback URL فيه: https://<النطاق>/api/oauth/callback)
   ───────────────────────────────────────────────────────────── */

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

    /* كل ما عدا ذلك: أصول الموقع الثابتة */
    return env.ASSETS.fetch(request)
  },
}
