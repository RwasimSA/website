import { motion, AnimatePresence } from 'framer-motion'
import { useThemeMode, toggleTheme } from '../themeMode'

/* ─────────────────────────────────────────────────────────────
   زر تبديل الوضع (داكن/فاتح) — لسان عائم ملتصق بالحافة اليسرى
   للشاشة عند منتصفها تقريباً (اليمنى مشغولة بفهرس الأقسام على
   سطح المكتب). يبرز قليلاً من الحافة ويتمدد عند المرور بالفأرة
   ليكشف اسم الوضع الآخر، وأيقونته تدور وتتبدل بين شمس وهلال.
   ───────────────────────────────────────────────────────────── */

const Sun = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
  </svg>
)
const Moon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
  </svg>
)

export default function ThemeToggle() {
  const theme = useThemeMode()
  const light = theme === 'light'
  const label = light ? 'الوضع الداكن' : 'الوضع الفاتح'

  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      className="group fixed z-[60] flex cursor-pointer items-center gap-2 border-none"
      style={{
        left: 0, top: '62%',
        /* لسان ملتصق بالحافة: زواياه اليمنى فقط مستديرة */
        borderRadius: '0 999px 999px 0',
        padding: '10px 14px 10px 10px',
        background: 'var(--panel)',
        border: '0.5px solid var(--line)', borderLeft: 'none',
        boxShadow: '0 10px 30px var(--shadow)',
        backdropFilter: 'var(--glass, blur(18px))', WebkitBackdropFilter: 'var(--glass, blur(18px))',
        color: 'var(--ink)',
      }}
      initial={{ x: -6 }}
      whileHover={{ x: 0 }}
      whileTap={{ scale: 0.96 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* الأيقونة تدور وتتبدل مع الوضع */}
      <span className="relative flex h-8 w-8 items-center justify-center rounded-full"
        style={{ background: light ? 'rgba(13,58,77,0.08)' : 'rgba(239,145,34,0.16)',
          border: `0.5px solid ${light ? 'rgba(13,58,77,0.16)' : 'rgba(239,145,34,0.4)'}`,
          color: light ? '#0b2a38' : '#f4a63f' }}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.span key={theme} className="flex"
            initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}>
            {light ? <Moon /> : <Sun />}
          </motion.span>
        </AnimatePresence>
      </span>
      {/* اسم الوضع الآخر — يظهر بالتمدد عند المرور (سطح المكتب) */}
      <span className="hidden max-w-0 overflow-hidden whitespace-nowrap opacity-0 transition-all duration-300 group-hover:max-w-[120px] group-hover:opacity-100 md:block"
        style={{ fontSize: '12.5px', fontWeight: 500 }}>
        {label}
      </span>
    </motion.button>
  )
}
