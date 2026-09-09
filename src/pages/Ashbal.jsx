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
const PROG = progMedia('ashbal')


/* ─────────────────────────────────────────────────────────────
   صفحة برنامج «أشبال رواسم» — وفق خطة المحتوى المعتمدة:
   الافتتاحية | عن أشبال | لمن البرنامج؟ | كيف يعمل؟ (المشاريع)
   | ماذا نبني؟ | ما يميز؟ | أثر أشبال | ختام خفيف.
   المؤجل بانتظار مواده: «من أشبال رواسم» (مواد بصرية موثقة)،
   الأسئلة الشائعة (أسئلة فعلية فقط)، وCTA التسجيل (وفق الآلية
   الفعلية). أوصاف المشاريع تُراجع مع الحقائب المعتمدة قبل النشر.
   رقم 15 متطوعًا غير مستخدم بانتظار التحقق منه.
   ───────────────────────────────────────────────────────────── */

const titleFont = "'TheYearofHandicrafts', 'IBM Plex Sans Arabic', sans-serif"
/* لون برنامج أشبال — الأزرق الفاتح كما في بطاقته بالرئيسية */
const ACCENT = '#7fb8d4'

const HERO_TEXT =
  'مظلة لمشاريع تربوية موجهة لطلاب المرحلة الابتدائية، تقدم خلال العام تجارب متنوعة تجمع بين القيم والتعلم بالممارسة؛ لتقريب المعاني التربوية من حياة الطفل وتحويلها إلى مواقف وممارسات يعيشها في بيته ومدرسته ومحيطه.'

const ABOUT = [
  'يقدم أشبال رواسم مجموعة من المشاريع التربوية المصممة لطلاب المرحلة الابتدائية، بحيث يركز كل مشروع على قيمة أو مهارة أو معنى تربوي محدد، ويقدمه للطفل من خلال تجربة عملية وتفاعلية تناسب مرحلته العمرية.',
  'وتقوم الفكرة على تحويل المعاني التربوية من مفاهيم مجردة إلى مواقف يعيشها الطفل ويشارك فيها؛ عبر أنشطة وتجارب متنوعة تجمع بين التعلم، والحركة، والتفاعل، والتطبيق، بما يساعد على ترسيخ السلوك الإيجابي وامتداد أثر التجربة إلى حياة الطفل في البيت والمدرسة.',
]

const FOR_WHO =
  'يستهدف أشبال رواسم طلاب المرحلة الابتدائية، ويقدّم لهم مشاريع وتجارب تراعي خصائص هذه المرحلة واحتياجاتها، وتقرّب القيم والمعاني التربوية بأساليب عملية وتفاعلية تناسب عالم الطفل وطريقة تعلّمه.'

const HOW_INTRO = [
  'يعمل أشبال رواسم من خلال مشاريع تربوية متنوعة تُقدَّم على مدار العام، ويُبنى كل مشروع حول معنى أو هدف تربوي محدد، ثم يُترجم إلى تجربة عملية تناسب الطفل وتساعده على فهمه وممارسته في حياته.',
  'وتتنوع المشاريع في موضوعاتها وأساليبها، لتقدم للطفل في كل مرة تجربة مختلفة، ضمن توجه تربوي يجمع بينها ويجعل التعلم مرتبطًا بالموقف والممارسة.',
]

