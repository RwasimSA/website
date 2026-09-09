import { motion } from 'framer-motion'
import { glass } from '../theme'

/* وسائط البرامج من لوحة ديوان — الشعار والرسمة من بطاقات الرئيسية،
   وصورة البرنامج من قائمة «برامجنا». الفارغ لا يُعرض حتى يُرفع بديله. */
import programsContent from '../../content/programs.json'
const __IDX = { ashbal: 0, barie: 1, saif: 2 }
const progMedia = (k) => {
  const card = (programsContent.cards || [])[__IDX[k]] || {}
  const main = (programsContent.main || []).find((p) => p.key === k) || {}
  return { logo: card.logo || main.logo || '', pattern: card.pattern || '', img: main.img || '' }
}
const PROG = progMedia('saif')


/* ─────────────────────────────────────────────────────────────
   صفحة موسم «صيف رواسم» — وفق خطة المحتوى المعتمدة:
   الافتتاحية | عن الموسم | لمن؟ | كيف يعمل؟ (الأندية + المنطق
   البصري + بيانات أحدث نسخة) | ماذا نبني؟ | ما يميز؟ | أثر
   الموسم | ختام خفيف.
   المؤجل بانتظار مواده: «من صيف رواسم» (مواد بصرية من أحدث
   نسخة + فيديو تجميعي)، الأسئلة الشائعة (أسئلة فعلية فقط)،
   وCTA الختام (وفق حالة التسجيل الفعلية).
   العنوان الاتصالي مقترح — يُستبدل بشعار الموسم المعتمد إن وجد.
   بيانات النسخة 1448هـ/2026 موسمية متغيرة وتُعرض موسومة بنسختها.
   ───────────────────────────────────────────────────────────── */

const titleFont = "'TheYearofHandicrafts', 'IBM Plex Sans Arabic', sans-serif"
/* لون موسم الصيف — الأخضر التركوازي كما في بطاقته بالرئيسية */
const ACCENT = '#5db8a4'

const HERO_TEXT =
  'موسم سنوي تقدمه رواسم عبر مجموعة من الأندية والبرامج الموجهة لفئات عمرية متعددة، في تجربة صيفية تجمع بين القيم والمهارات والإبداع والترفيه، وتستثمر وقت المشاركين في أنشطة وتحديات وورش ورحلات وتجارب متنوعة.'

const ABOUT = [
  'يمثل صيف رواسم موسمًا تربويًا سنويًا تجمع فيه الجمعية عددًا من الأندية والبرامج الموجهة لفئات عمرية مختلفة، ضمن تجربة صيفية متكاملة تستثمر وقت المشاركين وتجمع بين المتعة والقيمة.',
  'ويقوم الموسم على تنوع التجارب اليومية؛ من الأنشطة الحركية والتحديات، إلى الورش والرحلات والفعاليات الترفيهية، مع إطار قيمي موحد يوجّه التجربة ويمنح كل فئة ما يناسبها من محتوى وأساليب تطبيق. ويهدف هذا التنوع إلى أن يكون الصيف مساحة للتعلم بالممارسة، وتنمية المهارات، وتعزيز القيم في بيئة ممتعة ومحفزة.',
]

const FOR_WHO = [
  'يخدم صيف رواسم فئات عمرية متعددة من البنين والبنات، من خلال أندية وبرامج تُصمم بما يناسب احتياجات كل فئة ومرحلتها العمرية، مع المحافظة على الإطار العام للموسم في الجمع بين القيم والمهارات والترفيه.',
  'ويتوزع المشاركون على أندية وتجارب مخصصة بحسب الفئة، بما يتيح لكل مجموعة تجربة أكثر ملاءمة لاهتماماتها وخصائصها، بدل تقديم نموذج صيفي واحد للجميع.',
]

