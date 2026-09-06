import { motion } from 'framer-motion'
import { glass, color } from '../theme'
import { text } from '../typography'
import MemberPhoto from '../components/MemberPhoto'
import { mapApiTeam } from '../data/team'
import { useApiData } from '../lib/useApiData'
import Skeleton from '../components/Skeleton'
import SkeletonSwap from '../components/SkeletonSwap'

const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay },
})

const Card = ({ m, delay }) => (
  <motion.div {...rise(delay)} whileHover={{ y: -5, transition: { duration: 0.25 } }}
    style={glass({ padding: 0, overflow: 'hidden', width: '232px', display: 'flex', flexDirection: 'column',
      ...(m.lead ? { border: '0.5px solid rgba(239,145,34,0.45)' } : {}) })}>
    {/* صندوق الصورة المربّع — كامل عرض البطاقة */}
    <MemberPhoto name={m.name} src={m.src} lead={m.lead} radius="0" style={{ width: '100%', aspectRatio: '1 / 1' }} />

    <div style={{ padding: '18px 18px 22px', textAlign: 'center', position: 'relative' }}>
      {m.lead && <div style={{ position: 'absolute', top: 0, insetInline: 0, height: '2.5px', background: 'linear-gradient(90deg, transparent, #ef9122, transparent)' }} />}
      <h3 style={{ color: 'white', fontWeight: 600, fontSize: '15px', lineHeight: 1.55, marginBottom: '7px' }}>{m.name}</h3>
      <p style={{ color: m.lead ? color.copper : '#b6ccd6', fontWeight: 300, fontSize: '12.5px', margin: 0 }}>{m.role}</p>
    </div>
  </motion.div>
)

export default function Board() {
  const { data: members, loading } = useApiData('/team?group=board-of-directors', { map: mapApiTeam, fallback: [] })
  return (
    <div dir="rtl" className="relative mx-auto w-full max-w-6xl px-6 pb-28 pt-36 md:px-10">
      <div className="mb-14 text-center">
        <motion.p style={{ color: color.copper, fontSize: '14px', fontWeight: 300, letterSpacing: '0.22em', marginBottom: '14px' }} {...rise(0)}>الحوكمة</motion.p>
        <motion.h1 style={{ ...text.sectionTitle, fontSize: '34px' }} className="mb-4" {...rise(0.07)}>مجلس الإدارة</motion.h1>
        <motion.p style={{ color: '#b6ccd6', fontWeight: 300, fontSize: '15px' }} {...rise(0.14)}>أعضاء مجلس إدارة جمعية رواسم لتنمية الطفل.</motion.p>
      </div>

      <SkeletonSwap
        loading={loading && members.length === 0}
        className="flex flex-wrap justify-center gap-5"
        skeleton={Array.from({ length: 7 }).map((_, i) => <Skeleton key={i} style={{ width: '232px', height: '312px', borderRadius: '18px' }} />)}
      >
        {members.map((m, i) => <Card key={m.name} m={m} delay={0.08 + i * 0.05} />)}
      </SkeletonSwap>
    </div>
  )
}
