import { motion } from 'framer-motion'
import { glass } from '../theme'

/* ─────────────────────────────────────────────────────────────
   صفحة «التطوع» — وفق خطة المحتوى المعتمدة (صفحة داخلية):
   تعريف مختصر بالتطوع في رواسم | حضور التطوع في برامجنا (من
   بيانات معتمدة) | الفرص الحالية (لا فرص معلنة حالياً — حالة
   صادقة) | التواصل.
   قاعدة الخطة: لا تُكتب فوائد أو مزايا للمتطوع من عندنا؛
   المجالات والفرص وآلية التسجيل تُضاف من آلية التطوع الفعلية.
   ───────────────────────────────────────────────────────────── */

const titleFont = "'TheYearofHandicrafts', 'IBM Plex Sans Arabic', sans-serif"
const ACCENT = '#ef9122'

/* حضور التطوع — من البيانات المعتمدة المنشورة في الموقع */
const PRESENCE = [
  { value: '178', label: 'متطوع ومتطوعة في أحدث بيانات رواسم المعتمدة' },
  { value: '30', label: 'متطوعًا في برنامج بارع' },
  { value: '50', label: 'متطوعة في نادي ضفاف — صيف 1448هـ' },
]

const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
})

const SectionTitle = ({ children, delay = 0 }) => (
  <motion.div {...rise(delay)} className="mb-4 flex flex-col items-center">
    <h2 className="text-center text-white"
      style={{ fontFamily: titleFont, fontWeight: 700, fontSize: 'clamp(26px, 3vw, 38px)', lineHeight: 1.4, margin: 0 }}>
      {children}
    </h2>
    <span aria-hidden="true" className="mt-3 block h-[3px] w-14 rounded-full"
      style={{ background: `linear-gradient(90deg, transparent, ${ACCENT}, transparent)`, boxShadow: `0 0 14px ${ACCENT}66` }} />
  </motion.div>
)