const HOW_INTRO =
  'يُقدَّم صيف رواسم من خلال مجموعة من الأندية والبرامج التي تعمل تحت مظلة موسم واحد، وتتشارك في الإطار القيمي والهدف العام، بينما تختلف في المحتوى والأنشطة وطريقة التقديم بما يناسب كل فئة.'

const CLUBS = [
  {
    title: 'نادي رواسم',
    icon: '/images/saif/c-rwasim.svg',
    body: 'تجربة صيفية موجهة لطلاب المرحلتين المتوسطة والثانوية، تجمع بين التحدي والترفيه والورش والأنشطة القيمية والمهارية.',
  },
  {
    title: 'نادي أشبال رواسم',
    icon: '/images/saif/c-ashbal.svg',
    body: 'تجربة صيفية لطلاب المرحلة الابتدائية، تجمع بين المحتوى القيمي والأنشطة الحركية والرياضية والتنافسية والرحلات.',
  },
  {
    title: 'برامج الفتيات',
    icon: '/images/saif/c-difaf.svg',
    body: 'مسار صيفي مخصص للفتيات تتنوع فيه التجارب بحسب كل نسخة من الموسم، ويجمع بين الجوانب القيمية والمعرفية والمهارية والاجتماعية.',
  },
]

/* المنطق البصري للموسم — تسلسل رباعي */
const LOGIC = ['إطار قيمي موحّد', 'أندية مخصصة لكل فئة', 'أنشطة + ورش + تحديات + رحلات', 'تجربة صيفية تناسب كل فئة']

/* بيانات أحدث نسخة — محتوى موسمي متغير، موسوم بنسخته */
const SEASON_LABEL = 'صيف رواسم 1448هـ / 2026'
const SEASON_ROWS = [
  { k: 'المدة', v: '4 أسابيع، من الأحد إلى الأربعاء، 6:30–10:30 مساءً' },
  { k: 'نادي رواسم الموسمي', v: 'بنين متوسط/ثانوي — 209 طلاب، 50 فريقًا' },
  { k: 'نادي أشبال رواسم', v: 'بنين ابتدائي علوي — 180 طالبًا، 30 فريقًا' },
  { k: 'نادي ضفاف للفتيات', v: 'متوسط/ثانوي/جامعي — 139 مستفيدة، 50 متطوعة' },
  { k: 'من منتجات الموسم', v: 'منصة النادي الرقمية، هاكاثون رواسم، تجربة السيرة VR، والدليل التشغيلي للقيم' },
]

const BUILD = [
  {
    title: 'تعزيز القيم',
    icon: '/images/saif/b-values.svg',
    body: 'توظف الأندية أنشطتها وتجاربها ضمن إطار قيمي يساعد على تقريب القيم من حياة المشاركين وتحويلها إلى ممارسات ومواقف داخل تجربة الموسم.',
  },
  {
    title: 'تنمية المهارات الحياتية',
    icon: '/images/saif/b-skills.svg',
    body: 'تتيح الورش والتحديات والأنشطة والتجارب للمشاركين فرصًا لتنمية مهارات تتناسب مع مراحلهم العمرية من خلال التعلم والتطبيق والمشاركة.',
  },
  {
    title: 'استثمار الوقت والطاقات',
    icon: '/images/saif/b-time.svg',
    body: 'يصمم الموسم ليجعل من الإجازة الصيفية مساحة نشطة للتجربة والتعلم والترفيه واستثمار طاقات المشاركين في بيئة محفزة.',
  },
]

const DISTINCT = [
  {
    title: 'موسم يجمع فئات متعددة',
    icon: '/images/saif/d-season.svg',
    body: 'يصنع تجربة واحدة تستوعب فئات عمرية مختلفة من خلال أندية وبرامج مخصصة.',
  },
  {
    title: 'ترفيه يحمل قيمة',
    icon: '/images/saif/d-fun.svg',
    body: 'تُوظف الأنشطة والتحديات والرحلات داخل تجربة تجمع المتعة بالقيمة.',
  },
  {
    title: 'إطار يضبط التجربة',
    icon: '/images/saif/d-frame.svg',
    body: 'يعتمد الموسم على إطار قيمي موحد يتضمن معايير سلوكية ومنهجيات تطبيق وإرشادات للقادة والمتطوعين.',
  },
  {
    title: 'كوادر تصنع الموسم',
    icon: '/images/saif/d-team.svg',
    body: 'ترتبط التجربة أيضًا بطريقة إدارة الأندية وتفاعل القادة والمتطوعين مع المشاركين، لا بالمحتوى وحده.',
  },
]

