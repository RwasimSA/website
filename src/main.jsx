import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { hydrateContent } from './liveContent.js'
import site from '../content/site.json'

/* انتظار تحميل صورة (تتجاهل الفشل والفراغ) */
const waitImage = (src) => new Promise((resolve) => {
  if (!src) return resolve()
  const im = new Image()
  im.onload = im.onerror = () => resolve()
  im.src = src
})

/* رفع غطاء التحميل بتلاشٍ ناعم */
const hidePreloader = () => {
  const p = document.getElementById('preloader')
  if (!p) return
  p.classList.add('done')
  setTimeout(() => p.remove(), 650)
}

// يُجلب المحتوى الحي أولاً ثم يُحمَّل التطبيق، حتى تُبنى ثوابت
// الصفحات (الأعضاء، الأرقام…) على النسخة المحدَّثة من القاعدة.
hydrateContent().finally(() => {
  import('./App.jsx').then(({ default: App }) => {
    createRoot(document.getElementById('root')).render(
      <StrictMode>
        <App />
      </StrictMode>,
    )
    /* الغطاء يُرفع بعد جاهزية الخط وصورة الواجهة — وبسقف 4 ثوانٍ
       حتى لا يحتجز الزائر مهما حدث (site هنا نسخة محدّثة بعد الجلب) */
    Promise.race([
      Promise.allSettled([
        document.fonts ? document.fonts.ready : Promise.resolve(),
        waitImage(site.heroImage),
      ]),
      new Promise((resolve) => setTimeout(resolve, 4000)),
    ]).then(() => requestAnimationFrame(() => requestAnimationFrame(hidePreloader)))
  })
})
