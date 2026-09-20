import { motion, AnimatePresence } from 'framer-motion'

/* ─────────────────────────────────────────────────────────────
   فهرس أقسام الرئيسية — شريط جانبي ثابت (سطح المكتب فقط):
   نقطة لكل قسم، والنقطة النشطة تتمدد إلى حبة برتقالية يرافقها
   اسم القسم بحركة انزلاق، مع خيط ضوئي يتتبع الموضع الحالي.
   الضغط على أي نقطة ينقل إلى قسمها مباشرة.
   ───────────────────────────────────────────────────────────── */

const ACCENT = '#ef9122'

export default function SectionIndex({ items = [], current, onGo = () => {} }) {
  const idx = Math.max(items.findIndex((s) => s.key === current), 0)

  return (
    <nav aria-label="فهرس الأقسام"
      className="pointer-events-none fixed left-7 top-1/2 z-40 hidden -translate-y-1/2 lg:block">
      {/* الخيط الخلفي + الخيط المضيء المتحرك */}
      <div className="absolute right-[5.5px] top-0 h-full w-px"
        style={{ background: 'linear-gradient(180deg, transparent, rgba(255,255,255,0.14) 12%, rgba(255,255,255,0.14) 88%, transparent)' }} />

      <ul className="relative flex list-none flex-col gap-6 p-0" style={{ margin: 0 }}>
        {items.map((s, i) => {
          const active = i === idx
          const passed = i < idx
          return (
            <li key={s.key} className="pointer-events-auto relative flex items-center">
              <button type="button" onClick={() => onGo(s.key)} aria-label={s.label}
                aria-current={active ? 'true' : undefined}
                className="group flex cursor-pointer items-center gap-3 border-none bg-transparent p-0">
                {/* النقطة/الحبة */}
                <span className="relative flex h-3 w-3 items-center justify-center">
                  <motion.span
                    animate={{
                      width: active ? 11 : 7,
                      height: active ? 11 : 7,
                      backgroundColor: active ? ACCENT : passed ? 'rgba(239,145,34,0.45)' : 'rgba(255,255,255,0.28)',
                      boxShadow: active ? `0 0 14px ${ACCENT}` : '0 0 0 rgba(0,0,0,0)',
                    }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    style={{ borderRadius: '999px', display: 'block' }}
                  />
                  {/* هالة نابضة حول النقطة النشطة */}
                  {active && (
                    <motion.span aria-hidden="true" className="absolute"
                      initial={{ opacity: 0.55, scale: 0.7 }}
                      animate={{ opacity: 0, scale: 2.2 }}
                      transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
                      style={{ width: '11px', height: '11px', borderRadius: '999px', border: `1px solid ${ACCENT}` }} />
                  )}
                </span>

                {/* اسم القسم — يظهر للنشط دائماً، ولغيره عند المرور بالفأرة */}
                <AnimatePresence mode="wait" initial={false}>
                  {active ? (
                    <motion.span key={s.key}
                      initial={{ opacity: 0, x: 10, filter: 'blur(4px)' }}
                      animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, x: -10, filter: 'blur(4px)' }}
                      transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                      className="whitespace-nowrap"
                      style={{ color: '#ffffff', fontWeight: 500, fontSize: '13px', letterSpacing: '0.01em',
                        textShadow: '0 2px 10px rgba(3,15,21,0.8)' }}>
                      {s.label}
                    </motion.span>
                  ) : (
                    <span className="whitespace-nowrap opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      style={{ color: '#bcd9e6', fontWeight: 400, fontSize: '12.5px',
                        textShadow: '0 2px 10px rgba(3,15,21,0.8)' }}>
                      {s.label}
                    </span>
                  )}
                </AnimatePresence>
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
