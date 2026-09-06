import { motion } from 'framer-motion'
import { glass, color } from '../theme'
import { text } from '../typography'
import MemberPhoto from '../components/MemberPhoto'
import { mapApiTeam } from '../data/team'
import { useApiData } from '../lib/useApiData'
import Skeleton from '../components/Skeleton'
import SkeletonSwap from '../components/SkeletonSwap'

const MailIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 5L2 7" />
  </svg>
)

const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay },
})

export default function Executive() {
  const { data: staff, loading } = useApiData('/team?group=executive-management', { map: mapApiTeam, fallback: [] })
  return (
    <div dir="rtl" className="relative mx-auto flex min-h-screen w-full max-w-5xl flex-col justify-center px-6 py-32 md:px-10">
      <div className="mb-14 text-center">
        <motion.p style={{ color: color.copper, fontSize: '14px', fontWeight: 300, letterSpacing: '0.22em', marginBottom: '14px' }} {...rise(0)}>عن الجمعية</motion.p>
        <motion.h1 style={{ ...text.sectionTitle, fontSize: '34px' }} className="mb-4" {...rise(0.07)}>موظفو الإدارة التنفيذية</motion.h1>
        <motion.p style={{ color: '#b6ccd6', fontWeight: 300, fontSize: '15px' }} {...rise(0.14)}>الفريق القائم على تشغيل برامج الجمعية ومشاريعها.</motion.p>
      </div>

      <SkeletonSwap
        loading={loading && staff.length === 0}
        className="grid gap-4 sm:grid-cols-2"
        skeleton={Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} style={{ minHeight: '124px', borderRadius: '18px' }} />)}
      >
        {staff.map((s, i) => (
          <motion.div key={s.name} {...rise(0.1 + i * 0.07)} whileHover={{ y: -4, transition: { duration: 0.25 } }}
            style={glass({ padding: '26px 24px', minHeight: '124px', display: 'flex', gap: '18px', alignItems: 'center' })}>
            <MemberPhoto name={s.name} src={s.src} radius="14px"
              className="flex-shrink-0" style={{ width: '72px', height: '72px' }} />
            <div style={{ minWidth: 0 }}>
              <h3 style={{ color: 'white', fontWeight: 600, fontSize: '15px', marginBottom: '4px' }}>{s.name}</h3>
              <p style={{ color: '#b6ccd6', fontWeight: 300, fontSize: '13px', marginBottom: s.email ? '8px' : 0 }}>{s.role}</p>
              {s.email && (
                <a href={`mailto:${s.email}`} dir="ltr" className="footer-link inline-flex items-center gap-1.5"
                  style={{ color: color.copper, fontWeight: 300, fontSize: '12px' }}>
                  <MailIcon />{s.email}
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </SkeletonSwap>
    </div>
  )
}
