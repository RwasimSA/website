import { motion } from 'framer-motion'
import { glass, color } from '../theme'
import { text } from '../typography'

/* ─────────────────────────────────────────────────────────────
   صفحة «عن رواسم» — وفق خطة المحتوى المعتمدة:
   من نحن؟ | لماذا رواسم؟ | الرؤية والرسالة | قيم رواسم (أسماء فقط)
   | أهداف رواسم | نهج رواسم | ختام الصفحة.
   قسم «رحلتنا» مؤجل بانتظار محطات موثقة — لا يُبنى بالاستنتاج.
   ───────────────────────────────────────────────────────────── */

const titleFont = "'TheYearofHandicrafts', 'IBM Plex Sans Arabic', sans-serif"

const WHO =
  'جمعية رواسم لتنمية الطفل جمعية أهلية متخصصة في بناء القيم وتنمية المهارات لدى الأطفال والناشئة، من خلال برامج ومشاريع تربوية تراعي احتياجاتهم ومراحلهم العمرية، وتوظف التجربة والممارسة في بناء الشخصية؛ للإسهام في إعداد جيل يعتز بقيمه، ممكّن بمهاراته، وقادر على صناعة الأثر.'

const WHY = [
  'لأن بناء الإنسان يبدأ مبكرًا؛ ففي مراحل الطفولة والناشئة تتشكل جوانب أساسية من الوعي والقيم والقدرات التي تصاحب الإنسان في مسيرته.',
  'ومن هنا تعمل رواسم على تقديم برامج وتجارب تربوية تراعي احتياجات المراحل العمرية المختلفة، وتجمع بين بناء القيم وتنمية المهارات والتعلم بالممارسة؛ لتسهم في بناء شخصية متوازنة وقادرة على التعامل مع متغيرات الحياة وصناعة أثرها في المجتمع.',
]

const VISION = 'بناء جيل طموح يعتز بقيمه، ممكّن بالمهارات، ويصنع الأثر.'
const MISSION =
  'نسعى في جمعية رواسم لتنمية الطفل إلى تقديم برامج قيمية ومهارية متخصصة، تساهم في بناء شخصية متوازنة وقادرة على التأثير الإيجابي، عبر بيئة تعليمية محفزة وكفاءات مؤهلة، بالشراكة مع المجتمع.'

/* أسماء القيم فقط — لا تعريفات حتى تُعتمد مؤسسياً */
const VALUES = ['الإحسان', 'الإبداع', 'الاحترافية', 'الرحمة', 'المسؤولية']

const GOALS = [
  { verb: 'تقديم', body: 'برامج تربوية متخصصة تركز على غرس الإحسان وتنمية السلوك الإيجابي لدى الأطفال والناشئة.' },
  { verb: 'تحسين', body: 'التحصيل الدراسي للمستفيدين من خلال برامج تعليمية داعمة وموجهة.' },
  { verb: 'ابتكار', body: 'حلول وبرامج جديدة في التوجيه التربوي تناسب احتياجات الأطفال بمختلف فئاتهم.' },
  { verb: 'بناء', body: 'منظومة معرفية تربوية متكاملة تسهم في تعزيز القيم والمهارات لدى الأطفال والناشئة.' },
  { verb: 'تمكين', body: 'الأطفال والناشئة بمهارات الحياة والقيادة بما يعزز ثقتهم بأنفسهم وقدرتهم على التأثير.' },
]

