import { motion } from 'framer-motion'
import { glass } from '../theme'
import { IMPACT_STEPS } from '../sections/ImpactPath'

/* ─────────────────────────────────────────────────────────────
   صفحة «أثرنا» — وفق خطة المحتوى المعتمدة:
   الافتتاحية | الأثر في أرقام (٥ مؤشرات معتمدة) | كيف نصنع
   الأثر؟ (التسلسل الرباعي الموحّد — مستورد من ImpactPath حرفياً)
   | أثر يمتد (نموذجا بارع وأشبال) | أثر برامجنا (٣ بطاقات →
   صفحات البرامج) | التوثيق والتقارير.
   المؤجل: «قصص الأثر» — بانتظار حالات حقيقية موثقة، لا تُؤلَّف.
   الأرقام من أحدث بيانات معتمدة (نفس أرقام الرئيسية).
   ───────────────────────────────────────────────────────────── */

const titleFont = "'TheYearofHandicrafts', 'IBM Plex Sans Arabic', sans-serif"
const ACCENT = '#ef9122'

const INTRO = [
  'في رواسم، لا ينتهي الأثر عند عدد المشاركين أو ساعات البرامج؛ بل يظهر في قيمة تترسخ، ومهارة تنمو، وسلوك يتغير، ومسؤولية يكبر معها المستفيد ليصبح أكثر قدرة على التأثير في نفسه ومحيطه.',
  'ومن خلال برامج وتجارب تربوية متنوعة، تعمل رواسم على بناء أثر يمتد من التجربة داخل البرنامج إلى حياة المستفيد في أسرته ومدرسته ومجتمعه.',
]

/* ⚠️ نفس القيم المعتمدة في قسم الأرقام بالرئيسية — تُحدَّث معاً */
const NUMBERS = [
  {
    name: 'الوصول', value: '+9,000', label: 'مستفيد', icon: '/images/stats/reach.svg',
    desc: 'حجم المستفيدين الذين وصلت إليهم برامج ومشاريع رواسم خلال الفترة المعتمدة.',
  },
  {
    name: 'ساعات التجربة', value: '3,600', label: 'ساعة', icon: '/images/stats/hours.svg',
    desc: 'حجم الوقت التربوي المباشر الذي استثمرته الجمعية في تنفيذ برامجها وتجاربها مع المستفيدين.',
  },
  {
    name: 'البرامج والمشاريع', value: '28', label: 'برنامج ومشروع', icon: '/images/stats/programs.svg',
    desc: 'عدد البرامج والمشاريع والمبادرات التي نفذتها رواسم ضمن محفظتها خلال الفترة.',
  },
  {
    name: 'التطوع', value: '178', label: 'متطوع ومتطوعة', icon: '/images/stats/volunteer.svg',
    desc: 'حجم إسهام المتطوعين والمتطوعات في تنفيذ برامج الجمعية وصناعة تجربتها.',
  },
  {
    name: 'الشراكة', value: '20', label: 'شراكة', icon: '/images/stats/partnership.svg',
    desc: 'حجم شبكة الجهات التي أسهمت مع رواسم في دعم البرامج وتوسيع نطاق أثرها.',
  },
]

const EXTEND_INTRO =
  'تختلف صور الأثر باختلاف البرامج، وتظهر في رواسم من خلال نماذج متعددة؛ من استدامة العلاقة بالمستفيد، إلى انتقال القيم والمعاني إلى ممارسات في حياته اليومية.'

const EXTEND = [
  {
    title: 'من مستفيد إلى مؤثر',
    program: 'بارع',
    logo: '/images/programs/barie-logo.svg',
    color: '#ef9122',
    body: 'في بارع، تمتد رحلة الطالب إلى ما بعد المشاركة في البرنامج؛ إذ يبرز التقرير انتقال المستفيد إلى أدوار أكثر تأثيرًا، واستمرار الأثر بعد التخرج، ويشير إلى أن 90% من فريق العمل من خريجي بارع.',
  },
  {
    title: 'من قيمة إلى ممارسة',
    program: 'أشبال رواسم',
    logo: '/images/programs/ashbal-logo.svg',
    color: '#7fb8d4',
    body: 'في أشبال رواسم، تُصمم المشاريع لتحويل القيمة من مفهوم يتلقاه الطفل إلى تجربة يشارك فيها ثم ممارسة عملية؛ ويعرض التقرير نموذج التأثير:',
    chain: ['قيمة محددة', 'مشروع مخصص', 'تجربة تفاعلية', 'تطبيق عملي', 'أثر سلوكي مباشر'],
  },
]

