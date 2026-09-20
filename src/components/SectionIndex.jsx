import { motion } from 'framer-motion'

/* ─────────────────────────────────────────────────────────────
   فهرس أقسام الرئيسية — بَكَرة عناوين مقوّسة على يمين الشاشة
   (سطح المكتب فقط): العنوان الحالي أكبر وأوضح ويقترب من الحافة،
   وما قبله وما بعده يتدرّجان حجماً وشفافية وينحنيان للداخل على
   قوس دائري، فتبدو العناوين وكأنها تدور حول محور عند التنقل.
   ───────────────────────────────────────────────────────────── */

const ACCENT = '#ef9122'

/* هندسة القوس: نصف القطر وزاوية الخطوة بين عنوان وآخر */
const R = 230
const STEP = 16 * (Math.PI / 180)
const VISIBLE = 3 // كم عنواناً يظهر فوق الحالي وتحته

/* خصائص كل عنوان حسب بُعده عن العنوان الحالي */
const placement = (offset) => {
  const a = offset * STEP
  const abs = Math.abs(offset)
  return {
    y: R * Math.sin(a),
    x: -R * (1 - Math.cos(a)), // كلما ابتعد العنوان انحنى للداخل
    rotate: offset * 5,
    opacity: abs > VISIBLE ? 0 : [1, 0.5, 0.28, 0.14][abs],
    fontSize: `${[19.5, 14, 12, 11][Math.min(abs, 3)]}px`,
    fontWeight: abs === 0 ? 700 : 400,
    color: abs === 0 ? '#ffffff' : '#bcd9e6',
  }
}

export default function SectionIndex({ items = [], current, onGo = () => {} }) {
  const idx = Math.max(items.findIndex((s) => s.key === current), 0)

  return (
    <nav aria-label="فهرس الأقسام"
      className="pointer-events-none fixed right-9 top-1/2 z-40 hidden -translate-y-1/2 lg:block"
      style={{ width: '190px', height: '360px' }}>

      {/* مؤشر برتقالي عند موضع العنوان الحالي */}
      <motion.span aria-hidden="true" className="absolute"
        style={{ right: '-14px', top: '50%', width: '2px', height: '26px', marginTop: '-13px',
          borderRadius: '2px', background: `linear-gradient(180deg, transparent, ${ACCENT}, transparent)`,
          boxShadow: `0 0 12px ${ACCENT}` }}
        animate={{ opacity: [0.55, 1, 0.55] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }} />

      {items.map((s, i) => {
        const offset = i - idx
        const p = placement(offset)
        const hidden = Math.abs(offset) > VISIBLE
        return (
          <motion.button
            key={s.key}
            type="button"
            onClick={() => onGo(s.key)}
            aria-current={offset === 0 ? 'true' : undefined}
            tabIndex={hidden ? -1 : 0}
            className={`absolute right-0 top-1/2 block whitespace-nowrap border-none bg-transparent p-0 text-right ${hidden ? '' : 'pointer-events-auto cursor-pointer'}`}
            style={{ transformOrigin: '100% 50%', textShadow: '0 2px 12px rgba(3,15,21,0.9)',
              fontFamily: "'TheYearofHandicrafts', 'IBM Plex Sans Arabic', sans-serif" }}
            animate={{
              x: p.x, y: p.y - 11, rotate: p.rotate,
              opacity: p.opacity, fontSize: p.fontSize,
              fontWeight: p.fontWeight, color: p.color,
            }}
            whileHover={offset === 0 ? undefined : { opacity: Math.min(p.opacity + 0.35, 1) }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            {s.label}
          </motion.button>
        )
      })}
    </nav>
  )
}
