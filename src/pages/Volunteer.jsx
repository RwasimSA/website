import { motion } from 'framer-motion'
import { glass, color } from '../theme'
import { text } from '../typography'

const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay },
})

const cards = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ef9122" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>
    ),
    title: 'التطوع في رواسم',
    desc: 'تعرّف على فرص ومجالات التطوع عبر الدليل التعريفي.',
    cta: 'الدليل التعريفي',
    href: '#',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ef9122" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
    ),
    title: 'تطوّع معنا',
    desc: 'سجّل رغبتك في التطوع عبر المنصة الوطنية للعمل التطوعي.',
    cta: 'المنصة الوطنية',
    href: 'https://nvg.gov.sa',
    external: true,
  },
]

export default function Volunteer() {
  return (
    <div dir="rtl" className="relative mx-auto flex min-h-screen w-full max-w-4xl flex-col justify-center px-6 py-32 md:px-10">
      <div className="mb-12 text-center">
        <motion.p style={{ color: color.copper, fontSize: '14px', fontWeight: 300, letterSpacing: '0.22em', marginBottom: '14px' }} {...rise(0)}>التطوع</motion.p>
        <motion.h1 style={{ ...text.sectionTitle, fontSize: '34px' }} className="mb-4" {...rise(0.07)}>التطوع في رواسم</motion.h1>
        <motion.p style={{ color: '#b6ccd6', fontWeight: 300, fontSize: '15px' }} {...rise(0.14)}>كن شريكاً في الأجر — تطوّع بوقتك ومهارتك في خدمة الوحيين.</motion.p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {cards.map((c, i) => (
          <motion.div key={i} {...rise(0.12 + i * 0.08)} whileHover={{ y: -4, transition: { duration: 0.25 } }}
            style={glass({ padding: '32px 28px', display: 'flex', flexDirection: 'column' })}>
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl"
              style={{ background: 'rgba(239,145,34,0.14)', border: '0.5px solid rgba(239,145,34,0.28)' }}>
              {c.icon}
            </div>
            <h3 style={{ color: 'white', fontWeight: 600, fontSize: '19px', marginBottom: '10px' }}>{c.title}</h3>
            <p style={{ color: '#b6ccd6', fontWeight: 300, fontSize: '14.5px', lineHeight: 1.8, marginBottom: '26px' }}>{c.desc}</p>

            <a href={c.href} {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="mt-auto flex items-center justify-center gap-2 self-start"
              style={{ padding: '11px 24px', borderRadius: '999px', fontSize: '14px', fontWeight: 600, color: 'white',
                background: 'linear-gradient(135deg, #ef9122 0%, #c9760f 100%)', boxShadow: '0 4px 16px rgba(239,145,34,0.35)' }}>
              {c.cta}
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
