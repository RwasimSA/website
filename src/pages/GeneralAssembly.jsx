import { motion } from 'framer-motion'
import { glass, color } from '../theme'
import { text } from '../typography'
import { mapApiTeam } from '../data/team'
import { useApiData } from '../lib/useApiData'
import Skeleton from '../components/Skeleton'
import SkeletonSwap from '../components/SkeletonSwap'

const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1], delay },
})

export default function GeneralAssembly() {
  const { data: members, loading } = useApiData('/team?group=general-assembly', { map: mapApiTeam, fallback: [] })
  return (
    <div dir="rtl" className="relative mx-auto w-full max-w-6xl px-6 pb-28 pt-36 md:px-10">
      <div className="mb-14 text-center">
        <motion.p style={{ color: color.copper, fontSize: '14px', fontWeight: 300, letterSpacing: '0.22em', marginBottom: '14px' }} {...rise(0)}>الحوكمة</motion.p>
        <motion.h1 style={{ ...text.sectionTitle, fontSize: '34px' }} className="mb-4" {...rise(0.07)}>أعضاء الجمعية العمومية</motion.h1>
        <motion.p style={{ color: '#b6ccd6', fontWeight: 300, fontSize: '15px' }} {...rise(0.14)}>أعضاء الجمعية العمومية لجمعية رواسم.</motion.p>
      </div>

      <SkeletonSwap
        loading={loading && members.length === 0}
        className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
        skeleton={Array.from({ length: 9 }).map((_, i) => <Skeleton key={i} style={{ height: '66px', borderRadius: '14px' }} />)}
      >
        {members.map((m, i) => (
          <motion.div key={i} {...rise(Math.min(0.02 * i, 0.3))}
            style={glass({ padding: '16px 18px', display: 'flex', alignItems: 'center', gap: '14px' })}>
            <span className="flex flex-shrink-0 items-center justify-center" style={{
              width: '34px', height: '34px', borderRadius: '10px', background: 'rgba(239,145,34,0.16)',
              border: '0.5px solid rgba(239,145,34,0.4)', color: color.copper, fontWeight: 600, fontSize: '13px' }}>
              {i + 1}
            </span>
            <div style={{ minWidth: 0 }}>
              <div style={{ color: 'white', fontWeight: 500, fontSize: '14px', marginBottom: '2px' }}>{m.name}</div>
              <div style={{ color: '#8fa6b0', fontWeight: 300, fontSize: '11px' }}>{m.date ? `عضو عادي • انضمام ${m.date}` : (m.role || 'عضو الجمعية العمومية')}</div>
            </div>
          </motion.div>
        ))}
      </SkeletonSwap>

      {/* دعوة للعضوية */}
      <motion.div className="mt-12 flex flex-col items-center gap-5 rounded-2xl py-10 text-center"
        {...rise(0.1)} style={glass({ borderRadius: '20px', padding: '36px 28px' })}>
        <p style={{ color: '#c9dde8', fontWeight: 300, fontSize: '15px' }}>
          لطلب العضوية تواصل معنا على بريد الجمعية: <span dir="ltr" style={{ color: color.copper }}>info@alborhan.sa</span>
        </p>
        <a href="mailto:info@alborhan.sa" className="flex items-center gap-2" style={{
          borderRadius: '999px', padding: '11px 26px', background: 'linear-gradient(135deg, #ef9122 0%, #c9760f 100%)',
          color: 'white', fontWeight: 500, fontSize: '14px', boxShadow: '0 4px 16px rgba(239,145,34,0.35)' }}>
          تواصل معنا
        </a>
      </motion.div>
    </div>
  )
}
