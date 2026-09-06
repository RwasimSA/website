import { motion } from 'framer-motion'
import { glass } from '../theme'

/* ─────────────────────────────────────────────────────────────
   صفحة «برامجنا» المجمّعة — وفق خطة المحتوى المعتمدة:
   الافتتاحية | البرامج الرئيسة (بارع/أشبال/صيف → صفحاتها)
   | المبادرات النوعية (٤ بطاقات بلا صفحات مستقلة) | ختام خفيف.
   الإجراء الختامي: لا توجد فرصة/تسجيل فعلي متاح حالياً، فتنتهي
   الصفحة برابط خفيف للمستجدات كما تجيز الخطة.
   ───────────────────────────────────────────────────────────── */

const titleFont = "'TheYearofHandicrafts', 'IBM Plex Sans Arabic', sans-serif"
const ACCENT = '#ef9122'

const INTRO =
  'نصمم في رواسم برامج ومشاريع وتجارب تربوية تراعي احتياجات الأطفال والناشئة ومراحلهم العمرية، وتجمع بين بناء القيم وتنمية المهارات والتعلم بالممارسة؛ لتقدم لكل فئة تجربة تناسبها وتسهم في بناء الشخصية وصناعة الأثر.'

/* البرامج الرئيسة — بترتيب الخطة، وكلٌّ يفتح صفحته */
const MAIN = [
  {
    key: 'barie',
    name: 'بارع',
    nature: 'برنامج تربوي ممتد',
    stage: 'المرحلة المتوسطة والثانوية',
    logo: '/images/programs/barie-logo.svg',
    pattern: '/images/programs/barie-pattern.png',
    img: '/images/programs/card-barie.jpg',
    color: '#ef9122',
    colorSoft: 'rgba(239,145,34,0.22)',
    desc: 'مسار تربوي ممتد يرافق الطالب عبر بيئات تربوية مركزة، تجمع بين البناء القيمي وتنمية الوعي وصقل المهارات، في تجربة مستمرة تمنحه مساحة للنمو والمشاركة وتحمل المسؤولية.',
  },
  {
    key: 'ashbal',
    name: 'أشبال رواسم',
    nature: 'مشاريع تربوية خلال العام',
    stage: 'المرحلة الابتدائية',
    logo: '/images/programs/ashbal-logo.svg',
    pattern: '/images/programs/ashbal-pattern.png',
    img: '/images/programs/card-ashbal.jpg',
    color: '#7fb8d4',
    colorSoft: 'rgba(127,184,212,0.22)',
    desc: 'مظلة لمشاريع تربوية متنوعة تُصمم لطلاب المرحلة الابتدائية، وتحول القيم والمعاني التربوية إلى تجارب ومواقف يعيشها الطفل ويمارسها في حياته، عبر أنشطة وتطبيقات تناسب مرحلته.',
  },
  {
    key: 'saif',
    name: 'صيف رواسم',
    nature: 'موسم سنوي',
    stage: 'فئات متعددة',
    logo: '/images/programs/saif-logo.svg',
    pattern: '/images/programs/saif-pattern.png',
    img: '/images/programs/card-saif.jpg',
    color: '#5db8a4',
    colorSoft: 'rgba(93,184,164,0.22)',
    desc: 'موسم سنوي يجمع عدة أندية وبرامج لفئات مختلفة، ضمن تجربة صيفية واحدة يوحّدها إطار قيمي، وتتنوّع فيها الأنشطة والورش والتحديات والرحلات بما يناسب كل فئة.',
  },
]

const INITIATIVES_INTRO =
  'إلى جانب برامجها الرئيسة، تطور رواسم مبادرات نوعية تستجيب لفرص واحتياجات تربوية محددة، وتوسّع أثر الجمعية من خلال تجارب ومنتجات متخصصة.'

