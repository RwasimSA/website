import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionCta from '../components/SectionCta'
import programsContent from '../../content/programs.json'

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
})

/* برامج رواسم الثلاثة — البطاقات الكبسولية الزجاجية مع النودلز الملونة.
   الشعار والعنوان والنص والرسمة العلوية تُحرَّر من لوحة ديوان (programs.cards)
   بترتيب البطاقات نفسه؛ الحقل الفارغ يُبقي القيمة المدمجة أدناه. */
const baseCards = [
  {
    key: 'ashbal',
    name: 'أشبال رواسم',
    logo: '',
    pattern: '',
    img: '',
    accent: 'rgba(127,184,212,0.22)',
    tagline: 'مشاريع تربوية خلال العام',
    desc: 'لطلاب المرحلة الابتدائية',
  },
  {
    key: 'barie',
    name: 'بارع',
    logo: '',
    pattern: '',
    img: '',
    accent: 'rgba(239,145,34,0.22)',
    tagline: 'برنامج تربوي ممتد',
    desc: 'لطلاب المرحلتين المتوسطة والثانوية',
  },
  {
    key: 'saif',
    name: 'صيف رواسم',
    logo: '',
    pattern: '',
    img: '',
    accent: 'rgba(93,184,164,0.22)',
    tagline: 'موسم صيفي سنوي',
    desc: 'أندية وبرامج لفئات متعددة',
  },
]

const programs = baseCards.map((p, i) => {
  const live = (programsContent.cards || [])[i] || {}
  const merged = { ...p }
  for (const k of Object.keys(live)) if (live[k]) merged[k] = live[k]
  return merged
})

const ProgramCard = ({ program, delay, onHover = () => {}, onOpen = () => {} }) => (
  <motion.div
    // انزلاق بلا شفافية: أي opacity متحركة على البطاقة تؤجّل رسم البلور الزجاجي في كروم
    initial={{ y: 34 }}
    animate={{ y: 0 }}
    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
    whileHover={{ y: -6, transition: { duration: 0.25, ease: 'easeOut' } }}
    onHoverStart={() => onHover(program.key)}
    onHoverEnd={() => onHover(null)}
    // رابط مخصص من اللوحة يفتح في تبويب جديد؛ وإلا تُفتح صفحة البرنامج الداخلية
    onClick={() => (program.link ? window.open(program.link, '_blank', 'noopener') : onOpen(program.key))}
    className="relative w-full max-w-[290px] flex-1"
    style={{ minWidth: 0, cursor: 'pointer', willChange: 'transform' }}
  >
    {/* البطاقة الزجاجية */}
    <div className="relative flex h-full flex-col items-center text-center"
      style={{
        borderRadius: '100px',
        padding: '104px 24px 46px',
        minHeight: '400px',
        background: 'linear-gradient(155deg, var(--glass-a) 0%, var(--glass-b) 45%, rgba(255,255,255,0.015) 70%, var(--glass-b) 100%)',
        border: '1px solid var(--line)',
        boxShadow: 'inset 0 1px 0 var(--line-strong), inset 0 -1px 0 var(--glass-a), 0 24px 48px var(--shadow)',
        backdropFilter: 'var(--glass, blur(26px) saturate(160%))', WebkitBackdropFilter: 'var(--glass, blur(26px) saturate(160%))',
      }}
    >
      {/* شعار البرنامج — وإن لم يُرفع بعد يظهر الاسم نصاً */}
      {program.logo ? (
        <img src={program.logo} alt={program.name} draggable="false"
          className="relative mb-8 h-[82px] w-auto object-contain"
          style={{ filter: 'drop-shadow(0 4px 10px var(--shadow))', zIndex: 1 }} />
      ) : (
        <span className="relative mb-8 flex h-[82px] items-center"
          style={{ fontFamily: "'TheYearofHandicrafts', 'IBM Plex Sans Arabic', sans-serif", color: 'var(--ink)', fontWeight: 700, fontSize: '30px', zIndex: 1,
            filter: 'drop-shadow(0 4px 10px var(--shadow))' }}>{program.name}</span>
      )}

      {/* السطر التعريفي */}
      <h3 style={{ position: 'relative', zIndex: 1, color: 'var(--ink)', fontWeight: 600, fontSize: '18px', lineHeight: 1.8, margin: '0 0 10px' }}>
        {program.tagline}
      </h3>

      {/* الوصف */}
      <p style={{ position: 'relative', zIndex: 1, color: 'var(--ink-2)', fontWeight: 300, fontSize: '15px', lineHeight: 2, margin: 0 }}>
        {program.desc}
      </p>
    </div>

    {/* النودل الملوّن — يتدلّى فوق الحافة العلوية وظله مدموج في الصورة */}
    {program.pattern && <motion.img
      src={program.pattern} alt="" aria-hidden="true" draggable="false"
      className="pointer-events-none absolute"
      style={{ top: '-52px', left: '-13%', width: '94%', maxWidth: 'none', zIndex: 2 }}
      animate={{ y: [0, -6, 0], rotate: [0, 1, 0] }}
      transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
    />}
  </motion.div>
)