/* ⚠️ من بيانات أحدث نسخة مكتملة (1448هـ/2026) — تُحدَّث مع كل موسم */
const IMPACT = [
  { value: '500', label: 'مستفيد تقريبًا في الموسم', icon: '/images/saif/i-reach.svg' },
  { value: '3', label: 'أندية وبرامج', icon: '/images/saif/i-clubs.svg' },
  { value: '4', label: 'أسابيع مدة الموسم', icon: '/images/saif/i-weeks.svg' },
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

const IconChip = ({ src, size = 62 }) => (
  <div className="flex flex-shrink-0 items-center justify-center rounded-2xl"
    style={{ width: `${size}px`, height: `${size}px`, background: 'rgba(93,184,164,0.1)', border: '0.5px solid rgba(93,184,164,0.32)' }}>
    <img src={src} alt="" aria-hidden="true" draggable="false" style={{ width: `${Math.round(size * 0.6)}px`, height: `${Math.round(size * 0.6)}px` }} />
  </div>
)

export default function Saif({ onOpenPage = () => {} }) {
  return (
    <div dir="rtl" className="relative w-full overflow-hidden pb-28">

      {/* ═══ افتتاحية الموسم ═══ */}
      <div className="relative overflow-hidden" style={{ paddingTop: '150px', paddingBottom: '90px' }}>
        <div className="pointer-events-none absolute inset-0">
          {PROG.img && <img src={PROG.img} alt="" aria-hidden="true" draggable="false"
            className="h-full w-full object-cover" />}
          <div style={{ position: 'absolute', inset: 0,
            background: 'linear-gradient(180deg, rgba(8,38,51,0.9) 0%, rgba(13,58,77,0.78) 45%, rgba(4,23,32,0.96) 100%)' }} />
        </div>
        {/* نودل الصيف يتدلى من أعلى الصفحة */}
        {PROG.pattern && <motion.img src={PROG.pattern} alt="" aria-hidden="true" draggable="false"
          className="pointer-events-none absolute"
          style={{ top: '-40px', left: '4%', width: 'min(420px, 40vw)' }}
          animate={{ y: [0, -8, 0], rotate: [0, 1.2, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }} />}

        <div className="relative mx-auto flex w-full max-w-4xl flex-col items-center px-6 text-center">
          {PROG.logo && <motion.img {...rise(0)} src={PROG.logo} alt="صيف رواسم" draggable="false"
            className="mb-8 h-[110px] w-auto object-contain"
            style={{ filter: 'drop-shadow(0 6px 16px rgba(3,15,21,0.4))' }} />}
          <motion.h1 {...rise(0.08)} className="mb-6 text-white"
            style={{ fontFamily: titleFont, fontWeight: 700, fontSize: 'clamp(30px, 4vw, 52px)', lineHeight: 1.45 }}>
            صيفٌ تتحول فيه الأيام إلى تجارب{' '}
            <span style={{
              backgroundImage: 'linear-gradient(120deg, #a9e2d3, #5db8a4)',
              WebkitBackgroundClip: 'text', backgroundClip: 'text',
              color: 'transparent', WebkitTextFillColor: 'transparent',
              padding: '0.35em 0.1em', margin: '-0.35em -0.1em',
            }}>تصنع أثرًا</span>
          </motion.h1>
          <motion.p {...rise(0.16)} className="mb-9 max-w-3xl"
            style={{ color: '#dcebf2', fontWeight: 300, fontSize: '16px', lineHeight: 2.05, margin: 0 }}>
            {HERO_TEXT}
          </motion.p>
          {/* بطاقتا الفئة والطبيعة */}
          <motion.div {...rise(0.24)} className="mt-9 flex flex-wrap items-center justify-center gap-3">
            {[
              { k: 'الفئة', v: 'فئات عمرية متعددة' },
              { k: 'الطبيعة', v: 'موسم سنوي متعدد الأندية والبرامج' },
            ].map((c) => (
              <div key={c.k} className="flex items-center gap-3"
                style={glass({ borderRadius: '999px', padding: '11px 22px' })}>
                <span style={{ color: ACCENT, fontWeight: 600, fontSize: '12.5px', letterSpacing: '0.08em' }}>{c.k}</span>
                <span style={{ width: '1px', height: '14px', background: 'rgba(255,255,255,0.25)' }} />
                <span style={{ color: 'white', fontWeight: 400, fontSize: '13.5px' }}>{c.v}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-6 md:px-10">

        {/* ═══ عن صيف رواسم ═══ */}
        <motion.div {...rise(0.05)} className="relative -mt-6 mb-24 overflow-hidden"
          style={glass({ borderRadius: '32px', padding: 'clamp(30px, 5vw, 54px)' })}>
          <div aria-hidden="true" className="pointer-events-none absolute"
            style={{ top: '-35%', right: '-10%', width: '45%', height: '95%', borderRadius: '50%',
              background: 'radial-gradient(ellipse, rgba(93,184,164,0.14) 0%, transparent 65%)', filter: 'blur(60px)' }} />
          <h2 className="mb-6 text-white" style={{ fontFamily: titleFont, fontWeight: 700, fontSize: 'clamp(24px, 2.8vw, 34px)' }}>
            عن صيف رواسم
          </h2>
          <span aria-hidden="true" className="mb-6 block h-[3px] w-14 rounded-full"
            style={{ background: `linear-gradient(90deg, ${ACCENT}, transparent)`, boxShadow: `0 0 14px ${ACCENT}66`, marginTop: '-16px' }} />
          {ABOUT.map((p, i) => (
            <p key={i} style={{ color: '#dcebf2', fontWeight: 300, fontSize: '15.5px', lineHeight: 2.1, marginBottom: i === 0 ? '14px' : 0 }}>{p}</p>
          ))}
        </motion.div>

        {/* ═══ لمن صيف رواسم؟ ═══ */}
        <SectionTitle>لمن صيف رواسم؟</SectionTitle>
        <div className="mb-24 grid gap-5 md:grid-cols-2">
          {FOR_WHO.map((p, i) => (
            <motion.div key={i} {...rise(0.08 + i * 0.08)} className="relative overflow-hidden"
              style={glass({ borderRadius: '24px', padding: '30px 28px' })}>
              <div style={{ position: 'absolute', top: 0, right: 0, width: '4px', height: '100%', background: `linear-gradient(180deg, ${ACCENT}, transparent)` }} />
              <p style={{ color: '#dcebf2', fontWeight: 300, fontSize: '15px', lineHeight: 2.05, margin: 0 }}>{p}</p>
            </motion.div>
          ))}
        </div>

        {/* ═══ كيف يعمل صيف رواسم؟ — الأندية ═══ */}
        <SectionTitle>كيف يعمل صيف رواسم؟</SectionTitle>
        <Lead>{HOW_INTRO}</Lead>
        <div className="mb-10 grid gap-5 md:grid-cols-3">
          {CLUBS.map((c, i) => (
            <motion.div key={c.title} {...rise(0.06 * i)}
              whileHover={{ y: -5, transition: { duration: 0.25 } }}
              className="relative overflow-hidden"
              style={glass({ borderRadius: '26px', padding: '32px 28px' })}>
              <span aria-hidden="true" style={{ position: 'absolute', top: 0, insetInline: '18%', height: '2px',
                background: `linear-gradient(90deg, transparent, ${ACCENT}99, transparent)` }} />
              <IconChip src={c.icon} />
              <div className="mb-4 mt-5 flex items-center gap-3">
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: ACCENT, boxShadow: `0 0 12px ${ACCENT}` }} />
                <h3 style={{ fontFamily: titleFont, color: 'white', fontWeight: 700, fontSize: '21px', margin: 0 }}>{c.title}</h3>
              </div>
              <p style={{ color: '#dcebf2', fontWeight: 300, fontSize: '14.5px', lineHeight: 2, margin: 0 }}>{c.body}</p>
            </motion.div>
          ))}
        </div>

        {/* المنطق البصري للموسم — تسلسل رباعي */}
        <motion.div {...rise(0.1)} className="mb-12 flex flex-wrap items-center justify-center gap-2.5">
          {LOGIC.map((step, i) => (
            <div key={step} className="flex items-center gap-2.5">
              <span style={{ ...glass({ borderRadius: '999px', padding: '10px 20px' }), color: 'white', fontWeight: 400, fontSize: '13.5px',
                border: '0.5px solid rgba(93,184,164,0.32)' }}>
                {step}
              </span>
              {i < LOGIC.length - 1 && (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              )}
            </div>
          ))}
        </motion.div>

        {/* بيانات أحدث نسخة — محتوى موسمي موسوم بنسخته */}
        <motion.div {...rise(0.12)} className="relative mb-24 overflow-hidden"
          style={glass({ borderRadius: '28px', padding: 'clamp(26px, 4vw, 40px)' })}>
          <div aria-hidden="true" className="pointer-events-none absolute"
            style={{ top: '-40%', left: '-10%', width: '45%', height: '110%', borderRadius: '50%',
              background: 'radial-gradient(ellipse, rgba(93,184,164,0.16) 0%, transparent 65%)', filter: 'blur(55px)' }} />
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <span style={{ ...glass({ borderRadius: '999px', padding: '7px 16px' }), color: ACCENT, fontWeight: 600, fontSize: '12.5px',
              border: '0.5px solid rgba(93,184,164,0.4)' }}>
              أحدث نسخة
            </span>
            <h3 style={{ fontFamily: titleFont, color: 'white', fontWeight: 700, fontSize: '22px', margin: 0 }}>{SEASON_LABEL}</h3>
          </div>
          <div className="grid gap-x-8 gap-y-4 md:grid-cols-2">
            {SEASON_ROWS.map((r) => (
              <div key={r.k} className="flex items-start gap-3">
                <span className="mt-2.5 flex-shrink-0" style={{ width: '7px', height: '7px', borderRadius: '50%', background: ACCENT, boxShadow: `0 0 10px ${ACCENT}` }} />
                <p style={{ color: '#dcebf2', fontWeight: 300, fontSize: '14.5px', lineHeight: 1.9, margin: 0 }}>
                  <span style={{ color: 'white', fontWeight: 500 }}>{r.k}: </span>{r.v}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ═══ ماذا نبني؟ ═══ */}
        <SectionTitle>ماذا نبني؟</SectionTitle>
        <div className="mb-24 mt-10 grid gap-5 md:grid-cols-3">
          {BUILD.map((b, i) => (
            <motion.div key={b.title} {...rise(0.06 * i)}
              whileHover={{ y: -5, transition: { duration: 0.25 } }}
              className="relative overflow-hidden"
              style={glass({ borderRadius: '26px', padding: '32px 28px' })}>
              <div aria-hidden="true" className="pointer-events-none absolute"
                style={{ top: '-40%', left: '-15%', width: '55%', height: '100%', borderRadius: '50%',
                  background: 'radial-gradient(ellipse, rgba(93,184,164,0.14) 0%, transparent 65%)', filter: 'blur(46px)' }} />
              <IconChip src={b.icon} size={58} />
              <h3 className="mt-5" style={{ fontFamily: titleFont, color: 'white', fontWeight: 700, fontSize: '21px', margin: '20px 0 0' }}>{b.title}</h3>
              <p style={{ color: '#dcebf2', fontWeight: 300, fontSize: '14.5px', lineHeight: 2, margin: '14px 0 0' }}>{b.body}</p>
            </motion.div>
          ))}
        </div>

        {/* ═══ ما يميز صيف رواسم؟ ═══ */}
        <SectionTitle>ما يميز صيف رواسم؟</SectionTitle>
        <div className="mb-24 mt-10 grid gap-5 md:grid-cols-2">
          {DISTINCT.map((d, i) => (
            <motion.div key={d.title} {...rise(0.06 * i)}
              whileHover={{ y: -5, transition: { duration: 0.25 } }}
              className="relative overflow-hidden"
              style={glass({ borderRadius: '26px', padding: '32px 30px' })}>
              <div aria-hidden="true" className="pointer-events-none absolute"
                style={{ top: '-40%', left: '-15%', width: '55%', height: '100%', borderRadius: '50%',
                  background: 'radial-gradient(ellipse, rgba(93,184,164,0.14) 0%, transparent 65%)', filter: 'blur(46px)' }} />
              <div className="flex items-center gap-4">
                <IconChip src={d.icon} size={58} />
                <h3 style={{ fontFamily: titleFont, color: 'white', fontWeight: 700, fontSize: '22px', margin: 0 }}>{d.title}</h3>
              </div>
              <p style={{ color: '#dcebf2', fontWeight: 300, fontSize: '15px', lineHeight: 2, margin: '16px 0 0' }}>{d.body}</p>
            </motion.div>
          ))}
        </div>

        {/* ═══ أثر صيف رواسم — من بيانات أحدث نسخة مكتملة ═══ */}
        <SectionTitle>أثر صيف رواسم</SectionTitle>
        <Lead>مؤشرات أحدث نسخة مكتملة من الموسم — {SEASON_LABEL}.</Lead>
        <div className="mb-28 grid gap-4 sm:grid-cols-3">
          {IMPACT.map((s, i) => (
            <motion.div key={s.label} {...rise(0.06 * i)}
              className="flex flex-col items-center text-center"
              style={glass({ borderRadius: '26px', padding: '30px 20px 34px' })}>
              <img src={s.icon} alt="" aria-hidden="true" draggable="false"
                style={{ width: '52px', height: '52px', marginBottom: '16px' }} />
              <span dir="ltr" style={{ fontFamily: titleFont, fontWeight: 700, fontSize: '44px', lineHeight: 1,
                backgroundImage: 'linear-gradient(120deg, #a9e2d3, #5db8a4)', WebkitBackgroundClip: 'text', backgroundClip: 'text',
                color: 'transparent', WebkitTextFillColor: 'transparent', padding: '0.1em 0.05em', margin: '-0.1em -0.05em' }}>{s.value}</span>
              <span className="mt-3 block h-0.5 w-7 rounded-full" style={{ background: `linear-gradient(90deg, transparent, ${ACCENT}, transparent)` }} />
              <span style={{ color: '#b6ccd6', fontWeight: 300, fontSize: '14px', marginTop: '10px' }}>{s.label}</span>
            </motion.div>
          ))}
        </div>

        {/* ═══ ختام خفيف ═══ */}
        <div className="flex flex-col items-center">
          <motion.button {...rise(0)}
            onClick={() => onOpenPage('inquiries')}
            whileHover={{ scale: 1.03 }}
            className="cursor-pointer border-none bg-transparent"
            style={{ color: '#a2becf', fontSize: '14.5px', fontWeight: 300 }}>
            للاستفسار عن صيف رواسم؟ <span style={{ color: '#f4a63f', fontWeight: 500, textDecoration: 'underline', textUnderlineOffset: '5px' }}>تواصل معنا</span>
          </motion.button>
        </div>
      </div>
    </div>
  )
}