/* أثر برامجنا — بطاقات تفتح صفحات البرامج */
const PROGRAMS_IMPACT = [
  {
    key: 'barie', name: 'بارع', title: 'أثر البناء والاستدامة القيادية',
    logo: '/images/programs/barie-logo.svg', color: '#ef9122', colorSoft: 'rgba(239,145,34,0.22)',
    body: 'بيئة ممتدة تنقل الطالب من المشاركة إلى تحمل المسؤولية، وتفتح له مسارًا للاستمرار والتأثير بعد التخرج.',
  },
  {
    key: 'ashbal', name: 'أشبال رواسم', title: 'أثر التجربة في السلوك',
    logo: '/images/programs/ashbal-logo.svg', color: '#7fb8d4', colorSoft: 'rgba(127,184,212,0.22)',
    body: 'مشاريع تربوية تحول القيم والمعاني إلى مواقف وتطبيقات قريبة من حياة الطفل وسلوكه اليومي.',
  },
  {
    key: 'saif', name: 'صيف رواسم', title: 'أثر الموسم والتجربة القيمية',
    logo: '/images/programs/saif-logo.svg', color: '#5db8a4', colorSoft: 'rgba(93,184,164,0.22)',
    body: 'موسم يجمع أندية وتجارب متعددة داخل إطار قيمي واحد، ويستثمر الصيف في التعلم والمهارات والترفيه الهادف.',
  },
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

const Lead = ({ children, delay = 0.08 }) => (
  <motion.p {...rise(delay)} className="mx-auto mb-12 max-w-3xl text-center"
    style={{ color: '#dcebf2', fontWeight: 300, fontSize: '15.5px', lineHeight: 2.05 }}>
    {children}
  </motion.p>
)

export default function Impact({ onOpenPage = () => {} }) {
  return (
    <div dir="rtl" className="relative w-full overflow-hidden pb-28">

      {/* ═══ افتتاحية أثرنا ═══ */}
      <div className="relative overflow-hidden" style={{ paddingTop: '150px', paddingBottom: '84px' }}>
        <div className="pointer-events-none absolute inset-0">
          <img src="/images/impact-back.jpg" alt="" aria-hidden="true" draggable="false"
            className="h-full w-full object-cover" />
          <div style={{ position: 'absolute', inset: 0,
            background: 'linear-gradient(180deg, rgba(8,38,51,0.9) 0%, rgba(13,58,77,0.8) 45%, rgba(4,23,32,0.97) 100%)' }} />
        </div>
        <div className="relative mx-auto flex w-full max-w-4xl flex-col items-center px-6 text-center">
          <motion.h1 {...rise(0)} className="mb-7 text-white"
            style={{ fontFamily: titleFont, fontWeight: 700, fontSize: 'clamp(28px, 3.8vw, 50px)', lineHeight: 1.5 }}>
            أثرنا الحقيقي هو{' '}
            <span style={{
              backgroundImage: 'linear-gradient(120deg, #ffb85c, #ef9122)',
              WebkitBackgroundClip: 'text', backgroundClip: 'text',
              color: 'transparent', WebkitTextFillColor: 'transparent',
              padding: '0.35em 0.1em', margin: '-0.35em -0.1em',
            }}>ما يبقى</span>
            {' '}بعد انتهاء التجربة
          </motion.h1>
          {INTRO.map((p, i) => (
            <motion.p key={i} {...rise(0.1 + i * 0.08)} className="max-w-3xl"
              style={{ color: '#dcebf2', fontWeight: 300, fontSize: '15.5px', lineHeight: 2.05, margin: i === 0 ? '0 0 12px' : 0 }}>
              {p}
            </motion.p>
          ))}
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-6 pt-16 md:px-10 md:pt-24">

        {/* ═══ الأثر في أرقام ═══ */}
        <SectionTitle>الأثر في أرقام</SectionTitle>
        <div className="mb-24 mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {NUMBERS.map((n, i) => (
            <motion.div key={n.name} {...rise(0.05 * i)}
              whileHover={{ y: -5, transition: { duration: 0.25 } }}
              className="relative flex flex-col overflow-hidden"
              style={glass({ borderRadius: '26px', padding: '30px 28px' })}>
              <span aria-hidden="true" style={{ position: 'absolute', top: 0, insetInline: '18%', height: '2px',
                background: `linear-gradient(90deg, transparent, ${ACCENT}99, transparent)` }} />
              <div className="mb-5 flex items-center justify-between gap-3">
                <img src={n.icon} alt="" aria-hidden="true" draggable="false" style={{ width: '48px', height: '48px' }} />
                <div className="text-left" dir="ltr">
                  <span style={{ fontFamily: titleFont, fontWeight: 700, fontSize: '36px', lineHeight: 1,
                    backgroundImage: 'linear-gradient(120deg, #ffb85c, #ef9122)', WebkitBackgroundClip: 'text', backgroundClip: 'text',
                    color: 'transparent', WebkitTextFillColor: 'transparent', padding: '0.1em 0.05em', margin: '-0.1em -0.05em' }}>{n.value}</span>
                  <span className="block" style={{ color: '#b6ccd6', fontWeight: 300, fontSize: '12.5px', marginTop: '6px', textAlign: 'left' }}>{n.label}</span>
                </div>
              </div>
              <h3 style={{ fontFamily: titleFont, color: 'white', fontWeight: 700, fontSize: '20px', margin: '0 0 10px' }}>{n.name}</h3>
              <p style={{ color: '#c9dde8', fontWeight: 300, fontSize: '13.5px', lineHeight: 1.95, margin: 0 }}>{n.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* ═══ كيف نصنع الأثر؟ — التسلسل الرباعي الموحّد ═══ */}
        <SectionTitle>كيف نصنع الأثر؟</SectionTitle>
        <div className="mb-24 mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {IMPACT_STEPS.map((s, i) => (
            <motion.div key={s.title} {...rise(0.06 * i)}
              whileHover={{ y: -5, transition: { duration: 0.25 } }}
              className="relative overflow-hidden"
              style={glass({ borderRadius: '26px', padding: '30px 26px' })}>
              <span aria-hidden="true" style={{ position: 'absolute', top: '-24px', left: '-6px', fontFamily: titleFont, fontWeight: 700,
                fontSize: '100px', lineHeight: 1, color: `${s.accent}1f`, userSelect: 'none' }}>
                {s.num}
              </span>
              <span className="mb-4 block" style={{ width: '10px', height: '10px', borderRadius: '50%', background: s.accent, boxShadow: `0 0 12px ${s.accent}` }} />
              <h3 style={{ fontFamily: titleFont, fontWeight: 700, fontSize: '21px', margin: '0 0 10px',
                ...(s.final
                  ? { backgroundImage: 'linear-gradient(120deg, #ffb85c, #ef9122)', WebkitBackgroundClip: 'text', backgroundClip: 'text',
                      color: 'transparent', WebkitTextFillColor: 'transparent' }
                  : { color: 'white' }) }}>{s.title}</h3>
              <p style={{ color: '#dcebf2', fontWeight: 300, fontSize: '14px', lineHeight: 2, margin: 0 }}>{s.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* ═══ أثر يمتد ═══ */}
        <SectionTitle>أثر يمتد</SectionTitle>
        <Lead>{EXTEND_INTRO}</Lead>
        <div className="mb-24 grid gap-5 md:grid-cols-2">
          {EXTEND.map((e, i) => (
            <motion.div key={e.title} {...rise(0.08 * i)}
              whileHover={{ y: -5, transition: { duration: 0.25 } }}
              className="relative flex flex-col overflow-hidden"
              style={glass({ borderRadius: '28px', padding: '34px 30px' })}>
              <div aria-hidden="true" className="pointer-events-none absolute"
                style={{ top: '-40%', left: '-15%', width: '55%', height: '100%', borderRadius: '50%',
                  background: `radial-gradient(ellipse, ${e.color}24 0%, transparent 65%)`, filter: 'blur(46px)' }} />
              <div className="mb-4 flex items-center justify-between gap-4">
                <div>
                  <span style={{ color: e.color, fontWeight: 600, fontSize: '12.5px', letterSpacing: '0.06em' }}>{e.program}</span>
                  <h3 style={{ fontFamily: titleFont, color: 'white', fontWeight: 700, fontSize: '23px', margin: '6px 0 0' }}>{e.title}</h3>
                </div>
                <img src={e.logo} alt={e.program} draggable="false" className="h-[46px] w-auto flex-shrink-0 object-contain opacity-90" />
              </div>
              <p style={{ color: '#dcebf2', fontWeight: 300, fontSize: '15px', lineHeight: 2.05, margin: 0 }}>{e.body}</p>
              {e.chain && (
                <div className="mt-5 flex flex-wrap items-center gap-2">
                  {e.chain.map((step, j) => (
                    <div key={step} className="flex items-center gap-2">
                      <span style={{ ...glass({ borderRadius: '999px', padding: '7px 14px' }), color: 'white', fontWeight: 400, fontSize: '12px',
                        border: `0.5px solid ${e.color}52` }}>
                        {step}
                      </span>
                      {j < e.chain.length - 1 && (
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={e.color} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M15 18l-6-6 6-6" />
                        </svg>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* ═══ أثر برامجنا ═══ */}
        <SectionTitle>أثر برامجنا</SectionTitle>
        <div className="mb-24 mt-12 grid gap-5 md:grid-cols-3">
          {PROGRAMS_IMPACT.map((p, i) => (
            <motion.div key={p.key} {...rise(0.06 * i)}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              onClick={() => onOpenPage(p.key)}
              className="group relative flex cursor-pointer flex-col overflow-hidden"
              style={glass({ borderRadius: '26px', padding: '32px 28px' })}>
              <div aria-hidden="true" className="pointer-events-none absolute"
                style={{ top: '-40%', right: '-15%', width: '55%', height: '100%', borderRadius: '50%',
                  background: `radial-gradient(ellipse, ${p.colorSoft} 0%, transparent 65%)`, filter: 'blur(46px)' }} />
              <img src={p.logo} alt={p.name} draggable="false" className="mb-5 h-[52px] w-auto self-start object-contain" />
              <h3 style={{ fontFamily: titleFont, color: 'white', fontWeight: 700, fontSize: '20px', lineHeight: 1.6, margin: '0 0 10px' }}>{p.title}</h3>
              <p className="flex-1" style={{ color: '#dcebf2', fontWeight: 300, fontSize: '14.5px', lineHeight: 2, margin: 0 }}>{p.body}</p>
              <span className="mt-5 flex items-center gap-2" style={{ color: p.color, fontWeight: 500, fontSize: '13.5px' }}>
                تعرّف على {p.name}
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={p.color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
                  aria-hidden="true" className="transition-transform duration-300 group-hover:-translate-x-1">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </span>
            </motion.div>
          ))}
        </div>

        {/* ═══ التوثيق والتقارير ═══ */}
        <motion.div {...rise(0.05)} className="relative overflow-hidden"
          style={glass({ borderRadius: '28px', padding: 'clamp(30px, 4.5vw, 48px)' })}>
          <div aria-hidden="true" className="pointer-events-none absolute"
            style={{ top: '-40%', right: '-8%', width: '40%', height: '110%', borderRadius: '50%',
              background: 'radial-gradient(ellipse, rgba(239,145,34,0.16) 0%, transparent 65%)', filter: 'blur(55px)' }} />
          <div className="flex flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-right">
            <div>
              <h3 style={{ fontFamily: titleFont, color: 'white', fontWeight: 700, fontSize: '24px', margin: '0 0 8px' }}>التوثيق والتقارير</h3>
              <p style={{ color: '#dcebf2', fontWeight: 300, fontSize: '15px', lineHeight: 2, margin: 0 }}>
                تعرّف على منجزات رواسم ومؤشرات أدائها بصورة أشمل من خلال تقاريرها السنوية.
              </p>
            </div>
            <motion.button
              type="button" onClick={() => onOpenPage('gov-reports')}
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              className="flex flex-shrink-0 cursor-pointer items-center gap-2.5"
              style={{ borderRadius: '999px', padding: '13px 26px', border: 'none',
                background: 'linear-gradient(135deg, #ef9122 0%, #c9760f 100%)',
                boxShadow: '0 10px 26px rgba(239,145,34,0.35)' }}>
              <span style={{ color: 'white', fontWeight: 600, fontSize: '14.5px' }}>استعرض التقارير السنوية</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
