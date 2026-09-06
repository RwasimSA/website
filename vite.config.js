import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  /* مصادر الملفات العامة في static/، والبناء يُخرج الموقع النهائي إلى public/
     — وهو المجلد الذي ينشره Cloudflare Workers (wrangler.jsonc) كما هو. */
  publicDir: 'static',
  build: { outDir: 'public', emptyOutDir: true },
  server: {
    host: true, // كشف الخادم على الشبكة المحلية للوصول من الهاتف
    port: 5173,
    allowedHosts: true, // السماح لنفق المعاينة الخارجي (trycloudflare)
  },
})
