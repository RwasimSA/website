import { motion } from 'framer-motion'

/* ─────────────────────────────────────────────────────────────
   فهرس أقسام الرئيسية — قائمة عناوين ثابتة على يمين الشاشة
   (سطح المكتب فقط). مواضع العناوين لا تتحرك أبداً؛ وإنما يتبدّل
   حجمها وشفافيتها ووضوحها حسب قربها من القسم الحالي:
   الحالي أكبر وأوضح بتوهج خفيف، والأبعد أصغر وأخفت وأكثر ضبابية
   (عمق ميداني)، مع عمود تقدّم تنزلق عليه عقدة مضيئة.
   ───────────────────────────────────────────────────────────── */

const ACCENT = '#ef9122'
const ROW = 40 // المسافة الثابتة بين عنوان وآخر

/* هيئة العنوان حسب بُعده عن القسم الحالي */
const styleFor = (abs) => ({
  opacity: [1, 0.6, 0.34, 0.2][Math.min(abs, 3)],
  fontSize: `${[19.5, 14, 12, 11][Math.min(abs, 3)]}px`,
  fontWeight: abs === 0 ? 700 : 400,
  color: abs === 0 ? '#ffffff' : '#bcd9e6',
  letterSpacing: abs === 0 ? '0.02em' : '0em',
  /* عمق ميداني: ما بعُد عن القسم الحالي يخفت ويميل للضبابية */
  filter: abs === 0 ? 'blur(0px)' : `blur(${Math.min(abs, 3) * 0.45}px)`,
})

const numStyle = (abs) => ({
  opacity: [0.9, 0.4, 0.22, 0.12][Math.min(abs, 3)],
  color: abs === 0 ? ACCENT : '#7fa3b5',
  fontSize: abs === 0 ? '10.5px' : '9.5px',
})

export default function SectionIndex({ items = [], current, onGo = () => {} }) {
  const idx = Math.max(items.findIndex((s) => s.key === current), 0)
  const mid = (items.length - 1) / 2
  const height = items.length * ROW
  /* نسبة التقدّم عبر الأقسام — يملأ بها عمود الفهرس */
  const progress = items.length > 1 ? idx / (items.length - 1) : 0

  return (
    <nav aria-label="فهرس الأقسام"
      className="pointer-events-none fixed right-10 top-1/2 z-40 hidden -translate-y-1/2 lg:block"
      style={{ width: '200px', height: `${height}px` }}>

      {/* عمود التقدّم: خيط خافت يمتلئ برتقالياً حتى القسم الحالي */}
      <div aria-hidden="true" className="absolute" style={{ right: '-20px', top: 0, bottom: 0, width: '1px' }}>
        <div style={{ position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, transparent, rgba(255,255,255,0.16) 10%, rgba(255,255,255,0.16) 90%, transparent)' }} />
        <motion.div
          style={{ position: 'absolute', top: 0, right: 0, width: '1px',
            background: `linear-gradient(180deg, transparent, ${ACCENT})`, transformOrigin: 'top' }}
          animate={{ height: `${Math.max(progress, 0.04) * 100}%` }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        />
        {/* العقدة المضيئة عند موضع القسم الحالي */}
        <motion.span
          className="absolute"
          style={{ right: '-2.5px', top: '50%', width: '6px', height: '6px', marginTop: '-3px',
            borderRadius: '999px', background: ACCENT, boxShadow: `0 0 12px ${ACCENT}, 0 0 4px ${ACCENT}` }}
          animate={{ y: (idx - mid) * ROW }}
          transition={{ type: 'spring', stiffness: 220, damping: 26 }}
        />
      </div>

      {/* توهج ناعم خلف سطر القسم الحالي */}
      <motion.div aria-hidden="true" className="absolute"
        style={{ right: '-30px', top: '50%', width: '230px', height: '34px', marginTop: '-17px',
          borderRadius: '999px',
          background: 'radial-gradient(ellipse at 88% 50%, rgba(239,145,34,0.18) 0%, transparent 70%)' }}
        animate={{ y: (idx - mid) * ROW }}
        transition={{ type: 'spring', stiffness: 220, damping: 26 }}
      />

      {items.map((s, i) => {
        const abs = Math.abs(i - idx)
        const active = i === idx
        return (
          <div key={s.key} className="absolute right-0 flex items-center justify-end gap-3"
            style={{ top: '50%', marginTop: `${(i - mid) * ROW}px`, transform: 'translateY(-50%)' }}>
            {/* العنوان */}
            <motion.button
              type="button"
              onClick={() => onGo(s.key)}
              aria-current={active ? 'true' : undefined}
              className="pointer-events-auto block cursor-pointer whitespace-nowrap border-none bg-transparent p-0 text-right"
              style={{ textShadow: active ? `0 2px 18px rgba(239,145,34,0.35), 0 2px 12px rgba(3,15,21,0.9)` : '0 2px 12px rgba(3,15,21,0.9)',
                fontFamily: "'TheYearofHandicrafts', 'IBM Plex Sans Arabic', sans-serif" }}
              animate={styleFor(abs)}
              whileHover={active ? undefined : { opacity: 0.9, filter: 'blur(0px)' }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              {s.label}
            </motion.button>

            {/* رقم القسم — لاتيني خافت، يتوهّج برتقالياً عند النشط */}
            <motion.span aria-hidden="true"
              className="block w-[18px] text-center tabular-nums"
              style={{ direction: 'ltr', fontWeight: 500, letterSpacing: '0.04em' }}
              animate={numStyle(abs)}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              {String(i + 1).padStart(2, '0')}
            </motion.span>
          </div>
        )
      })}
    </nav>
  )
}
