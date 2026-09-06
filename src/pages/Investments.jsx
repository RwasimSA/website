import { motion } from 'framer-motion'
import { glass, color } from '../theme'
import { text } from '../typography'
import { DownloadIcon, downloadBtn } from '../components/DocsGrid'

const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay },
})

const ShieldIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ef9122" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" />
  </svg>
)
const FolderIcon = () => (
  <img src="/images/foldericon.png" alt="" draggable="false" style={{ width: '54px', height: '54px', objectFit: 'contain' }} />
)
export default function Investments() {
  return (
    <div dir="rtl" className="relative mx-auto flex min-h-screen w-full max-w-3xl flex-col justify-center px-6 py-32 md:px-10">
      <div className="mb-12 text-center">
        <motion.p style={{ color: color.copper, fontSize: '14px', fontWeight: 300, letterSpacing: '0.22em', marginBottom: '14px' }} {...rise(0)}>الحوكمة</motion.p>
        <motion.h1 style={{ ...text.sectionTitle, fontSize: '34px' }} className="mb-4" {...rise(0.07)}>إستثمارات الجمعية</motion.h1>
        <motion.p style={{ color: '#b6ccd6', fontWeight: 300, fontSize: '15px' }} {...rise(0.14)}>إفصاح حول الأصول والاستثمارات.</motion.p>
      </div>

      {/* بيان الإفصاح */}
      <motion.div className="mb-5 flex items-start gap-5" {...rise(0.1)} style={glass({ padding: '28px 26px' })}>
        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl"
          style={{ background: 'rgba(239,145,34,0.14)', border: '0.5px solid rgba(239,145,34,0.28)' }}>
          <ShieldIcon />
        </div>
        <p style={{ color: '#dcebf2', fontWeight: 300, fontSize: '15.5px', lineHeight: 1.95, margin: 0 }}>
          تفيد جمعية رواسم بأنها لا تملك أي أصول أو أملاك أو استثمارات عقارية.
        </p>
      </motion.div>

      {/* وثيقة الإفادة */}
      <motion.div {...rise(0.18)} style={glass({ padding: '24px 22px', display: 'flex', flexDirection: 'column' })}>
        <div className="mb-4 flex items-start justify-between">
          <FolderIcon />
          <span style={{ color: '#d8c8a4', fontSize: '10px', fontWeight: 500, padding: '3px 10px', borderRadius: '999px', background: 'rgba(239,145,34,0.14)' }}>قريباً</span>
        </div>
        <h3 style={{ color: 'white', fontWeight: 600, fontSize: '15px', lineHeight: 1.55, marginBottom: '8px' }}>إفادة الجمعية حول الاستثمارات</h3>
        <p style={{ color: '#8fa6b0', fontWeight: 300, fontSize: '12.5px', marginBottom: '20px' }}>وثيقة رسمية معتمدة — ستتاح قريباً.</p>
        <button style={{ ...downloadBtn, maxWidth: '220px' }}><DownloadIcon /> تنزيل</button>
      </motion.div>
    </div>
  )
}
