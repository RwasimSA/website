import { useEffect } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import site from '../../content/site.json'

/* ─────────────────────────────────────────────────────────────
   الدعوة الختامية — لوحة واحدة كبيرة:
   بطاقة مستطيلة سينمائية بصورة خفيفة من فعاليات الجمعية،
   خيط الهوية يعبرها، وكلمة «الأثر» بتدرّج متحرك،
   وداخلها دعوتا «كن شريكًا» و«تطوّع معنا».
   ───────────────────────────────────────────────────────────── */

const titleFont = "'TheYearofHandicrafts', 'IBM Plex Sans Arabic', sans-serif"

/* كلمة بتدرّج لوني متحرك (نفس أسلوب الهيرو) مع حاشية تمنع قصّ الهمزة */
const GradWord = ({ children }) => (
  <span style={{
    display: 'inline-block',
    padding: '0.35em 0.1em', margin: '-0.35em -0.1em',
    backgroundImage: 'linear-gradient(100deg, #ffb85c, #ef9122, #4db3d4, #35a3c8, #4db3d4, #ef9122, #ffb85c)',
    backgroundSize: '220% 100%',
    animation: 'gradShift 5s linear infinite',
    WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent',
  }}>{children}</span>
)

const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
})

export default function FinalCTA({ onOpenPage = () => {} }) {
  /* تتبّع الماوس — اللوحة تنجذب وتميل بلطف نحو المؤشر */
  const mx = useMotionValue(0) // -0.5 .. 0.5 من مركز الشاشة
  const my = useMotionValue(0)
  useEffect(() => {
    const onMove = (e) => {
      mx.set(e.clientX / window.innerWidth - 0.5)
      my.set(e.clientY / window.innerHeight - 0.5)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [mx, my])
  const spring = { stiffness: 55, damping: 18, mass: 0.7 }
  const tx = useSpring(useTransform(mx, [-0.5, 0.5], [-18, 18]), spring)
  const ty = useSpring(useTransform(my, [-0.5, 0.5], [-12, 12]), spring)
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [2.6, -2.6]), spring)
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-3.2, 3.2]), spring)

  return (
    <motion.section className="relative flex min-h-screen flex-col items-center justify-center px-6 md:px-16">
      {/* توهجات جانبية */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          style={{ position: 'absolute', top: '10%', left: '-10%', width: '55%', height: '85%', borderRadius: '50%',
            background: 'radial-gradient(ellipse, rgba(239,145,34,0.12) 0%, transparent 65%)', filter: 'var(--fx-blur, blur(100px))' }}
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          style={{ position: 'absolute', top: '15%', right: '-10%', width: '45%', height: '70%', borderRadius: '50%',
            background: 'radial-gradient(ellipse, rgba(26,127,161,0.2) 0%, transparent 65%)', filter: 'var(--fx-blur, blur(100px))' }}
          animate={{ x: [0, -25, 0], y: [0, 20, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* الشكل الملتوي الكبير — يلامس حافة الشاشة العلوية خلف اللوحة */}
      <img src="/images/hero-pattern.png" alt="" aria-hidden="true" draggable="false"
        className="pointer-events-none absolute left-0 top-0 w-full"
        style={{ opacity: 0.55, filter: 'blur(6px)' }} />

      {/* ══ اللوحة الواحدة ══ */}
      <motion.div
        className="relative w-full max-w-5xl"
        initial={{ y: 44 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        style={{ zIndex: 1 }}
      >
        <motion.div style={{ x: tx, y: ty, rotateX: rx, rotateY: ry, transformPerspective: 1200 }}>
        {/* هالة خلف اللوحة */}
        <motion.div aria-hidden="true" className="pointer-events-none absolute"
          style={{ inset: '-9%', borderRadius: '60px', filter: 'blur(70px)',
            background: 'radial-gradient(ellipse at 82% 100%, rgba(239,145,34,0.30) 0%, transparent 55%), radial-gradient(ellipse at 12% 0%, rgba(47,167,204,0.25) 0%, transparent 55%)' }}
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div className="relative overflow-hidden"
          style={{
            borderRadius: '52px',
            border: '1px solid rgba(255,255,255,0.22)',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.30), 0 34px 70px rgba(3,15,21,0.45)',
            background: 'linear-gradient(160deg, rgba(13,58,77,0.62) 0%, rgba(8,38,51,0.68) 100%)',
            backdropFilter: 'var(--glass, blur(22px) saturate(150%))', WebkitBackdropFilter: 'var(--glass, blur(22px) saturate(150%))',
          }}
        >
          {/* صورة خفيفة من فعاليات الجمعية */}
          {site.backCta && <img src={site.backCta} alt="" aria-hidden="true" draggable="false"
            className="pointer-events-none absolute inset-0 h-full w-full object-cover"
            style={{ opacity: 0.16 }} />}
          {/* تظليل الهوية فوق الصورة — شفاف ليُظهر الشكل خلف اللوحة */}
          <div aria-hidden="true" style={{ position: 'absolute', inset: 0,
            background: 'linear-gradient(115deg, rgba(8,38,51,0.5) 0%, rgba(13,58,77,0.32) 45%, rgba(8,38,51,0.26) 70%, rgba(201,118,15,0.2) 100%)' }} />

          {/* جسيمات ضوئية تتنفس */}
          <motion.span aria-hidden="true" className="pointer-events-none absolute"
            style={{ top: '18%', left: '12%', width: '10px', height: '10px', borderRadius: '50%', background: 'rgba(77,179,212,0.8)', filter: 'blur(1px)' }}
            animate={{ y: [0, -14, 0], opacity: [0.4, 1, 0.4] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }} />
          <motion.span aria-hidden="true" className="pointer-events-none absolute"
            style={{ top: '30%', left: '30%', width: '6px', height: '6px', borderRadius: '50%', background: 'rgba(255,184,92,0.9)', filter: 'blur(1px)' }}
            animate={{ y: [0, -10, 0], opacity: [0.3, 0.9, 0.3] }} transition={{ duration: 7.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }} />
          <motion.span aria-hidden="true" className="pointer-events-none absolute"
            style={{ bottom: '24%', right: '16%', width: '8px', height: '8px', borderRadius: '50%', background: 'rgba(239,145,34,0.75)', filter: 'blur(1px)' }}
            animate={{ y: [0, -12, 0], opacity: [0.35, 1, 0.35] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }} />

          {/* المحتوى */}
          <div className="relative flex flex-col items-center px-7 py-16 text-center md:px-16 md:py-20">
            <motion.span {...rise(0.25)}
              style={{ color: '#f4a63f', fontSize: '13.5px', fontWeight: 500, letterSpacing: '0.22em', marginBottom: '16px' }}>
              رحلة جيلٍ كامل تبدأ بخطوتك
            </motion.span>

            <motion.h2 {...rise(0.35)}
              className="mb-5 text-white"
              style={{ fontFamily: titleFont, fontWeight: 700, fontSize: 'clamp(34px, 4.6vw, 62px)', lineHeight: 1.35 }}>
              كن جزءًا من <GradWord>الأثر</GradWord>
            </motion.h2>

            <motion.p {...rise(0.45)}
              className="mb-11 max-w-xl"
              style={{ color: '#dcebf2', fontWeight: 300, fontSize: '15.5px', lineHeight: 2 }}>
              للجهات شراكاتٌ نوعية تدعم البرامج وتوسّع دائرة الأثر،
              وللأفراد تطوّعٌ يصنع فرقاً حقيقياً.
            </motion.p>

            {/* الدعوتان */}
            <motion.div
              className="flex flex-col items-center gap-4 md:flex-row md:gap-5"
              initial={{ y: 26 }} animate={{ y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.55 }}
            >
              {/* كن شريكًا — رئيسي */}
              <motion.button
                onClick={() => onOpenPage('partners')}
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
                className="flex items-center gap-4"
                style={{
                  borderRadius: '999px', padding: '9px 30px 9px 9px', cursor: 'pointer',
                  background: 'linear-gradient(135deg, #ef9122 0%, #c9760f 100%)',
                  border: '1px solid rgba(255,200,120,0.5)',
                  boxShadow: '0 10px 30px rgba(239,145,34,0.4), inset 0 1px 0 rgba(255,255,255,0.35)',
                }}
              >
                <span className="flex flex-col items-start" style={{ lineHeight: 1.35 }}>
                  <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: '10.5px', fontWeight: 400, letterSpacing: '0.1em' }}>للجهات</span>
                  <span style={{ color: 'white', fontWeight: 700, fontSize: '17px' }}>كن شريكًا</span>
                </span>
                <span style={{ width: '46px', height: '46px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'rgba(255,255,255,0.18)', border: '1px solid rgba(255,255,255,0.35)' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 5 12 12 19" />
                  </svg>
                </span>
              </motion.button>

              {/* تطوّع معنا — زجاجي */}
              <motion.button
                onClick={() => onOpenPage('volunteer')}
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
                className="flex items-center gap-4"
                style={{
                  borderRadius: '999px', padding: '9px 30px 9px 9px', cursor: 'pointer',
                  background: 'linear-gradient(150deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.06) 100%)',
                  backdropFilter: 'var(--glass, blur(18px))', WebkitBackdropFilter: 'var(--glass, blur(18px))',
                  border: '1px solid rgba(77,179,212,0.55)',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.25)',
                }}
              >
                <span className="flex flex-col items-start" style={{ lineHeight: 1.35 }}>
                  <span style={{ color: '#8fd0e8', fontSize: '10.5px', fontWeight: 400, letterSpacing: '0.1em' }}>للأفراد</span>
                  <span style={{ color: 'white', fontWeight: 700, fontSize: '17px' }}>تطوّع معنا</span>
                </span>
                <span style={{ width: '46px', height: '46px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'linear-gradient(135deg, #4db3d4 0%, #2fa7cc 100%)', boxShadow: '0 0 16px rgba(77,179,212,0.5)' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 5 12 12 19" />
                  </svg>
                </span>
              </motion.button>
            </motion.div>

            {/* رابط أخف */}
            <motion.button
              onClick={() => onOpenPage('inquiries')}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.85 }}
              whileHover={{ scale: 1.03 }}
              className="mt-9 cursor-pointer border-none bg-transparent"
              style={{ color: '#a2becf', fontSize: '14px', fontWeight: 300 }}
            >
              لديك استفسار؟ <span style={{ color: '#f4a63f', fontWeight: 500, textDecoration: 'underline', textUnderlineOffset: '5px' }}>تواصل معنا</span>
            </motion.button>
          </div>
        </div>
        </motion.div>
      </motion.div>
    </motion.section>
  )
}
