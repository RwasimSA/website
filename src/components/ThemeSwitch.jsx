import { useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useThemeMode } from '../themeMode'

/* ─────────────────────────────────────────────────────────────
   مفتاح تبديل الوضع — مضمار صغير على طرفيه شمس وهلال، ومقبض
   برتقالي ينزلق إلى الطرف الذي يمثّل الوضع الحالي.
   الضغط يُطلق حدثاً تلتقطه شاشة الانتقال (ThemeToggle) المثبّتة
   على مستوى التطبيق، فتغطّي الشاشة ثم تبدّل الوضع خلفها.
   ───────────────────────────────────────────────────────────── */

const EASE = [0.22, 1, 0.36, 1]

export const SunMini = ({ c, s = 13 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
    <circle cx="12" cy="12" r="4.4" />
    <path d="M12 1.6v2.2M12 20.2v2.2M4.2 4.2l1.6 1.6M18.2 18.2l1.6 1.6M1.6 12h2.2M20.2 12h2.2M4.2 19.8l1.6-1.6M18.2 5.8l1.6-1.6" />
  </svg>
)
export const MoonMini = ({ c, s = 13 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
  </svg>
)

export default function ThemeSwitch({ className = '' }) {
  const theme = useThemeMode()
  const light = theme === 'light'
  const ref = useRef(null)
  const label = light ? 'التبديل إلى الوضع الداكن' : 'التبديل إلى الوضع الفاتح'

  const onClick = () => {
    const r = ref.current?.getBoundingClientRect()
    window.dispatchEvent(new CustomEvent('rwasim:theme-toggle', {
      detail: r ? { x: r.left + r.width / 2, y: r.top + r.height / 2 } : null,
    }))
  }

  return (
    <motion.button
      ref={ref}
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className={`theme-switch flex flex-shrink-0 cursor-pointer items-center ${className}`}
      style={{
        direction: 'ltr', width: '64px', height: '34px', borderRadius: '999px', padding: '4px',
        background: 'var(--pill)',
        border: '0.5px solid var(--line)',
        backdropFilter: 'var(--glass, blur(20px))', WebkitBackdropFilter: 'var(--glass, blur(20px))',
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.22, ease: EASE }}
    >
      {/* طرفا المضمار */}
      <span className="pointer-events-none absolute flex items-center justify-between"
        style={{ left: '9px', right: '9px', opacity: 0.55 }}>
        <SunMini c={light ? '#0E4156' : '#dcebf2'} />
        <MoonMini c={light ? '#0E4156' : '#dcebf2'} />
      </span>
      {/* المقبض */}
      <motion.span
        className="relative flex items-center justify-center"
        style={{ width: '26px', height: '26px', borderRadius: '50%',
          background: 'linear-gradient(135deg, #ef9122 0%, #c9760f 100%)',
          boxShadow: '0 4px 12px rgba(239,145,34,0.45), inset 0 1px 0 rgba(255,255,255,0.35)' }}
        animate={{ x: light ? 0 : 30 }}
        transition={{ type: 'spring', stiffness: 420, damping: 30 }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span key={theme} className="flex"
            initial={{ rotate: -80, opacity: 0, scale: 0.5 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 80, opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.26, ease: EASE }}>
            {light ? <SunMini c="#ffffff" /> : <MoonMini c="#ffffff" />}
          </motion.span>
        </AnimatePresence>
      </motion.span>
    </motion.button>
  )
}
