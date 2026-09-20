import { motion } from 'framer-motion'

/* ─────────────────────────────────────────────────────────────
   فهرس أقسام الرئيسية — قائمة عناوين ثابتة على يمين الشاشة
   (سطح المكتب فقط): مواضع العناوين لا تتحرك أبداً، وإنما يتبدّل
   حجمها وشفافيتها حسب قربها من القسم الحالي — فالحالي أكبر وأوضح،
   وكلما بعُد العنوان عنه صغُر وخفت.
   ───────────────────────────────────────────────────────────── */

const ACCENT = '#ef9122'

const ROW = 40 // المسافة الثابتة بين عنوان وآخر

/* حجم العنوان وشفافيته حسب بُعده عن القسم الحالي */
const styleFor = (abs) => ({
  opacity: [1, 0.55, 0.32, 0.2][Math.min(abs, 3)] ?? 0.2,
  fontSize: `${[19.5, 14, 12, 11][Math.min(abs, 3)]}px`,
  fontWeight: abs === 0 ? 700 : 400,
  color: abs === 0 ? '#ffffff' : '#bcd9e6',
})

export default function SectionIndex({ items = [], current, onGo = () => {} }) {
  const idx = Math.max(items.findIndex((s) => s.key === current), 0)
  const mid = (items.length - 1) / 2

  return (
    <nav aria-label="فهرس الأقسام"
      className="pointer-events-none fixed right-9 top-1/2 z-40 hidden -translate-y-1/2 lg:block"
      style={{ width: '190px', height: `${items.length * ROW}px` }}>

      {/* مؤشر برتقالي ينزلق إلى سطر القسم الحالي */}
      <motion.span aria-hidden="true" className="absolute"
        style={{ right: '-14px', top: '50%', width: '2px', height: '22px', marginTop: '-11px',
          borderRadius: '2px', background: `linear-gradient(180deg, transparent, ${ACCENT}, transparent)`,
          boxShadow: `0 0 12px ${ACCENT}` }}
        animate={{ y: (idx - mid) * ROW }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} />

      {items.map((s, i) => (
        <motion.button
          key={s.key}
          type="button"
          onClick={() => onGo(s.key)}
          aria-current={i === idx ? 'true' : undefined}
          className="pointer-events-auto absolute right-0 block cursor-pointer whitespace-nowrap border-none bg-transparent p-0 text-right"
          style={{
            top: '50%',
            /* الموضع ثابت لكل عنوان: يُحسب مرة من ترتيبه ولا يتغير */
            marginTop: `${(i - mid) * ROW}px`,
            transform: 'translateY(-50%)',
            textShadow: '0 2px 12px rgba(3,15,21,0.9)',
            fontFamily: "'TheYearofHandicrafts', 'IBM Plex Sans Arabic', sans-serif",
          }}
          animate={styleFor(Math.abs(i - idx))}
          whileHover={i === idx ? undefined : { opacity: 0.85 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          {s.label}
        </motion.button>
      ))}
    </nav>
  )
}
