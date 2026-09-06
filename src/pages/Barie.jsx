import { motion } from 'framer-motion'
import { glass } from '../theme'

/* ─────────────────────────────────────────────────────────────
   صفحة برنامج «بارع» — وفق خطة المحتوى المعتمدة:
   الافتتاحية | عن بارع | لمن البرنامج؟ | كيف يعمل؟ | ماذا نبني؟
   | ما يميز بارع؟ | أثر بارع | ختام خفيف.
   المؤجل بانتظار مواده: «من بارع» (4–6 مواد بصرية)، الأسئلة
   الشائعة (أسئلة فعلية فقط)، وCTA التسجيل (وفق الآلية الفعلية).
   ───────────────────────────────────────────────────────────── */

const titleFont = "'TheYearofHandicrafts', 'IBM Plex Sans Arabic', sans-serif"
const ACCENT = '#ef9122'

const HERO_TEXT =
  'برنامج تربوي ممتد لطلاب المرحلتين المتوسطة والثانوية، يقدم تجربة مستمرة تجمع بين البناء القيمي وتنمية المهارات والمعرفة، عبر بيئات تربوية مركزة تمنح الطالب مساحة للنمو والمشاركة وتحمل المسؤولية.'

const ABOUT = [
  'لأن بناء الشخصية يحتاج إلى وقت وتجربة مستمرة، يأتي بارع كبرنامج تربوي ممتد يرافق الطالب عبر مراحل متتابعة، ويمنحه بيئة تساعده على النمو في جوانب متعددة من شخصيته.',
  'يجمع البرنامج بين تعزيز القيم، وتنمية الوعي، وصقل المهارات، من خلال لقاءات وتجارب تربوية متنوعة تُقدَّم داخل بيئات مركزة، بما يسهم في بناء شخصية متوازنة، أكثر وعيًا بذاتها، وقادرة على تحمل المسؤولية وصناعة الأثر.',
]

const FOR_WHO = [
  'يستهدف بارع طلاب المرحلتين المتوسطة والثانوية، ويقدّم لكل مرحلة بيئات تربوية تناسب احتياجاتها وخصائصها العمرية، ضمن تجربة ممتدة تراعي تطور الطالب وتدرّجه في البناء.',
  'ويناسب البرنامج الطالب الذي يبحث عن بيئة مستمرة تساعده على تنمية وعيه، وتعزيز قيمه، وتطوير مهاراته، والمشاركة بصورة أوسع في التجارب والمسؤوليات التي تناسب مرحلته.',
]

const HOW_INTRO =
  'يقوم بارع على بيئات تربوية مستمرة ترافق الطالب خلال مرحلتي المتوسط والثانوي، وتمنحه تجربة ممتدة تتدرج معه في البناء، وتجمع بين اللقاءات المنتظمة والتجارب العملية والأنشطة والرحلات والملتقيات؛ بحيث يصبح البناء جزءًا من حياة الطالب وتجربته، لا محتوى يقدم في لقاء عابر.'

const HOW = [
  {
    title: 'بيئات تربوية مركزة',
    icon: '/images/barie/how-env.svg',
    body: 'يلتحق الطالب ببيئة تربوية محدودة العدد، تتيح علاقة أقرب مع المربي، ومساحة أكبر للمشاركة والتفاعل والمتابعة، وتستمر معه ضمن رحلة البرنامج.',
  },
  {
    title: 'لقاءات وبناء مستمر',
    icon: '/images/barie/how-build.svg',
    body: 'تُقدَّم داخل البيئة لقاءات وبرامج تربوية تجمع بين الجوانب القيمية والمعرفية والمهارية، ضمن بناء منهجي متدرج يراعي المرحلة العمرية للطالب.',
  },
  {
    title: 'تجارب ورحلات وملتقيات',
    icon: '/images/barie/how-trips.svg',
    body: 'يمتد التعلم خارج اللقاءات المعتادة من خلال الرحلات والتجارب والملتقيات التي تضع الطالب في مواقف متنوعة يمارس فيها ما يتعلمه ويطوّر علاقاته ومهاراته.',
  },
  {
    title: 'رحلة تمتد مع الطالب',
    icon: '/images/barie/how-journey.svg',
    body: 'تقوم التجربة على الاستمرارية والتدرج، بما يتيح للطالب أن ينتقل مع الوقت من المشاركة والتلقي إلى تحمل مسؤوليات أكبر والمساهمة في البيئة نفسها، وصولًا إلى أن يصبح مؤثرًا في غيره.',
  },
]

