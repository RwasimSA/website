import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useThemeMode, setTheme, getTheme } from '../themeMode'

/* ─────────────────────────────────────────────────────────────
   تبديل الوضع (داكن/فاتح)

   ١) الزر: مفتاح حقيقي — مضمار صغير بطرفيه شمس وهلال، ومقبض
      برتقالي ينزلق بينهما، فيُقرأ فوراً أنه «مفتاح» لا مجرّد أيقونة.
   ٢) الانتقال: عند الضغط تنتشر دائرة بلون الوضع الجديد من مكان الزر
      حتى تغطي الشاشة، وفي وسطها جرم سماوي يتحوّل: الهلال ينفتح شمساً
      بأشعة تنبثق، أو الشمس تنطوي أشعتها ويقضم الظلّ قرصها هلالاً
      وتتلألأ حوله النجوم — مع تحية عربية قصيرة.
   ───────────────────────────────────────────────────────────── */

const EASE = [0.22, 1, 0.36, 1]

/* ألوان الشاشة الانتقالية — من لوحة الهوية */
const PAGE = { light: '#EDF0F3', dark: '#0E4156' }
const DISC = { light: '#EF9122', dark: '#EDF0F3' }   // شمس برتقالية / قمر عاجي
const TEXT = { light: '#0E4156', dark: '#EDF0F3' }

/* ═══ الجرم السماوي المتحوّل ═══
   القرص واحد، والهلال يُصنع بظلّ دائري يتسلل فوقه (قناع) —
   فالانتقال بين الشمس والقمر حركة واحدة متصلة لا شكلان منفصلان. */
const RAYS = Array.from({ length: 8 }, (_, i) => i * 45)
const SPARKS = [
  { x: 106, y: 34, s: 1 }, { x: 30, y: 46, s: 0.7 },
  { x: 96, y: 108, s: 0.85 }, { x: 24, y: 96, s: 0.55 },
]

function Celestial({ toLight }) {
  const disc = toLight ? DISC.light : DISC.dark
  /* الظلّ القاضم: بعيد في حالة الشمس، ومنطبق على القرص في حالة القمر */
  const shadowFrom = toLight ? { cx: 92, cy: 48 } : { cx: 170, cy: -40 }
  const shadowTo = toLight ? { cx: 170, cy: -40 } : { cx: 92, cy: 48 }
  const raysFrom = toLight ? { scale: 0.45, opacity: 0, rotate: -40 } : { scale: 1, opacity: 1, rotate: 0 }
  const raysTo = toLight ? { scale: 1, opacity: 1, rotate: 0 } : { scale: 0.45, opacity: 0, rotate: 40 }

  return (
    <motion.svg width="150" height="150" viewBox="0 0 140 140" fill="none"
      initial={{ rotate: toLight ? -30 : 30, scale: 0.72, opacity: 0 }}
      animate={{ rotate: 0, scale: 1, opacity: 1 }}
      transition={{ duration: 0.9, ease: EASE, delay: 0.16 }}
      style={{ overflow: 'visible' }}
    >
      <defs>
        {/* القناع: القرص أبيض (ظاهر) ودائرة الظلّ سوداء (تُقتطع) */}
        <mask id="celestial-mask">
          <circle cx="70" cy="70" r="60" fill="#fff" />
          <motion.circle r="42" fill="#000"
            initial={shadowFrom} animate={shadowTo}
            transition={{ duration: 0.85, ease: EASE, delay: 0.3 }} />
        </mask>
      </defs>

      {/* الأشعة — تنبثق للشمس وتنطوي للقمر */}
      <motion.g
        initial={raysFrom} animate={raysTo}
        transition={{ duration: 0.8, ease: EASE, delay: 0.26 }}
        style={{ transformOrigin: '70px 70px' }}
      >
        {RAYS.map((a) => (
          <rect key={a} x="68.4" y="12" width="3.2" height="13" rx="1.6" fill={disc}
            transform={`rotate(${a} 70 70)`} />
        ))}
      </motion.g>

      {/* القرص */}
      <circle cx="70" cy="70" r="34" fill={disc} mask="url(#celestial-mask)" />

      {/* نجوم تتلألأ — للوضع الداكن فقط */}
      {!toLight && SPARKS.map((s, i) => (
        <motion.path key={i}
          d="M0 -7 C0.6 -2.4 2.4 -0.6 7 0 C2.4 0.6 0.6 2.4 0 7 C-0.6 2.4 -2.4 0.6 -7 0 C-2.4 -0.6 -0.6 -2.4 0 -7 Z"
          fill={DISC.dark}
          style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
          initial={{ opacity: 0, scale: 0, x: s.x, y: s.y }}
          animate={{ opacity: [0, 1, 0.75], scale: [0, s.s * 1.25, s.s], x: s.x, y: s.y }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.55 + i * 0.09 }}
        />
      ))}
    </motion.svg>
  )
}