/* مشاريع أشبال — المرجع: التقرير السنوي 2025 */
const PROJECTS = [
  {
    title: 'مشوار الأشبال',
    icon: '/images/ashbal/p-mishwar.svg',
    body: 'ثلاث جولات تربوية إيمانية تهدف إلى ترسيخ معنى عظمة الله من خلال عروض مرئية وزيارات ميدانية وأساليب تأملية.',
  },
  {
    title: 'بصلاتي أرتقي',
    icon: '/images/ashbal/p-salati.svg',
    body: 'مشروع تعليمي يهدف إلى تعليم صفة الصلاة والوضوء للصغار بطريقة ممتعة ومشوقة من خلال استراتيجيات التعلم النشط والتجربة والتطبيق المباشر.',
  },
  {
    title: 'أشبال الخير',
    icon: '/images/ashbal/p-khair.svg',
    body: 'مشروع رمضاني تفاعلي يهدف إلى تحبيب الأشبال في تلاوة القرآن، وتعليم أحكام الصيام، وتعزيز التعاون الأسري، واستثمار الوقت بصورة إيجابية.',
  },
  {
    title: 'يوم النجاح',
    icon: '/images/ashbal/p-najah.svg',
    body: 'مشروع يغرس قيمة شكر الله، ويحفز على التميز الدراسي بالاحتفال بإنجازات طلاب المرحلة الابتدائية وتشجيعهم على الاستمرار.',
  },
]

/* أمثلة مستخرجة من المشاريع الحالية — ليست مجالات ثابتة للمظلة */
const BUILD = [
  { value: 'تعظيم الله وبناء العلاقة به', project: 'مشوار الأشبال' },
  { value: 'الصلاة والعبادة بالممارسة', project: 'بصلاتي أرتقي' },
  { value: 'القيم الرمضانية والتعاون الأسري', project: 'أشبال الخير' },
  { value: 'الشكر والدافعية للتميّز', project: 'يوم النجاح' },
]

const DISTINCT = [
  {
    title: 'أثر قريب من حياة الطفل',
    icon: '/images/ashbal/d-home.svg',
    body: 'تُصمم التجربة لتنعكس على سلوك الطفل في بيته ومدرسته ومحيطه.',
  },
  {
    title: 'بناء تربوي مركز',
    icon: '/images/ashbal/d-target.svg',
    body: 'كل مشروع له هدف تربوي واضح ومحدد، وتُبنى التجربة كاملة حوله.',
  },
  {
    title: 'أثر سلوكي قابل للملاحظة',
    icon: '/images/ashbal/d-behaviour.svg',
    body: 'يتجه النموذج من قيمة محددة إلى مشروع مخصص ثم تجربة تفاعلية وتطبيق عملي وصولًا إلى أثر سلوكي مباشر.',
  },
]

/* ⚠️ القيم الرقمية تُستبدل بأحدث بيانات معتمدة وقت الإطلاق */
const IMPACT = [
  { value: '+450', label: 'مستفيدًا', icon: '/images/ashbal/i-reach.svg' },
  { value: '6', label: 'مشاريع', icon: '/images/ashbal/i-programs.svg' },
  { value: '+80', label: 'ساعة', icon: '/images/ashbal/i-hours.svg' },
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
    style={{ width: `${size}px`, height: `${size}px`, background: 'rgba(127,184,212,0.1)', border: '0.5px solid rgba(127,184,212,0.32)' }}>
    <img src={src} alt="" aria-hidden="true" draggable="false" style={{ width: `${Math.round(size * 0.6)}px`, height: `${Math.round(size * 0.6)}px` }} />
  </div>
)

