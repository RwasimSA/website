import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { hydrateContent } from './liveContent.js'

// يُجلب المحتوى الحي أولاً ثم يُحمَّل التطبيق، حتى تُبنى ثوابت
// الصفحات (الأعضاء، الأرقام…) على النسخة المحدَّثة من القاعدة.
hydrateContent().finally(() => {
  import('./App.jsx').then(({ default: App }) => {
    createRoot(document.getElementById('root')).render(
      <StrictMode>
        <App />
      </StrictMode>,
    )
  })
})
