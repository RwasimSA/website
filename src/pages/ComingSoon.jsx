import { motion } from 'framer-motion'
import { glass, color } from '../theme'
import { text } from '../typography'

const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay },
})

export default function ComingSoon({ eyebrow = 'المركز الإعلامي', title = 'قريباً', subtitle = 'نعمل على تجهيز هذا القسم وسيكون متاحاً قريباً.' }) {
  return (
    <div dir="rtl" className="relative mx-auto flex min-h-[70vh] w-full max-w-3xl flex-col items-center justify-center px-6 pb-28 pt-36 text-center md:px-10">
      <motion.p style={{ color: color.copper, fontSize: '14px', fontWeight: 300, letterSpacing: '0.22em', marginBottom: '18px' }} {...rise(0)}>{eyebrow}</motion.p>

      <motion.div {...rise(0.06)} className="mb-7 flex h-20 w-20 items-center justify-center rounded-2xl"
        style={glass({ borderRadius: '22px' })}>
        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke={color.copper} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9" /><polyline points="12 7 12 12 15 14" />
        </svg>
      </motion.div>

      <motion.h1 style={{ ...text.sectionTitle, fontSize: '34px' }} className="mb-4" {...rise(0.1)}>{title}</motion.h1>
      <motion.p style={{ color: '#b6ccd6', fontWeight: 300, fontSize: '15px', maxWidth: '420px' }} {...rise(0.16)}>{subtitle}</motion.p>

      <motion.span {...rise(0.22)} style={{ marginTop: '26px', color: '#d8c8a4', fontSize: '12px', fontWeight: 500, padding: '6px 18px', borderRadius: '999px', background: 'rgba(239,145,34,0.16)', border: '0.5px solid rgba(239,145,34,0.3)' }}>قريباً</motion.span>
    </div>
  )
}
