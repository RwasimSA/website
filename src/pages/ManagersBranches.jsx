import { motion } from 'framer-motion'
import { glass, color } from '../theme'
import { text } from '../typography'
import MemberPhoto from '../components/MemberPhoto'
import { mapApiTeam } from '../data/team'
import { useApiData } from '../lib/useApiData'
import Skeleton from '../components/Skeleton'
import SkeletonSwap from '../components/SkeletonSwap'

const PinIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
)
const PhoneIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
)
const MailIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 5L2 7" /></svg>
)

const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay },
})

const Row = ({ icon, children, href }) => (
  <div className="flex items-center gap-2.5">
    <span style={{ color: color.copper, flexShrink: 0 }}>{icon}</span>
    {href
      ? <a href={href} dir="ltr" className="footer-link" style={{ color: '#b6ccd6', fontWeight: 300, fontSize: '12.5px' }}>{children}</a>
      : <span style={{ color: '#b6ccd6', fontWeight: 300, fontSize: '12.5px' }}>{children}</span>}
  </div>
)

export default function ManagersBranches() {
  const { data: directors, loading } = useApiData('/team?group=branch-managers', { map: mapApiTeam, fallback: [] })
  return (
    <div dir="rtl" className="relative mx-auto w-full max-w-6xl px-6 pb-28 pt-36 md:px-10">
      <div className="mb-14 text-center">
        <motion.p style={{ color: color.copper, fontSize: '14px', fontWeight: 300, letterSpacing: '0.22em', marginBottom: '14px' }} {...rise(0)}>عن الجمعية</motion.p>
        <motion.h1 style={{ ...text.sectionTitle, fontSize: '34px' }} className="mb-4" {...rise(0.07)}>المدراء والفروع</motion.h1>
        <motion.p style={{ color: '#b6ccd6', fontWeight: 300, fontSize: '15px' }} {...rise(0.14)}>مدراء الجمعية وفروعها في مناطق المملكة.</motion.p>
      </div>

      <SkeletonSwap
        loading={loading && directors.length === 0}
        className="grid gap-5 lg:grid-cols-3"
        skeleton={Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} style={{ minHeight: '230px', borderRadius: '18px' }} />)}
      >
        {directors.map((d, i) => (
          <motion.div key={i} {...rise(0.1 + i * 0.08)} whileHover={{ y: -4, transition: { duration: 0.25 } }}
            style={glass({ padding: '30px 26px', ...(d.lead ? { border: '0.5px solid rgba(239,145,34,0.4)' } : {}) })}>
            {d.branch && <span style={{ display: 'inline-block', color: '#d8c8a4', fontSize: '11px', fontWeight: 500,
              padding: '4px 12px', borderRadius: '999px', marginBottom: '18px',
              background: 'rgba(239,145,34,0.16)', border: '0.5px solid rgba(239,145,34,0.3)' }}>{d.branch}</span>}

            <div className="mb-5 flex items-center gap-4">
              <MemberPhoto name={d.name} src={d.src} lead={d.lead} radius="14px"
                className="flex-shrink-0" style={{ width: '64px', height: '64px' }} />
              <div style={{ minWidth: 0 }}>
                <h3 style={{ color: 'white', fontWeight: 600, fontSize: '15px', marginBottom: '4px' }}>{d.name}</h3>
                <p style={{ color: color.copper, fontWeight: 300, fontSize: '12.5px', margin: 0 }}>{d.role}</p>
              </div>
            </div>

            {(d.phone || d.email || d.location) && (
              <div className="flex flex-col gap-3" style={{ borderTop: '0.5px solid rgba(255,255,255,0.1)', paddingTop: '16px' }}>
                {d.phone && <Row icon={<PhoneIcon />} href={`tel:${d.phone.replace(/\s/g, '')}`}>{d.phone}</Row>}
                {d.email && <Row icon={<MailIcon />} href={`mailto:${d.email}`}>{d.email}</Row>}
                {d.location && <Row icon={<PinIcon />}>{d.location}</Row>}
              </div>
            )}
          </motion.div>
        ))}
      </SkeletonSwap>
    </div>
  )
}