const EXAMPLES = ['غوص في أعماق الشرقية', 'آفاق الشرقية', 'ملتقى سمو الثالث']

const BUILD_INTRO =
  'ينظر بارع إلى بناء الطالب بصورة متكاملة، من خلال مجالات تربوية متعددة تتكامل في تنمية شخصيته، وتعزيز وعيه وقيمه ومهاراته بما يناسب مرحلته العمرية.'

/* أسماء المجالات العشرة فقط — تعريفاتها بانتظار اعتماد فريق بارع */
const DOMAINS = [
  'البناء الإيماني', 'البناء القيمي', 'البناء العقلي', 'البناء السلوكي', 'البناء الخُلقي',
  'العلم الشرعي', 'القرآن الكريم', 'البناء المهاري', 'التواصل والعلاقات', 'الترفيه والتجربة',
]

const DISTINCT = [
  {
    title: 'بناء منهجي متدرج',
    icon: '/images/barie/d-ladder.svg',
    body: 'لا يقوم بارع على تجميع أنشطة متفرقة؛ بل على بناء تربوي متدرج يراعي المرحلة العمرية ويجمع الجوانب القيمية والعقلية والسلوكية والإيمانية.',
  },
  {
    title: 'الاستدامة القيادية',
    icon: '/images/barie/d-lead.svg',
    body: 'يمنح البرنامج الطالب مساحة متزايدة للمشاركة وتحمل المسؤولية، بحيث لا يبقى مستفيدًا فقط، بل يمكن أن ينتقل مع الوقت إلى دور أكثر تأثيرًا داخل البيئة.',
  },
  {
    title: 'أثر يمتد بعد التخرج',
    icon: '/images/barie/d-grad.svg',
    body: 'يذكر التقرير استمرار الأثر بعد التخرج، وأن 90% من فريق العمل من خريجي بارع.',
  },
  {
    title: 'تجربة تربوية متكاملة',
    icon: '/images/barie/d-integrated.svg',
    body: 'يلتقي البناء داخل البيئة مع الرحلات والملتقيات والتجارب المتنوعة، بما يجعل التعلم مرتبطًا بالممارسة والمواقف الحقيقية.',
  },
]

