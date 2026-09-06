import { motion } from 'framer-motion'
import { glass, color } from '../theme'
import { text } from '../typography'

const CERT = '/images/registration-certificate.webp'

const facts = [
  { label: 'رقم الترخيص', value: '943' },
  { label: 'تاريخ الإصدار', value: '2022/12/18' },
  { label: 'سارية حتى', value: '2026/12/18' },
  { label: 'الجهة المرخِّصة', value: 'المركز الوطني لتنمية القطاع غير الربحي' },
]

const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
})

export default function RegistrationCertificate() {
  return (
    <div dir="rtl" className="relative mx-auto flex min-h-screen w-full max-w-5xl flex-col justify-center px-6 py-32 md:px-10">

      {/* رأس الصفحة */}
      <div className="mb-14 text-center">
        <motion.p style={{ color: color.copper, fontSize: '14px', fontWeight: 300, letterSpacing: '0.22em', marginBottom: '14px' }} {...rise(0)}>الحوكمة</motion.p>
        <motion.h1 style={{ ...text.sectionTitle, fontSize: '34px' }} className="mb-4" {...rise(0.07)}>شهادة تسجيل الجمعية</motion.h1>
        <motion.p style={{ color: '#b6ccd6', fontWeight: 300, fontSize: '15px' }} {...rise(0.14)}>الترخيص الرسمي من المركز الوطني لتنمية القطاع غير الربحي.</motion.p>
      </div>

      {/* بطاقات المعلومات */}
      <motion.div className="mb-12 grid grid-cols-2 gap-4 lg:grid-cols-4" {...rise(0.18)}>
        {facts.map((f) => (
          <div key={f.label} style={glass({ padding: '18px 20px', textAlign: 'center' })}>
            <div style={{ color: '#8fa6b0', fontWeight: 300, fontSize: '12px', marginBottom: '8px' }}>{f.label}</div>
            <div style={{ color: 'white', fontWeight: 600, fontSize: '15px', lineHeight: 1.5 }}>{f.value}</div>
          </div>
        ))}
      </motion.div>

      {/* الشهادة */}
      <motion.div {...rise(0.22)} style={glass({ padding: '18px', overflow: 'hidden' })}>
        <img src={CERT} alt="شهادة ترخيص جمعية رواسم لتنمية الطفل — رقم 943"
          className="w-full rounded-xl" style={{ display: 'block' }} />
      </motion.div>

      {/* عرض بالحجم الكامل */}
      <motion.div className="mt-8 flex justify-center" {...rise(0.28)}>
        <a href={CERT} target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-2.5" style={{
            borderRadius: '999px', padding: '11px 24px',
            background: 'linear-gradient(135deg, #ef9122 0%, #c9760f 100%)', color: 'white',
            fontWeight: 500, fontSize: '14px', boxShadow: '0 4px 16px rgba(239,145,34,0.35)',
          }}>
          عرض الشهادة بالحجم الكامل
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 3h6v6" /><path d="M10 14 21 3" /><path d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5" />
          </svg>
        </a>
      </motion.div>
    </div>
  )
}
