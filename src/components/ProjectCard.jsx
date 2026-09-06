import { motion } from 'framer-motion'

/* بطاقة المشروع — مصدر واحد تستخدمه صفحة الهوم وصفحة «مشاريعنا» لضمان تطابق الشكل والنمط */

const cardBase = {
  backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
  borderRadius: '18px', position: 'relative', overflow: 'hidden',
}

// صورة الجهاز الافتراضية عند غياب صورة المشروع
const DEVICE = '/images/موكاب تجريبي.webp?v=2'

const CardGlow = ({ color }) => (
  <motion.div
    style={{ position: 'absolute', top: '-25%', right: '-20%', width: '70%', height: '70%', borderRadius: '50%',
      background: `radial-gradient(circle, ${color} 0%, transparent 70%)`, filter: 'blur(40px)', pointerEvents: 'none' }}
    animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.15, 1] }}
    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
  />
)

export default function ProjectCard({ p, delay = 0, layout = false, wrapperStyle = {} }) {
  return (
    <motion.div
      data-card="true"
      className="project-card"
      layout={layout}
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay }}
      whileHover={{ y: -4, transition: { duration: 0.25, ease: 'easeOut' } }}
      style={{
        ...cardBase,
        background: 'linear-gradient(145deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)',
        border: '0.5px solid rgba(255,255,255,0.12)',
        borderTop: '0.5px solid rgba(255,255,255,0.20)',
        minHeight: '344px', padding: 0, display: 'flex', flexDirection: 'column',
        ...wrapperStyle,
      }}
    >
      <CardGlow color={p.glow} />

      {/* النصف العلوي: صورة الجهاز (تتلاشى للأسفل) — إطار موحّد 4:3 بخلفية شفافة */}
      <div style={{ position: 'relative', height: '188px', flex: '0 0 auto' }}>
        <motion.img src={p.device || DEVICE} alt="" aria-hidden="true" draggable="false"
          initial={{ opacity: 0, x: '-50%', y: 16 }}
          animate={{ opacity: 0.95, x: '-50%', y: 0 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: delay + 0.45 }}
          style={{
            position: 'absolute', top: '10px', left: '50%',
            width: '284px', height: '213px', objectFit: 'contain', objectPosition: 'center top',
            pointerEvents: 'none', zIndex: 0,
            maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0) 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0) 100%)',
          }} />
      </div>

      {/* النصف السفلي: المحتوى */}
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', flex: '1 1 auto', padding: '46px 22px 22px' }}>
        {/* الشعار إن توفّر، وإلا الاسم نصّاً */}
        {p.logo ? (
          <img src={p.logo} alt={p.title} draggable="false"
            style={{ height: '44px', width: 'auto', maxWidth: '78%', objectFit: 'contain', objectPosition: 'right center', alignSelf: 'flex-start', marginBottom: '12px' }} />
        ) : (
          <h3 style={{ color: 'white', fontWeight: 600, fontSize: '18px', marginBottom: '10px' }}>{p.title}</h3>
        )}

        {/* وصف يُقتطع عند نهاية السطر الثاني */}
        <p style={{
          color: '#b6ccd6', fontWeight: 300, fontSize: '14px', lineHeight: 1.7,
          textAlign: 'justify', margin: '0 0 22px',
          display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
        }}>{p.desc}</p>

        {/* تبرّع للمشروع + الانتقال للمشروع — تظهر حسب توفّر الروابط من لوحة التحكم */}
        <div className="mt-auto flex gap-2.5">
          {p.donationLink && (
            <a href={p.donationLink} target="_blank" rel="noopener noreferrer"
              className="flex flex-1 items-center justify-center"
              style={{ padding: '9px 6px', borderRadius: '999px', fontSize: '12.5px', fontWeight: 600, color: '#fff', whiteSpace: 'nowrap',
                background: 'linear-gradient(135deg, #ef9122 0%, #c9760f 100%)', boxShadow: '0 4px 14px rgba(239,145,34,0.3)' }}>
              تبرّع للمشروع
            </a>
          )}
          {p.projectLink && (
            <motion.a href={p.projectLink} target="_blank" rel="noopener noreferrer"
              className="flex flex-1 items-center justify-center gap-1.5"
              style={{ padding: '9px 4px', fontSize: '12.5px', fontWeight: 500, color: 'white', whiteSpace: 'nowrap',
                background: 'transparent', border: 'none', cursor: 'pointer' }}
              whileHover={{ y: -1 }} whileTap={{ scale: 0.97 }}>
              الانتقال للمشروع
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
              </svg>
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  )
}