/* ⚠️ القيم الرقمية تُستبدل بأحدث بيانات معتمدة وقت الإطلاق */
const IMPACT = [
  { value: '+130', label: 'مستفيدًا', icon: '/images/barie/i-reach.svg' },
  { value: '30', label: 'متطوعًا', icon: '/images/barie/i-volunteer.svg' },
  { value: '8', label: 'بيئات تربوية', icon: '/images/barie/i-env.svg' },
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

export default function Barie({ onOpenPage = () => {} }) {
  return (
    <div dir="rtl" className="relative w-full overflow-hidden pb-28">

      {/* ═══ افتتاحية البرنامج ═══ */}
      <div className="relative overflow-hidden" style={{ paddingTop: '150px', paddingBottom: '90px' }}>
        {/* خلفية بارع مع تظليل الهوية */}
        <div className="pointer-events-none absolute inset-0">
          <img src="/images/programs/card-barie.jpg" alt="" aria-hidden="true" draggable="false"
            className="h-full w-full object-cover" />
          <div style={{ position: 'absolute', inset: 0,
            background: 'linear-gradient(180deg, rgba(8,38,51,0.9) 0%, rgba(13,58,77,0.78) 45%, rgba(4,23,32,0.96) 100%)' }} />
        </div>
        {/* نودل بارع يتدلى من أعلى الصفحة */}
        <motion.img src="/images/programs/barie-pattern.png" alt="" aria-hidden="true" draggable="false"
          className="pointer-events-none absolute"
          style={{ top: '-40px', left: '4%', width: 'min(420px, 40vw)' }}
          animate={{ y: [0, -8, 0], rotate: [0, 1.2, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }} />

        <div className="relative mx-auto flex w-full max-w-4xl flex-col items-center px-6 text-center">
          <motion.img {...rise(0)} src="/images/programs/barie-logo.svg" alt="بارع" draggable="false"
            className="mb-8 h-[110px] w-auto object-contain"
            style={{ filter: 'drop-shadow(0 6px 16px rgba(3,15,21,0.4))' }} />
          <motion.h1 {...rise(0.08)} className="mb-6 text-white"
            style={{ fontFamily: titleFont, fontWeight: 700, fontSize: 'clamp(30px, 4vw, 52px)', lineHeight: 1.45 }}>
            بيئة تربوية ترافق الطالب في رحلة{' '}
            <span style={{
              backgroundImage: 'linear-gradient(120deg, #ffb85c, #ef9122)',
              WebkitBackgroundClip: 'text', backgroundClip: 'text',
              color: 'transparent', WebkitTextFillColor: 'transparent',
              padding: '0.35em 0.1em', margin: '-0.35em -0.1em',
            }}>بنائه</span>
          </motion.h1>
          <motion.p {...rise(0.16)} className="mb-9 max-w-3xl"
            style={{ color: '#dcebf2', fontWeight: 300, fontSize: '16px', lineHeight: 2.05, margin: 0 }}>
            {HERO_TEXT}
          </motion.p>
          {/* بطاقتا الفئة والطبيعة */}
          <motion.div {...rise(0.24)} className="mt-9 flex flex-wrap items-center justify-center gap-3">
            {[
              { k: 'الفئة', v: 'طلاب المرحلتين المتوسطة والثانوية' },
              { k: 'الطبيعة', v: 'برنامج تربوي ممتد' },
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

        {/* ═══ عن بارع ═══ */}
        <motion.div {...rise(0.05)} className="relative -mt-6 mb-24 overflow-hidden"
          style={glass({ borderRadius: '32px', padding: 'clamp(30px, 5vw, 54px)' })}>
          <div aria-hidden="true" className="pointer-events-none absolute"
            style={{ top: '-35%', right: '-10%', width: '45%', height: '95%', borderRadius: '50%',
              background: 'radial-gradient(ellipse, rgba(239,145,34,0.13) 0%, transparent 65%)', filter: 'blur(60px)' }} />
          <h2 className="mb-6 text-white" style={{ fontFamily: titleFont, fontWeight: 700, fontSize: 'clamp(24px, 2.8vw, 34px)' }}>
            عن بارع
          </h2>
          <span aria-hidden="true" className="mb-6 block h-[3px] w-14 rounded-full"
            style={{ background: `linear-gradient(90deg, ${ACCENT}, transparent)`, boxShadow: `0 0 14px ${ACCENT}66`, marginTop: '-16px' }} />
          {ABOUT.map((p, i) => (
            <p key={i} style={{ color: '#dcebf2', fontWeight: 300, fontSize: '15.5px', lineHeight: 2.1, marginBottom: i === 0 ? '14px' : 0 }}>{p}</p>
          ))}
        </motion.div>

        {/* ═══ لمن البرنامج؟ ═══ */}
        <SectionTitle>لمن البرنامج؟</SectionTitle>
        <div className="mb-24 grid gap-5 md:grid-cols-2">
          {FOR_WHO.map((p, i) => (
            <motion.div key={i} {...rise(0.08 + i * 0.08)} className="relative overflow-hidden"
              style={glass({ borderRadius: '24px', padding: '30px 28px' })}>
              <div style={{ position: 'absolute', top: 0, right: 0, width: '4px', height: '100%', background: `linear-gradient(180deg, ${ACCENT}, transparent)` }} />
              <p style={{ color: '#dcebf2', fontWeight: 300, fontSize: '15px', lineHeight: 2.05, margin: 0 }}>{p}</p>
            </motion.div>
          ))}
        </div>

        {/* ═══ كيف يعمل بارع؟ ═══ */}
        <SectionTitle>كيف يعمل بارع؟</SectionTitle>
        <Lead>{HOW_INTRO}</Lead>
        <div className="mb-8 grid gap-5 md:grid-cols-2">
          {HOW.map((h, i) => (
            <motion.div key={h.title} {...rise(0.06 * i)}
              whileHover={{ y: -5, transition: { duration: 0.25 } }}
              className="relative overflow-hidden"
              style={glass({ borderRadius: '26px', padding: '32px 30px' })}>
              {/* خيط برتقالي علوي */}
              <span aria-hidden="true" style={{ position: 'absolute', top: 0, insetInline: '18%', height: '2px',
                background: `linear-gradient(90deg, transparent, ${ACCENT}99, transparent)` }} />
              <span aria-hidden="true" style={{ position: 'absolute', top: '-26px', left: '-8px', fontFamily: titleFont, fontWeight: 700,
                fontSize: '110px', lineHeight: 1, color: 'rgba(239,145,34,0.09)', userSelect: 'none' }}>
                {['١', '٢', '٣', '٤'][i]}
              </span>
              <div className="mb-5 flex h-[62px] w-[62px] items-center justify-center rounded-2xl"
                style={{ background: 'rgba(239,145,34,0.1)', border: '0.5px solid rgba(239,145,34,0.3)' }}>
                <img src={h.icon} alt="" aria-hidden="true" draggable="false" style={{ width: '38px', height: '38px' }} />
              </div>
              <div className="mb-4 flex items-center gap-3">
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: ACCENT, boxShadow: `0 0 12px ${ACCENT}` }} />
                <h3 style={{ fontFamily: titleFont, color: 'white', fontWeight: 700, fontSize: '22px', margin: 0 }}>{h.title}</h3>
              </div>
              <p style={{ color: '#dcebf2', fontWeight: 300, fontSize: '15px', lineHeight: 2, margin: 0 }}>{h.body}</p>
            </motion.div>
          ))}
        </div>
        {/* أمثلة موثقة */}
        <motion.div {...rise(0.1)} className="mb-24 flex flex-wrap items-center justify-center gap-3">
          <span style={{ color: '#a2becf', fontWeight: 300, fontSize: '13.5px' }}>أمثلة من تجارب بارع:</span>
          {EXAMPLES.map((e) => (
            <span key={e} style={{ ...glass({ borderRadius: '999px', padding: '8px 18px' }), color: 'white', fontWeight: 400, fontSize: '13px' }}>
              {e}
            </span>
          ))}
        </motion.div>

        {/* ═══ ماذا نبني؟ ═══ */}
        <SectionTitle>ماذا نبني؟</SectionTitle>
        <Lead>{BUILD_INTRO}</Lead>
        <div className="mb-24 flex flex-wrap items-center justify-center gap-3.5">
          {DOMAINS.map((d, i) => (
            <motion.div key={d} {...rise(0.04 * i)}
              whileHover={{ y: -3, scale: 1.04, transition: { duration: 0.22 } }}
              className="flex items-center gap-2.5"
              style={{ ...glass({ borderRadius: '999px', padding: '13px 24px' }),
                border: '0.5px solid rgba(239,145,34,0.32)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.14), 0 6px 18px rgba(239,145,34,0.08)' }}>
              <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: ACCENT, boxShadow: `0 0 10px ${ACCENT}` }} />
              <span style={{ fontFamily: titleFont, color: 'white', fontWeight: 700, fontSize: '17px' }}>{d}</span>
            </motion.div>
          ))}
        </div>

        {/* ═══ ما يميز بارع؟ ═══ */}
        <SectionTitle>ما يميز بارع؟</SectionTitle>
        <div className="mb-24 mt-10 grid gap-5 md:grid-cols-2">
          {DISTINCT.map((d, i) => (
            <motion.div key={d.title} {...rise(0.06 * i)}
              whileHover={{ y: -5, transition: { duration: 0.25 } }}
              className="relative overflow-hidden"
              style={glass({ borderRadius: '26px', padding: '32px 30px' })}>
              <div aria-hidden="true" className="pointer-events-none absolute"
                style={{ top: '-40%', left: '-15%', width: '55%', height: '100%', borderRadius: '50%',
                  background: 'radial-gradient(ellipse, rgba(239,145,34,0.14) 0%, transparent 65%)', filter: 'blur(46px)' }} />
              <div className="flex items-center gap-4">
                <div className="flex h-[58px] w-[58px] flex-shrink-0 items-center justify-center rounded-2xl"
                  style={{ background: 'rgba(239,145,34,0.1)', border: '0.5px solid rgba(239,145,34,0.3)' }}>
                  <img src={d.icon} alt="" aria-hidden="true" draggable="false" style={{ width: '36px', height: '36px' }} />
                </div>
                <h3 style={{ fontFamily: titleFont, color: 'white', fontWeight: 700, fontSize: '22px', margin: 0 }}>{d.title}</h3>
              </div>
              <p style={{ color: '#dcebf2', fontWeight: 300, fontSize: '15px', lineHeight: 2, margin: '16px 0 0' }}>{d.body}</p>
            </motion.div>
          ))}
        </div>

        {/* ═══ أثر بارع ═══ */}
        <SectionTitle>أثر بارع</SectionTitle>
        <div className="mb-6 mt-10 grid gap-4 sm:grid-cols-3">
          {IMPACT.map((s, i) => (
            <motion.div key={s.label} {...rise(0.06 * i)}
              className="flex flex-col items-center text-center"
              style={glass({ borderRadius: '26px', padding: '30px 20px 34px' })}>
              <img src={s.icon} alt="" aria-hidden="true" draggable="false"
                style={{ width: '52px', height: '52px', marginBottom: '16px' }} />
              <span dir="ltr" style={{ fontFamily: titleFont, fontWeight: 700, fontSize: '44px', lineHeight: 1,
                backgroundImage: 'linear-gradient(120deg, #ffb85c, #ef9122)', WebkitBackgroundClip: 'text', backgroundClip: 'text',
                color: 'transparent', WebkitTextFillColor: 'transparent', padding: '0.1em 0.05em', margin: '-0.1em -0.05em' }}>{s.value}</span>
              <span className="mt-3 block h-0.5 w-7 rounded-full" style={{ background: `linear-gradient(90deg, transparent, ${ACCENT}, transparent)` }} />
              <span style={{ color: '#b6ccd6', fontWeight: 300, fontSize: '14px', marginTop: '10px' }}>{s.label}</span>
            </motion.div>
          ))}
        </div>
        {/* بطاقة 90% */}
        <motion.div {...rise(0.12)} className="relative mb-28 overflow-hidden"
          style={glass({ borderRadius: '28px', padding: 'clamp(28px, 4vw, 44px)' })}>
          <div aria-hidden="true" className="pointer-events-none absolute"
            style={{ top: '-40%', right: '-8%', width: '40%', height: '110%', borderRadius: '50%',
              background: 'radial-gradient(ellipse, rgba(239,145,34,0.18) 0%, transparent 65%)', filter: 'blur(55px)' }} />
          <div className="flex flex-col items-center gap-6 text-center md:flex-row md:text-right">
            <span dir="ltr" style={{ fontFamily: titleFont, fontWeight: 700, fontSize: 'clamp(52px, 6vw, 84px)', lineHeight: 1,
              backgroundImage: 'linear-gradient(120deg, #ffb85c, #ef9122)', WebkitBackgroundClip: 'text', backgroundClip: 'text',
              color: 'transparent', WebkitTextFillColor: 'transparent', flexShrink: 0, padding: '0.1em 0.05em', margin: '-0.1em -0.05em' }}>
              90%
            </span>
            <div>
              <h3 className="mb-2.5" style={{ fontFamily: titleFont, color: 'white', fontWeight: 700, fontSize: '23px', margin: 0 }}>
                من فريق العمل من خريجي بارع
              </h3>
              <p style={{ color: '#dcebf2', fontWeight: 300, fontSize: '15px', lineHeight: 2, margin: '10px 0 0' }}>
                يعكس هذا الرقم امتداد أثر البرنامج بعد التخرج، وانتقال عدد من مستفيديه إلى أدوار تطوعية وقيادية داخل رواسم.
              </p>
            </div>
          </div>
        </motion.div>

        {/* ═══ ختام خفيف ═══ */}
        <div className="flex flex-col items-center">
          <motion.button {...rise(0)}
            onClick={() => onOpenPage('inquiries')}
            whileHover={{ scale: 1.03 }}
            className="cursor-pointer border-none bg-transparent"
            style={{ color: '#a2becf', fontSize: '14.5px', fontWeight: 300 }}>
            للاستفسار عن بارع؟ <span style={{ color: '#f4a63f', fontWeight: 500, textDecoration: 'underline', textUnderlineOffset: '5px' }}>تواصل معنا</span>
          </motion.button>
        </div>
      </div>
    </div>
  )
}