const APPROACH = [
  {
    title: 'بناء يجمع القيم والمهارات',
    body: 'تجمع برامج رواسم بين غرس القيم وتنمية المهارات وبناء الشخصية، دون فصل هذه الجوانب عن بعضها.',
    accent: '#4db3d4',
  },
  {
    title: 'مراعاة المرحلة العمرية',
    body: 'تُبنى البرامج والمشاريع بما يتناسب مع احتياجات المستفيدين ومراحلهم العمرية.',
    accent: '#2fa7cc',
  },
  {
    title: 'التعلم بالتجربة والممارسة',
    body: 'توظّف المواقف والتجارب والأنشطة والتطبيقات لتحويل ما يتعلمه المستفيد إلى ممارسة وسلوك.',
    accent: '#f4a63f',
  },
  {
    title: 'بيئة تصنع المسؤولية والأثر',
    body: 'تمنح البرامج المستفيد مساحة للمشاركة وتحمل المسؤولية والمبادرة، ويظهر ذلك بأوضح صوره في بارع من خلال انتقال المستفيد إلى أدوار أكثر تأثيرًا.',
    accent: '#ef9122',
  },
]

const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
})

const SectionTitle = ({ children, delay = 0 }) => (
  <motion.h2 {...rise(delay)} className="mb-10 text-center text-white"
    style={{ fontFamily: titleFont, fontWeight: 700, fontSize: 'clamp(26px, 3vw, 38px)', lineHeight: 1.4 }}>
    {children}
  </motion.h2>
)