const INITIATIVES = [
  {
    title: 'المسرح القيمي المتنقل',
    icon: '/images/initiatives/theater.svg',
    body: 'تجربة مسرحية متنقلة تقدم للطفل محتوى قيميًا تفاعليًا من خلال المسرح، وتوسّع وصول التجربة إلى البيئات المجتمعية المختلفة.',
  },
  {
    title: 'عيد رواسم',
    icon: '/images/initiatives/eid.svg',
    body: 'مبادرة سنوية ترتبط بصباح العيد، وتهدف إلى تعظيم شعيرة العيد وتعزيز قيمة الفرح من خلال حضور مجتمعي مباشر مع الأطفال والأسر.',
  },
  {
    title: 'الممارس المعتمد للطفولة',
    icon: '/images/initiatives/practitioner.svg',
    body: 'برنامج تأهيلي متخصص للعاملين والمتعاملين مع الأطفال، يركز على المعارف والأدوات الأساسية لنمو الطفل والتربية الإيجابية وإعداد الأنشطة الملائمة للطفل، ويؤهل للحصول على اعتماد من Pearson.',
  },
  {
    title: 'هاكاثون رواسم | ابتكارٌ.. يعزز القيم',
    icon: '/images/initiatives/hackathon.svg',
    body: 'تجربة تطويرية لطلاب المرحلة الثانوية، تجمع بين الابتكار وتنمية المهارات وتمكين المشاركين من أدوات الذكاء الاصطناعي، وتوظيفها في ابتكار حلول تعزز القيم.',
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

/* بطاقة برنامج رئيس — صورة البرنامج خلفيتها، تفتح صفحته */
const ProgramCard = ({ p, delay, onOpen }) => (
  <motion.div {...rise(delay)}
    whileHover={{ y: -7, transition: { duration: 0.25, ease: 'easeOut' } }}
    onClick={() => onOpen(p.key)}
    className="group relative flex-1 cursor-pointer overflow-visible"
    style={{ minWidth: 0 }}>
    {/* توهج بلون البرنامج */}
    <div className="pointer-events-none absolute" aria-hidden="true"
      style={{ inset: '-8% -14%', borderRadius: '50%', filter: 'blur(56px)',
        background: `radial-gradient(ellipse at 50% 25%, ${p.colorSoft} 0%, transparent 65%)` }} />

    <div className="relative flex h-full flex-col overflow-hidden"
      style={{ borderRadius: '34px', border: '1px solid rgba(255,255,255,0.18)',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.22), 0 24px 48px rgba(3,15,21,0.28)' }}>
      {/* صورة البرنامج أعلى البطاقة */}
      <div className="relative h-[190px] overflow-hidden">
        <img src={p.img} alt="" aria-hidden="true" draggable="false"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <div style={{ position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, rgba(8,38,51,0.28) 0%, rgba(8,38,51,0.55) 62%, rgba(10,42,56,0.96) 100%)' }} />
        <img src={p.logo} alt={p.name} draggable="false"
          className="absolute bottom-4 right-5 h-[54px] w-auto object-contain"
          style={{ filter: 'drop-shadow(0 4px 10px rgba(3,15,21,0.45))' }} />
      </div>
      {/* متن البطاقة */}
      <div className="relative flex flex-1 flex-col px-6 pb-7 pt-5 text-right"
        style={{ background: 'linear-gradient(165deg, rgba(21,81,108,0.92) 0%, rgba(13,58,77,0.94) 55%, rgba(10,46,62,0.96) 100%)' }}>
        <div className="mb-3.5 flex flex-wrap items-center gap-2">
          <span style={{ color: p.color, fontWeight: 600, fontSize: '12px' }}>{p.nature}</span>
          <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'rgba(255,255,255,0.35)' }} />
          <span style={{ color: '#b6ccd6', fontWeight: 400, fontSize: '12px' }}>{p.stage}</span>
        </div>
        <p className="flex-1" style={{ color: '#dcebf2', fontWeight: 300, fontSize: '14px', lineHeight: 2, margin: 0 }}>{p.desc}</p>
        <span className="mt-5 flex items-center gap-2" style={{ color: p.color, fontWeight: 500, fontSize: '13.5px' }}>
          تعرّف على {p.name}
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={p.color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
            aria-hidden="true" className="transition-transform duration-300 group-hover:-translate-x-1">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </span>
      </div>
    </div>

    {/* نودل البرنامج يتدلى فوق البطاقة */}
    <motion.img src={p.pattern} alt="" aria-hidden="true" draggable="false"
      className="pointer-events-none absolute"
      style={{ top: '-44px', left: '-10%', width: '76%', maxWidth: 'none', zIndex: 2 }}
      animate={{ y: [0, -6, 0], rotate: [0, 1, 0] }}
      transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }} />
  </motion.div>
)

export default function ProgramsPage({ onOpenPage = () => {} }) {
  return (
    <div dir="rtl" className="relative w-full overflow-hidden pb-28">

      {/* ═══ الافتتاحية ═══ */}
      <div className="relative overflow-hidden" style={{ paddingTop: '150px', paddingBottom: '80px' }}>
        <div className="pointer-events-none absolute inset-0">
          <img src="/images/programs-back.jpg" alt="" aria-hidden="true" draggable="false"
            className="h-full w-full object-cover" />
          <div style={{ position: 'absolute', inset: 0,
            background: 'linear-gradient(180deg, rgba(8,38,51,0.9) 0%, rgba(13,58,77,0.8) 45%, rgba(4,23,32,0.97) 100%)' }} />
        </div>
        <div className="relative mx-auto flex w-full max-w-4xl flex-col items-center px-6 text-center">
          <motion.h1 {...rise(0)} className="mb-6 text-white"
            style={{ fontFamily: titleFont, fontWeight: 700, fontSize: 'clamp(34px, 4.4vw, 56px)', lineHeight: 1.4 }}>
            برامجنا
          </motion.h1>
          <motion.span {...rise(0.05)} aria-hidden="true" className="mb-7 block h-[3px] w-16 rounded-full"
            style={{ background: `linear-gradient(90deg, transparent, ${ACCENT}, transparent)`, boxShadow: `0 0 14px ${ACCENT}66` }} />
          <motion.p {...rise(0.1)} className="max-w-3xl"
            style={{ color: '#dcebf2', fontWeight: 300, fontSize: '16px', lineHeight: 2.05, margin: 0 }}>
            {INTRO}
          </motion.p>
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-6 pt-16 md:px-10 md:pt-24">

        {/* ═══ البرامج الرئيسة ═══ */}
        <div className="mt-4">
          <SectionTitle>البرامج الرئيسة</SectionTitle>
          <div className="mb-28 mt-16 flex flex-col gap-16 md:flex-row md:items-stretch md:gap-7">
            {MAIN.map((p, i) => (
              <ProgramCard key={p.key} p={p} delay={0.08 + i * 0.09} onOpen={onOpenPage} />
            ))}
          </div>
        </div>

        {/* ═══ المبادرات النوعية ═══ */}
        <SectionTitle>المبادرات النوعية</SectionTitle>
        <Lead>{INITIATIVES_INTRO}</Lead>
        <div className="mb-24 grid gap-5 md:grid-cols-2">
          {INITIATIVES.map((n, i) => (
            <motion.div key={n.title} {...rise(0.06 * i)}
              whileHover={{ y: -5, transition: { duration: 0.25 } }}
              className="relative overflow-hidden"
              style={glass({ borderRadius: '26px', padding: '32px 30px' })}>
              <span aria-hidden="true" style={{ position: 'absolute', top: 0, insetInline: '18%', height: '2px',
                background: `linear-gradient(90deg, transparent, ${ACCENT}99, transparent)` }} />
              <div aria-hidden="true" className="pointer-events-none absolute"
                style={{ top: '-40%', left: '-15%', width: '55%', height: '100%', borderRadius: '50%',
                  background: 'radial-gradient(ellipse, rgba(239,145,34,0.12) 0%, transparent 65%)', filter: 'blur(46px)' }} />
              <div className="flex items-center gap-4">
                <div className="flex h-[58px] w-[58px] flex-shrink-0 items-center justify-center rounded-2xl"
                  style={{ background: 'rgba(239,145,34,0.1)', border: '0.5px solid rgba(239,145,34,0.3)' }}>
                  <img src={n.icon} alt="" aria-hidden="true" draggable="false" style={{ width: '36px', height: '36px' }} />
                </div>
                <h3 style={{ fontFamily: titleFont, color: 'white', fontWeight: 700, fontSize: '20px', lineHeight: 1.6, margin: 0 }}>{n.title}</h3>
              </div>
              <p style={{ color: '#dcebf2', fontWeight: 300, fontSize: '15px', lineHeight: 2, margin: '16px 0 0' }}>{n.body}</p>
            </motion.div>
          ))}
        </div>

        {/* ═══ ختام خفيف — لا فرصة تسجيل متاحة حالياً ═══ */}
        <div className="flex flex-col items-center">
          <motion.button {...rise(0)}
            onClick={() => onOpenPage('news')}
            whileHover={{ scale: 1.03 }}
            className="cursor-pointer border-none bg-transparent"
            style={{ color: '#a2becf', fontSize: '14.5px', fontWeight: 300 }}>
            لمتابعة جديد البرامج والفرص؟ <span style={{ color: '#f4a63f', fontWeight: 500, textDecoration: 'underline', textUnderlineOffset: '5px' }}>تابع مستجداتنا</span>
          </motion.button>
        </div>
      </div>
    </div>
  )
}
