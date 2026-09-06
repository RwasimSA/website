import { motion } from 'framer-motion'
import { glass, color } from '../theme'
import { text } from '../typography'

const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay },
})

const TrophyIcon = () => (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#ef9122" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9a6 6 0 0 0 12 0V4H6z" /><path d="M6 5H3v2a3 3 0 0 0 3 3" /><path d="M18 5h3v2a3 3 0 0 1-3 3" />
    <path d="M12 15v3" /><path d="M8 21h8" /><path d="M9 18h6" />
  </svg>
)

const initiatives = [
  {
    title: 'جائزة رواسم للتقنيات الحديثة',
    tag: 'مبادرة رائدة',
    desc: 'جائزة تُكرّم الابتكارات التقنية التي تخدم كتاب الله وتعزّز التفاعل معه عبر منصات وتطبيقات مبتكرة تجمع بين الأصالة العلمية والحداثة التقنية، ضمن معايير دقيقة تُعنى بالأثر والجودة والابتكار.',
    points: ['تكريم المشاريع والتطبيقات النوعية', 'معايير تُعنى بالأثر والجودة والابتكار', 'تحفيز المبدعين في خدمة الوحيين'],
  },
]

export default function Initiatives() {
  return (
    <div dir="rtl" className="relative mx-auto flex min-h-screen w-full max-w-5xl flex-col justify-center px-6 py-32 md:px-10">
      <div className="mb-14 text-center">
        <motion.p style={{ color: color.copper, fontSize: '14px', fontWeight: 300, letterSpacing: '0.22em', marginBottom: '14px' }} {...rise(0)}>مشاريعنا</motion.p>
        <motion.h1 style={{ ...text.sectionTitle, fontSize: '34px' }} className="mb-4" {...rise(0.07)}>البرامج والمبادرات</motion.h1>
        <motion.p style={{ color: '#b6ccd6', fontWeight: 300, fontSize: '15px' }} {...rise(0.14)}>مبادرات نوعية تُعزّز خدمة القرآن والسنة بالتقنية.</motion.p>
      </div>

      {initiatives.map((it, i) => (
        <motion.div key={i} {...rise(0.1 + i * 0.08)} whileHover={{ y: -4, transition: { duration: 0.25 } }}
          style={glass({ padding: '40px 34px', border: '0.5px solid rgba(239,145,34,0.4)', position: 'relative', overflow: 'hidden' })}>
          <div style={{ position: 'absolute', top: 0, insetInline: 0, height: '3px', background: 'linear-gradient(90deg, transparent, #ef9122, transparent)' }} />

          <div className="mb-6 flex items-start gap-5">
            <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl"
              style={{ background: 'rgba(239,145,34,0.14)', border: '0.5px solid rgba(239,145,34,0.3)' }}>
              <TrophyIcon />
            </div>
            <div>
              <span style={{ display: 'inline-block', color: '#d8c8a4', fontSize: '11px', fontWeight: 500, padding: '4px 12px', borderRadius: '999px', marginBottom: '10px', background: 'rgba(239,145,34,0.16)', border: '0.5px solid rgba(239,145,34,0.3)' }}>{it.tag}</span>
              <h2 style={{ color: 'white', fontWeight: 600, fontSize: '23px', lineHeight: 1.5 }}>{it.title}</h2>
            </div>
          </div>

          <p style={{ color: '#dcebf2', fontWeight: 300, fontSize: '16px', lineHeight: 2, textAlign: 'justify', marginBottom: '24px' }}>{it.desc}</p>

          <ul className="flex flex-col gap-3" style={{ borderTop: '0.5px solid rgba(255,255,255,0.1)', paddingTop: '22px' }}>
            {it.points.map((p) => (
              <li key={p} className="flex items-center gap-3">
                <span style={{ color: color.copper, flexShrink: 0 }}>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                </span>
                <span style={{ color: '#b6ccd6', fontWeight: 300, fontSize: '14.5px' }}>{p}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  )
}