export default function Ashbal({ onOpenPage = () => {} }) {
  return (
    <div dir="rtl" className="relative w-full overflow-hidden pb-28">

      {/* ═══ افتتاحية البرنامج ═══ */}
      <div className="relative overflow-hidden" style={{ paddingTop: '150px', paddingBottom: '90px' }}>
        <div className="pointer-events-none absolute inset-0">
          {PROG.img && <img src={PROG.img} alt="" aria-hidden="true" draggable="false"
            className="h-full w-full object-cover" />}
          <div style={{ position: 'absolute', inset: 0,
            background: 'linear-gradient(180deg, rgba(8,38,51,0.9) 0%, rgba(13,58,77,0.78) 45%, rgba(4,23,32,0.96) 100%)' }} />
        </div>
        {/* نودل أشبال يتدلى من أعلى الصفحة */}
        {PROG.pattern && <motion.img src={PROG.pattern} alt="" aria-hidden="true" draggable="false"
          className="pointer-events-none absolute"
          style={{ top: '-40px', left: '4%', width: 'min(420px, 40vw)' }}
          animate={{ y: [0, -8, 0], rotate: [0, 1.2, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }} />}

        <div className="relative mx-auto flex w-full max-w-4xl flex-col items-center px-6 text-center">
          {PROG.logo && <motion.img {...rise(0)} src={PROG.logo} alt="أشبال رواسم" draggable="false"
            className="mb-8 h-[110px] w-auto object-contain"
            style={{ filter: 'drop-shadow(0 6px 16px rgba(3,15,21,0.4))' }} />}
          <motion.h1 {...rise(0.08)} className="mb-6 text-white"
            style={{ fontFamily: titleFont, fontWeight: 700, fontSize: 'clamp(30px, 4vw, 52px)', lineHeight: 1.45 }}>
            قيمٌ يعيشها الطفل في تجارب قريبة من{' '}
            <span style={{
              backgroundImage: 'linear-gradient(120deg, #cfe8f5, #7fb8d4)',
              WebkitBackgroundClip: 'text', backgroundClip: 'text',
              color: 'transparent', WebkitTextFillColor: 'transparent',
              padding: '0.35em 0.1em', margin: '-0.35em -0.1em',
            }}>عالمه</span>
          </motion.h1>
          <motion.p {...rise(0.16)} className="mb-9 max-w-3xl"
            style={{ color: '#dcebf2', fontWeight: 300, fontSize: '16px', lineHeight: 2.05, margin: 0 }}>
            {HERO_TEXT}
          </motion.p>
          {/* بطاقتا الفئة والطبيعة */}
          <motion.div {...rise(0.24)} className="mt-9 flex flex-wrap items-center justify-center gap-3">
            {[
              { k: 'الفئة', v: 'طلاب المرحلة الابتدائية' },
              { k: 'الطبيعة', v: 'مشاريع تربوية متنوعة خلال العام' },
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

        {/* ═══ عن أشبال رواسم ═══ */}
        <motion.div {...rise(0.05)} className="relative -mt-6 mb-24 overflow-hidden"
          style={glass({ borderRadius: '32px', padding: 'clamp(30px, 5vw, 54px)' })}>
          <div aria-hidden="true" className="pointer-events-none absolute"
            style={{ top: '-35%', right: '-10%', width: '45%', height: '95%', borderRadius: '50%',
              background: 'radial-gradient(ellipse, rgba(127,184,212,0.14) 0%, transparent 65%)', filter: 'var(--fx-blur, blur(60px))' }} />
          <h2 className="mb-6 text-white" style={{ fontFamily: titleFont, fontWeight: 700, fontSize: 'clamp(24px, 2.8vw, 34px)' }}>
            عن أشبال رواسم
          </h2>
          <span aria-hidden="true" className="mb-6 block h-[3px] w-14 rounded-full"
            style={{ background: `linear-gradient(90deg, ${ACCENT}, transparent)`, boxShadow: `0 0 14px ${ACCENT}66`, marginTop: '-16px' }} />
          {ABOUT.map((p, i) => (
            <p key={i} style={{ color: '#dcebf2', fontWeight: 300, fontSize: '15.5px', lineHeight: 2.1, marginBottom: i === 0 ? '14px' : 0 }}>{p}</p>
          ))}
        </motion.div>

        {/* ═══ لمن البرنامج؟ ═══ */}
        <SectionTitle>لمن البرنامج؟</SectionTitle>
        <motion.div {...rise(0.08)} className="relative mx-auto mb-24 max-w-3xl overflow-hidden"
          style={glass({ borderRadius: '24px', padding: '32px 30px' })}>
          <div style={{ position: 'absolute', top: 0, right: 0, width: '4px', height: '100%', background: `linear-gradient(180deg, ${ACCENT}, transparent)` }} />
          <p className="text-center" style={{ color: '#dcebf2', fontWeight: 300, fontSize: '15.5px', lineHeight: 2.1, margin: 0 }}>{FOR_WHO}</p>
        </motion.div>

        {/* ═══ كيف يعمل أشبال رواسم؟ — المشاريع ═══ */}
        <SectionTitle>كيف يعمل أشبال رواسم؟</SectionTitle>
        <Lead>{HOW_INTRO[0]}</Lead>
        <Lead delay={0.12}>{HOW_INTRO[1]}</Lead>
        <div className="mb-24 grid gap-5 md:grid-cols-2">
          {PROJECTS.map((h, i) => (
            <motion.div key={h.title} {...rise(0.06 * i)}
              whileHover={{ y: -5, transition: { duration: 0.25 } }}
              className="relative overflow-hidden"
              style={glass({ borderRadius: '26px', padding: '32px 30px' })}>
              {/* خيط علوي بلون البرنامج */}
              <span aria-hidden="true" style={{ position: 'absolute', top: 0, insetInline: '18%', height: '2px',
                background: `linear-gradient(90deg, transparent, ${ACCENT}99, transparent)` }} />
              <IconChip src={h.icon} />
              <div className="mb-4 mt-5 flex items-center gap-3">
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: ACCENT, boxShadow: `0 0 12px ${ACCENT}` }} />
                <h3 style={{ fontFamily: titleFont, color: 'white', fontWeight: 700, fontSize: '22px', margin: 0 }}>{h.title}</h3>
              </div>
              <p style={{ color: '#dcebf2', fontWeight: 300, fontSize: '15px', lineHeight: 2, margin: 0 }}>{h.body}</p>
            </motion.div>
          ))}
        </div>

        {/* ═══ ماذا نبني؟ — أمثلة مستخرجة من المشاريع الحالية ═══ */}
        <SectionTitle>ماذا نبني؟</SectionTitle>
        <Lead>أمثلة على المعاني التي تبنيها مشاريع أشبال رواسم الحالية، وكل معنى يظهر في مشروع مخصص له.</Lead>
        <div className="mb-24 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {BUILD.map((b, i) => (
            <motion.div key={b.value} {...rise(0.05 * i)}
              whileHover={{ y: -4, transition: { duration: 0.22 } }}
              className="flex flex-col items-center gap-4 text-center"
              style={glass({ borderRadius: '24px', padding: '28px 20px' })}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: ACCENT, boxShadow: `0 0 10px ${ACCENT}` }} />
              <h3 style={{ fontFamily: titleFont, color: 'white', fontWeight: 700, fontSize: '18.5px', lineHeight: 1.7, margin: 0 }}>{b.value}</h3>
              <span className="mt-auto" style={{ color: '#a2becf', fontWeight: 300, fontSize: '12.5px' }}>
                يظهر في <span style={{ color: ACCENT, fontWeight: 500 }}>{b.project}</span>
              </span>
            </motion.div>
          ))}
        </div>

        {/* ═══ ما يميز أشبال رواسم؟ ═══ */}
        <SectionTitle>ما يميز أشبال رواسم؟</SectionTitle>
        <div className="mb-24 mt-10 grid gap-5 md:grid-cols-3">
          {DISTINCT.map((d, i) => (
            <motion.div key={d.title} {...rise(0.06 * i)}
              whileHover={{ y: -5, transition: { duration: 0.25 } }}
              className="relative overflow-hidden"
              style={glass({ borderRadius: '26px', padding: '32px 28px' })}>
              <div aria-hidden="true" className="pointer-events-none absolute"
                style={{ top: '-40%', left: '-15%', width: '55%', height: '100%', borderRadius: '50%',
                  background: 'radial-gradient(ellipse, rgba(127,184,212,0.14) 0%, transparent 65%)', filter: 'var(--fx-blur, blur(46px))' }} />
              <IconChip src={d.icon} size={58} />
              <h3 className="mt-5" style={{ fontFamily: titleFont, color: 'white', fontWeight: 700, fontSize: '21px', margin: '20px 0 0' }}>{d.title}</h3>
              <p style={{ color: '#dcebf2', fontWeight: 300, fontSize: '15px', lineHeight: 2, margin: '14px 0 0' }}>{d.body}</p>
            </motion.div>
          ))}
        </div>

        {/* ═══ أثر أشبال رواسم ═══ */}
        <SectionTitle>أثر أشبال رواسم</SectionTitle>
        <div className="mb-6 mt-10 grid gap-4 sm:grid-cols-3">
          {IMPACT.map((s, i) => (
            <motion.div key={s.label} {...rise(0.06 * i)}
              className="flex flex-col items-center text-center"
              style={glass({ borderRadius: '26px', padding: '30px 20px 34px' })}>
              <img src={s.icon} alt="" aria-hidden="true" draggable="false"
                style={{ width: '52px', height: '52px', marginBottom: '16px' }} />
              <span dir="ltr" style={{ fontFamily: titleFont, fontWeight: 700, fontSize: '44px', lineHeight: 1,
                backgroundImage: 'linear-gradient(120deg, #cfe8f5, #7fb8d4)', WebkitBackgroundClip: 'text', backgroundClip: 'text',
                color: 'transparent', WebkitTextFillColor: 'transparent', padding: '0.1em 0.05em', margin: '-0.1em -0.05em' }}>{s.value}</span>
              <span className="mt-3 block h-0.5 w-7 rounded-full" style={{ background: `linear-gradient(90deg, transparent, ${ACCENT}, transparent)` }} />
              <span style={{ color: '#b6ccd6', fontWeight: 300, fontSize: '14px', marginTop: '10px' }}>{s.label}</span>
            </motion.div>
          ))}
        </div>
        {/* من التجربة إلى السلوك */}
        <motion.div {...rise(0.12)} className="relative mb-28 overflow-hidden"
          style={glass({ borderRadius: '28px', padding: 'clamp(28px, 4vw, 44px)' })}>
          <div aria-hidden="true" className="pointer-events-none absolute"
            style={{ top: '-40%', right: '-8%', width: '40%', height: '110%', borderRadius: '50%',
              background: 'radial-gradient(ellipse, rgba(127,184,212,0.2) 0%, transparent 65%)', filter: 'blur(55px)' }} />
          <div className="text-center">
            <h3 className="mb-2.5" style={{ fontFamily: titleFont, fontWeight: 700, fontSize: '24px', margin: 0,
              backgroundImage: 'linear-gradient(120deg, #cfe8f5, #7fb8d4)', WebkitBackgroundClip: 'text', backgroundClip: 'text',
              color: 'transparent', WebkitTextFillColor: 'transparent' }}>
              من التجربة إلى السلوك
            </h3>
            <p style={{ color: '#dcebf2', fontWeight: 300, fontSize: '15px', lineHeight: 2, margin: '12px auto 0', maxWidth: '640px' }}>
              تبنى المشاريع بصورة تنتقل بالمعنى من القيمة إلى التطبيق العملي والسلوك.
            </p>
          </div>
        </motion.div>

        {/* ═══ ختام خفيف ═══ */}
        <div className="flex flex-col items-center">
          <motion.button {...rise(0)}
            onClick={() => onOpenPage('inquiries')}
            whileHover={{ scale: 1.03 }}
            className="cursor-pointer border-none bg-transparent"
            style={{ color: '#a2becf', fontSize: '14.5px', fontWeight: 300 }}>
            للاستفسار عن أشبال رواسم؟ <span style={{ color: '#f4a63f', fontWeight: 500, textDecoration: 'underline', textUnderlineOffset: '5px' }}>تواصل معنا</span>
          </motion.button>
        </div>
      </div>
    </div>
  )
}