/* ═══ شاشة الانتقال ═══ */
function ThemeBurst({ toLight, origin }) {
  const bg = toLight ? PAGE.light : PAGE.dark
  const ink = toLight ? TEXT.light : TEXT.dark
  const phrase = toLight ? 'صباح النور' : 'تصبح على خير'
  /* الشاشات المتوسطة تطبّق zoom على body (معايرة الحجم في index.css)، فكل
     المقاسات داخلها بفضاء إحداثيات أكبر من فضاء النافذة — نحسب فيه */
  const W = window.innerWidth / origin.zoom
  const H = window.innerHeight / origin.zoom
  /* نصف قطر يكفي لتغطية أبعد زاوية عن نقطة الانطلاق */
  const R = Math.hypot(Math.max(origin.x, W - origin.x), Math.max(origin.y, H - origin.y)) + 40

  return (
    <motion.div
      className="fixed inset-0"
      style={{ zIndex: 200 }}
      initial={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
    >
      {/* الدائرة المنتشرة بلون الوضع الجديد */}
      <motion.div
        style={{ position: 'absolute', left: origin.x - R, top: origin.y - R,
          width: R * 2, height: R * 2, borderRadius: '50%', background: bg }}
        initial={{ scale: 0 }} animate={{ scale: 1 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      />
      {/* الجرم والتحية */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-5">
        <Celestial toLight={toLight} />
        <motion.span
          style={{ fontFamily: "'TheYearofHandicrafts', 'IBM Plex Sans Arabic', sans-serif",
            fontWeight: 700, fontSize: '24px', color: ink }}
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: EASE, delay: 0.5 }}
        >
          {phrase}
        </motion.span>
      </div>
    </motion.div>
  )
}

/* ═══ الزر ═══ */
const SunMini = ({ c }) => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
    <circle cx="12" cy="12" r="4.4" />
    <path d="M12 1.6v2.2M12 20.2v2.2M4.2 4.2l1.6 1.6M18.2 18.2l1.6 1.6M1.6 12h2.2M20.2 12h2.2M4.2 19.8l1.6-1.6M18.2 5.8l1.6-1.6" />
  </svg>
)
const MoonMini = ({ c }) => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
  </svg>
)

export default function ThemeToggle() {
  const theme = useThemeMode()
  const light = theme === 'light'
  const [burst, setBurst] = useState(null)
  const btnRef = useRef(null)
  const busy = useRef(false)

  const label = light ? 'التبديل إلى الوضع الداكن' : 'التبديل إلى الوضع الفاتح'

  const onToggle = useCallback(() => {
    if (busy.current) return
    const next = getTheme() === 'light' ? 'dark' : 'light'
    /* من يفضّل تقليل الحركة: تبديل فوري بلا شاشة انتقال */
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) { setTheme(next); return }
    const zoom = parseFloat(getComputedStyle(document.body).zoom) || 1
    const r = btnRef.current?.getBoundingClientRect()
    const origin = r
      ? { x: (r.left + r.width / 2) / zoom, y: (r.top + r.height / 2) / zoom, zoom }
      : { x: window.innerWidth / zoom / 2, y: window.innerHeight / zoom / 2, zoom }
    busy.current = true
    setBurst({ toLight: next === 'light', origin })
    /* الوضع يتبدّل خلف الشاشة وهي تغطّي كامل المساحة */
    setTimeout(() => setTheme(next), 430)
    setTimeout(() => { setBurst(null); busy.current = false }, 1500)
  }, [])

  return (
    <>
      <motion.button
        ref={btnRef}
        type="button"
        onClick={onToggle}
        aria-label={label}
        title={label}
        className="theme-switch group fixed cursor-pointer"
        style={{
          zIndex: 60, direction: 'ltr',
          width: '64px', height: '34px', borderRadius: '999px', padding: '4px',
          display: 'flex', alignItems: 'center',
          background: 'var(--panel)', border: '0.5px solid var(--line)',
          boxShadow: '0 10px 30px var(--shadow)',
          backdropFilter: 'var(--glass, blur(18px))', WebkitBackdropFilter: 'var(--glass, blur(18px))',
        }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.22, ease: EASE }}
      >
        {/* طرفا المضمار: شمس ثم هلال */}
        <span className="pointer-events-none absolute flex items-center justify-between"
          style={{ left: '9px', right: '9px', opacity: 0.55 }}>
          <SunMini c={light ? '#0E4156' : '#dcebf2'} />
          <MoonMini c={light ? '#0E4156' : '#dcebf2'} />
        </span>
        {/* المقبض — ينزلق إلى الطرف الذي يمثّل الوضع الحالي */}
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

      <AnimatePresence>
        {burst && <ThemeBurst key="burst" toLight={burst.toLight} origin={burst.origin} />}
      </AnimatePresence>
    </>
  )
}