export default function Programs({ onOpenPage = () => {} }) {
  /* صورة البرنامج الذي يمر عليه المؤشر تنكشف في خلفية القسم */
  const [hovered, setHovered] = useState(null)
  const hoveredProgram = programs.find((p) => p.key === hovered)

  return (
    <motion.section
      className="relative flex min-h-screen flex-col items-center justify-center px-6 py-24 md:px-16"
    >
      {/* صورة من فعاليات البرامج — حضور قوي مع تظليل بلون الهوية،
          وتنكشف صورة البرنامج الذي يمر عليه المؤشر */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {programsContent.pageBack && <img src={programsContent.pageBack} alt="" aria-hidden="true" draggable="false"
          className="absolute inset-0 h-full w-full object-cover" />}
        <AnimatePresence>
          {hoveredProgram?.img && (
              <motion.img
                key={hoveredProgram.key}
                src={hoveredProgram.img} alt="" aria-hidden="true" draggable="false"
                className="absolute inset-0 h-full w-full object-cover"
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.55, ease: 'easeOut' }}
              />
            )}
        </AnimatePresence>
        <div style={{ position: 'absolute', inset: 0,
          background: 'var(--img-overlay)' }} />
      </div>

      {/* توهجات جانبية — تدرّجات ناعمة بلا blur (أخفّ بكثير أثناء التمرير) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          style={{ position: 'absolute', top: '5%', left: '-10%', width: '55%', height: '90%', borderRadius: '50%',
            background: 'radial-gradient(ellipse, rgba(26,127,161,0.22) 0%, transparent 62%)' }}
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          style={{ position: 'absolute', top: '15%', right: '-10%', width: '45%', height: '70%', borderRadius: '50%',
            background: 'radial-gradient(ellipse, rgba(18,113,154,0.15) 0%, transparent 62%)' }}
          animate={{ x: [0, -25, 0], y: [0, 20, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* المحتوى الرئيسي */}
      <div className="relative flex w-full flex-col items-center">
        <motion.h2 className="mb-4 text-white" style={{ fontFamily: "'TheYearofHandicrafts', 'IBM Plex Sans Arabic', sans-serif", fontWeight: 700, fontSize: 'clamp(30px, 3.4vw, 44px)', lineHeight: 1.3 }} {...fade(0.07)}>
          برامج تربوية متنوعة
        </motion.h2>
        <motion.p className="mb-16 max-w-2xl text-center text-[15px] leading-loose md:mb-24" style={{ color: 'var(--ink-2)', fontWeight: 300 }} {...fade(0.14)}>
          نبني من خلالها تجارب تجمع بين القيم والمهارات، وتراعي احتياجات المستفيدين ومراحلهم العمرية.
        </motion.p>

        {/* البطاقات الثلاث — متراصة أفقياً */}
        <div className="flex w-full max-w-6xl flex-col items-center gap-24 md:flex-row md:items-stretch md:justify-center md:gap-14">
          {programs.map((p, i) => (
            <ProgramCard key={p.key} program={p} delay={0.2 + i * 0.12} onHover={setHovered} onOpen={onOpenPage} />
          ))}
        </div>

        {/* زر صفحة برامجنا */}
        <SectionCta label="استكشف كل برامجنا" onClick={() => onOpenPage('programs')} className="mt-14 md:mt-16" delay={0.55} />
      </div>
    </motion.section>
  )
}