export default function VolunteerPage({ onOpenPage = () => {} }) {
  return (
    <div dir="rtl" className="relative w-full overflow-hidden pb-28">

      {/* ═══ الافتتاحية ═══ */}
      <div className="relative overflow-hidden" style={{ paddingTop: '150px', paddingBottom: '80px' }}>
        <div className="pointer-events-none absolute inset-0">
          <img src="/images/programs-back.jpg" alt="" aria-hidden="true" draggable="false"
            className="h-full w-full object-cover" />
          <div style={{ position: 'absolute', inset: 0,
            background: 'linear-gradient(180deg, rgba(8,38,51,0.92) 0%, rgba(13,58,77,0.84) 45%, rgba(4,23,32,0.97) 100%)' }} />
        </div>
        <div className="relative mx-auto flex w-full max-w-4xl flex-col items-center px-6 text-center">
          <motion.h1 {...rise(0)} className="mb-6 text-white"
            style={{ fontFamily: titleFont, fontWeight: 700, fontSize: 'clamp(32px, 4.2vw, 54px)', lineHeight: 1.45 }}>
            تطوّع{' '}
            <span style={{
              backgroundImage: 'linear-gradient(120deg, #ffb85c, #ef9122)',
              WebkitBackgroundClip: 'text', backgroundClip: 'text',
              color: 'transparent', WebkitTextFillColor: 'transparent',
              padding: '0.35em 0.1em', margin: '-0.35em -0.1em',
            }}>معنا</span>
          </motion.h1>
          <motion.p {...rise(0.1)} className="max-w-3xl"
            style={{ color: '#dcebf2', fontWeight: 300, fontSize: '16px', lineHeight: 2.05, margin: 0 }}>
            التطوع عنصر أساسي في تشغيل برامج رواسم وصناعة تجربتها؛ فالمتطوعون والمتطوعات شركاء في إدارة
            البيئات والأندية، وتنفيذ الأنشطة والتجارب، ومرافقة المستفيدين في رحلتهم التربوية.
          </motion.p>
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-6 pt-16 md:px-10 md:pt-24">

        {/* ═══ حضور التطوع في رواسم ═══ */}
        <SectionTitle>التطوع في رواسم</SectionTitle>
        <div className="mb-24 mt-12 grid gap-4 sm:grid-cols-3">
          {PRESENCE.map((s, i) => (
            <motion.div key={s.label} {...rise(0.06 * i)}
              className="flex flex-col items-center text-center"
              style={glass({ borderRadius: '26px', padding: '32px 22px' })}>
              <span dir="ltr" style={{ fontFamily: titleFont, fontWeight: 700, fontSize: '44px', lineHeight: 1,
                backgroundImage: 'linear-gradient(120deg, #ffb85c, #ef9122)', WebkitBackgroundClip: 'text', backgroundClip: 'text',
                color: 'transparent', WebkitTextFillColor: 'transparent', padding: '0.1em 0.05em', margin: '-0.1em -0.05em' }}>{s.value}</span>
              <span className="mt-3 block h-0.5 w-7 rounded-full" style={{ background: `linear-gradient(90deg, transparent, ${ACCENT}, transparent)` }} />
              <span style={{ color: '#c9dde8', fontWeight: 300, fontSize: '13.5px', lineHeight: 1.9, marginTop: '10px' }}>{s.label}</span>
            </motion.div>
          ))}
        </div>

        {/* ═══ الفرص الحالية — حالة صادقة ═══ */}
        <SectionTitle>الفرص الحالية</SectionTitle>
        <motion.div {...rise(0.08)} className="relative mx-auto mb-24 max-w-3xl overflow-hidden text-center"
          style={glass({ borderRadius: '30px', padding: 'clamp(34px, 5vw, 54px)' })}>
          <div aria-hidden="true" className="pointer-events-none absolute"
            style={{ top: '-40%', right: '-10%', width: '45%', height: '110%', borderRadius: '50%',
              background: 'radial-gradient(ellipse, rgba(239,145,34,0.15) 0%, transparent 65%)', filter: 'blur(55px)' }} />
          <div className="relative mx-auto mb-6 flex h-[64px] w-[64px] items-center justify-center rounded-2xl"
            style={{ background: 'rgba(239,145,34,0.1)', border: '0.5px solid rgba(239,145,34,0.3)' }}>
            <img src="/images/volunteer/join.svg" alt="" aria-hidden="true" draggable="false" style={{ width: '38px', height: '38px' }} />
          </div>
          <p className="relative" style={{ color: '#dcebf2', fontWeight: 300, fontSize: '15.5px', lineHeight: 2.1, margin: 0 }}>
            تُعلن فرص التطوع هنا وعبر حسابات رواسم الرسمية فور فتح باب التسجيل في كل برنامج أو موسم.
            <br />
            إن كنت مهتمًا بالانضمام لفريق التطوع، شاركنا اهتمامك وسنتواصل معك عند توفر الفرصة المناسبة.
          </p>
          <motion.button
            type="button" onClick={() => onOpenPage('inquiries')}
            whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
            className="relative mt-8 flex cursor-pointer items-center gap-2.5"
            style={{ margin: '32px auto 0', borderRadius: '999px', padding: '14px 30px', border: 'none',
              background: 'linear-gradient(135deg, #ef9122 0%, #c9760f 100%)',
              boxShadow: '0 10px 26px rgba(239,145,34,0.35)' }}>
            <span style={{ color: 'white', fontWeight: 600, fontSize: '15px' }}>شاركنا اهتمامك بالتطوع</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </motion.button>
        </motion.div>

        {/* ختام خفيف */}
        <div className="flex flex-col items-center">
          <motion.button {...rise(0)}
            onClick={() => onOpenPage('news')}
            whileHover={{ scale: 1.03 }}
            className="cursor-pointer border-none bg-transparent"
            style={{ color: '#a2becf', fontSize: '14.5px', fontWeight: 300 }}>
            لمتابعة إعلانات الفرص أولًا بأول؟ <span style={{ color: '#f4a63f', fontWeight: 500, textDecoration: 'underline', textUnderlineOffset: '5px' }}>تابع مستجداتنا</span>
          </motion.button>
        </div>
      </div>
    </div>
  )
}