export default function AboutUs({ onOpenPage = () => {} }) {
  return (
    <div dir="rtl" className="relative w-full overflow-hidden pb-28 pt-36">

      {/* باترن الهوية خلف رأس الصفحة */}
      <img src="/images/hero-pattern.png" alt="" aria-hidden="true" draggable="false"
        className="pointer-events-none absolute left-0 top-0 w-full"
        style={{ opacity: 0.3, filter: 'blur(7px)' }} />

      <div className="relative mx-auto w-full max-w-6xl px-6 md:px-10">

        {/* ═══ رأس الصفحة + من نحن؟ ═══ */}
        <div className="mb-20 grid items-center gap-12 md:grid-cols-2">
          <div>
            <motion.h1 {...rise(0)} className="mb-6 text-white"
              style={{ fontFamily: titleFont, fontWeight: 700, fontSize: 'clamp(34px, 4.4vw, 56px)', lineHeight: 1.35 }}>
              من نحن؟
            </motion.h1>
            <motion.div {...rise(0.08)} className="mb-7 h-px w-24"
              style={{ background: 'linear-gradient(to left, #ef9122, transparent)' }} />
            <motion.p {...rise(0.14)} style={{ color: '#dcebf2', fontWeight: 300, fontSize: '16px', lineHeight: 2.1, margin: 0 }}>
              {WHO}
            </motion.p>
          </div>
          <motion.div {...rise(0.2)}>
            <div style={{ position: 'relative', width: '100%', aspectRatio: '16 / 9', borderRadius: '22px', overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.2)', boxShadow: '0 26px 60px rgba(3,15,21,0.45)' }}>
              <iframe
                src="https://www.youtube.com/embed/LVLUfS4L45c"
                title="كيف بدينا.. ووين وصلنا؟ | منظومة صيف رواسم"
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </motion.div>
        </div>

        {/* ═══ لماذا رواسم؟ ═══ */}
        <motion.div {...rise(0.05)} className="relative mb-24 overflow-hidden"
          style={glass({ borderRadius: '32px', padding: 'clamp(30px, 5vw, 56px)' })}>
          {/* توهج زاوية */}
          <div aria-hidden="true" className="pointer-events-none absolute"
            style={{ top: '-30%', left: '-10%', width: '50%', height: '90%', borderRadius: '50%',
              background: 'radial-gradient(ellipse, rgba(239,145,34,0.14) 0%, transparent 65%)', filter: 'var(--fx-blur, blur(60px))' }} />
          <h2 className="mb-6 text-white" style={{ fontFamily: titleFont, fontWeight: 700, fontSize: 'clamp(24px, 2.8vw, 34px)' }}>
            لماذا رواسم؟
          </h2>
          {WHY.map((p, i) => (
            <p key={i} style={{ color: '#dcebf2', fontWeight: 300, fontSize: '15.5px', lineHeight: 2.1, marginBottom: i === 0 ? '14px' : 0 }}>
              {p}
            </p>
          ))}
        </motion.div>

        {/* ═══ الرؤية والرسالة ═══ */}
        <div className="mb-24 grid gap-5 md:grid-cols-2">
          {[{ label: 'الرؤية', body: VISION, icon: 'M12 4.5C7 4.5 2.7 7.6 1 12c1.7 4.4 6 7.5 11 7.5s9.3-3.1 11-7.5c-1.7-4.4-6-7.5-11-7.5z M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z' },
            { label: 'الرسالة', body: MISSION, icon: 'M13 2 3 14h7l-1 8 10-12h-7l1-8z' }].map((item, i) => (
            <motion.div key={item.label} {...rise(0.08 + i * 0.1)}
              whileHover={{ y: -5, transition: { duration: 0.25 } }}
              className="relative overflow-hidden"
              style={glass({ borderRadius: '26px', padding: '36px 32px' })}>
              <div style={{ position: 'absolute', top: 0, right: 0, width: '4px', height: '100%', background: 'linear-gradient(180deg, #ef9122, transparent)' }} />
              <div className="mb-5 flex items-center gap-3.5">
                <span style={{ width: '46px', height: '46px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'linear-gradient(135deg, rgba(239,145,34,0.25) 0%, rgba(201,118,15,0.12) 100%)', border: '1px solid rgba(239,145,34,0.4)' }}>
                  <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="#f4a63f" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                    <path d={item.icon} />
                  </svg>
                </span>
                <h3 style={{ fontFamily: titleFont, color: 'white', fontWeight: 700, fontSize: '24px', margin: 0 }}>{item.label}</h3>
              </div>
              <p style={{ color: '#dcebf2', fontWeight: 300, fontSize: '15.5px', lineHeight: 2, margin: 0 }}>{item.body}</p>
            </motion.div>
          ))}
        </div>

        {/* ═══ قيم رواسم — أسماء فقط ═══ */}
        <SectionTitle>قيم رواسم</SectionTitle>
        <div className="mb-24 flex flex-wrap items-center justify-center gap-4">
          {VALUES.map((v, i) => (
            <motion.div key={v} {...rise(0.05 * i)}
              whileHover={{ y: -4, scale: 1.03, transition: { duration: 0.25 } }}
              className="flex items-center gap-3"
              style={glass({ borderRadius: '999px', padding: '16px 30px' })}>
              <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#ef9122', boxShadow: '0 0 12px rgba(239,145,34,0.8)' }} />
              <span style={{ fontFamily: titleFont, color: 'white', fontWeight: 700, fontSize: '21px' }}>{v}</span>
            </motion.div>
          ))}
        </div>

        {/* ═══ أهداف رواسم ═══ */}
        <SectionTitle>أهداف رواسم</SectionTitle>
        <div className="mb-24 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {GOALS.map((g, i) => (
            <motion.div key={g.verb} {...rise(0.05 * i)}
              whileHover={{ y: -4, transition: { duration: 0.25 } }}
              className={i === GOALS.length - 1 ? 'sm:col-span-2 lg:col-span-1' : ''}
              style={glass({ padding: '28px 26px' })}>
              <h3 className="mb-3" style={{ fontFamily: titleFont, fontWeight: 700, fontSize: '26px', margin: 0,
                backgroundImage: 'linear-gradient(120deg, #ffb85c, #ef9122)', WebkitBackgroundClip: 'text', backgroundClip: 'text',
                color: 'transparent', WebkitTextFillColor: 'transparent', display: 'inline-block', padding: '0.15em 0.05em', margin: '-0.15em -0.05em' }}>
                {g.verb}
              </h3>
              <p style={{ color: '#dcebf2', fontWeight: 300, fontSize: '14.5px', lineHeight: 1.95, margin: '10px 0 0' }}>{g.body}</p>
            </motion.div>
          ))}
        </div>

        {/* ═══ نهج رواسم ═══ */}
        <SectionTitle>نهج رواسم</SectionTitle>
        <div className="mb-28 grid gap-5 md:grid-cols-2">
          {APPROACH.map((a, i) => (
            <motion.div key={a.title} {...rise(0.06 * i)}
              whileHover={{ y: -5, transition: { duration: 0.25 } }}
              className="relative overflow-hidden"
              style={glass({ borderRadius: '26px', padding: '32px 30px' })}>
              <span aria-hidden="true" style={{ position: 'absolute', top: '-26px', left: '-8px', fontFamily: titleFont, fontWeight: 700,
                fontSize: '110px', lineHeight: 1, color: 'rgba(255,255,255,0.05)', userSelect: 'none' }}>
                {['١', '٢', '٣', '٤'][i]}
              </span>
              <div className="mb-4 flex items-center gap-3">
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: a.accent, boxShadow: `0 0 12px ${a.accent}` }} />
                <h3 style={{ fontFamily: titleFont, color: 'white', fontWeight: 700, fontSize: '22px', margin: 0 }}>{a.title}</h3>
              </div>
              <p style={{ color: '#dcebf2', fontWeight: 300, fontSize: '15px', lineHeight: 2, margin: 0 }}>{a.body}</p>
            </motion.div>
          ))}
        </div>

        {/* ═══ ختام الصفحة ═══ */}
        <div className="flex flex-col items-center">
          <motion.div {...rise(0)} className="flex flex-col items-center gap-4 sm:flex-row">
            {/* استكشف برامجنا — رئيسي */}
            <motion.button
              onClick={() => onOpenPage('programs')}
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }}
              className="flex items-center gap-3.5"
              style={{ borderRadius: '999px', padding: '8px 26px 8px 8px', cursor: 'pointer',
                background: 'linear-gradient(135deg, rgba(13,58,77,0.6) 0%, rgba(8,38,51,0.6) 100%)',
                backdropFilter: 'var(--glass, blur(20px))', WebkitBackdropFilter: 'var(--glass, blur(20px))',
                border: '0.5px solid rgba(255,255,255,0.16)' }}>
              <span style={{ color: 'white', fontWeight: 500, fontSize: '15px' }}>استكشف برامجنا</span>
              <span style={{ width: '46px', height: '46px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'linear-gradient(135deg, #ef9122 0%, #c9760f 100%)', boxShadow: '0 0 18px rgba(239,145,34,0.55)' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 5 12 12 19" />
                </svg>
              </span>
            </motion.button>
            {/* تعرّف على أثرنا — ثانوي */}
            <motion.button
              onClick={() => onOpenPage('impact')}
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }}
              className="flex items-center"
              style={{ borderRadius: '999px', padding: '8px 30px', minHeight: '62px', cursor: 'pointer',
                background: 'linear-gradient(145deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)',
                backdropFilter: 'var(--glass, blur(20px))', WebkitBackdropFilter: 'var(--glass, blur(20px))',
                border: '0.5px solid rgba(255,255,255,0.16)' }}>
              <span style={{ color: 'white', fontWeight: 500, fontSize: '15px' }}>تعرّف على أثرنا</span>
            </motion.button>
          </motion.div>

          {/* رابط نصي خفيف */}
          <motion.button {...rise(0.1)}
            onClick={() => onOpenPage('gov-reports')}
            whileHover={{ scale: 1.03 }}
            className="mt-8 cursor-pointer border-none bg-transparent"
            style={{ color: '#a2becf', fontSize: '14px', fontWeight: 300 }}>
            الاطلاع على <span style={{ color: '#f4a63f', fontWeight: 500, textDecoration: 'underline', textUnderlineOffset: '5px' }}>الحوكمة والتقارير</span>
          </motion.button>
        </div>
      </div>
    </div>
  )
}
