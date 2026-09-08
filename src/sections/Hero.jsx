import { motion } from 'framer-motion'
import site from '../../content/site.json'

const ease = [0.22, 1, 0.36, 1]

/* أوردسوم نودلز رواسم — خربشات من ملف الهوية (rwasim vectors.svg)
   تطفو بصورة ضبابية وخفيفة خلف باترن الهيرو */
const doodleShapes = {
  spiralOrange: {
    viewBox: '183 32 64 64',
    paths: [{ fill: '#f09223', d: 'M239.03,76.2c5.69-15.35-2.62-33.68-19.24-37.29-12.51-2.72-26.64,4.72-28.65,18-1.68,11.12,4.78,23.86,14.11,29.85,6.37,4.1,14.92,5.77,22.05,2.75,5.9-2.5,9.38-7.59,11.73-13.31,1.37-3.34-4.06-4.8-5.42-1.49-5.03,12.24-19.04,13.52-28.35,4.98-5.37-4.92-9.09-12.96-8.75-20.29.48-10.41,10.89-16.51,20.47-15.24,14.6,1.93,21.41,17.64,16.63,30.55-1.26,3.39,4.17,4.86,5.42,1.49Z' }],
  },
  coilTeal: {
    viewBox: '58 113 30 28',
    paths: [{ fill: '#336e7c', d: 'M83.35,135.31c2.26-6.7-.91-14.7-8.18-16.49-5.54-1.37-11.67,2.13-12.59,7.91-1.9,11.95,15.26,22.22,20.78,8.59.81-2.01-2.45-2.88-3.25-.9-3.85,9.5-14.96.96-14.25-6.46.37-3.87,3.74-6.39,7.52-5.98,6.09.66,8.51,7.17,6.73,12.43-.7,2.06,2.56,2.94,3.25.9Z' }],
  },
  coilOrange: {
    viewBox: '395 101 40 52',
    paths: [{ fill: '#f09223', d: 'M430.48,129.44c3.63-10.22-1.67-22.22-12.77-24.6-7.99-1.71-17,2.94-18.62,11.27-3.49,17.93,23.06,33.37,31.39,13.33.83-2-2.43-2.87-3.25-.9-6.64,15.97-26.61,2.29-24.9-10.96.88-6.81,7.98-10.84,14.48-9.5,9.41,1.95,13.44,11.96,10.42,20.46-.73,2.05,2.53,2.93,3.25.9Z' }],
  },
  crossTeal: {
    viewBox: '175 111 48 60',
    paths: [
      { fill: '#336e7c', d: 'M183.89,123.08c8.43,10.58,16.86,21.17,25.28,31.75,1.62,2.04,4.47-.84,2.86-2.86-8.43-10.58-16.86-21.17-25.28-31.75-1.62-2.04-4.47.84-2.86,2.86h0Z' },
      { fill: '#336e7c', d: 'M216.32,115.27c-16.08,14.35-29.13,31.61-38.55,50.99-1.13,2.33,2.35,4.39,3.49,2.04,9.28-19.1,22.08-36.04,37.92-50.17,1.95-1.74-.92-4.59-2.86-2.86h0Z' },
    ],
  },
  vOrange: {
    viewBox: '96 36 36 48',
    paths: [
      { fill: '#f09223', d: 'M103.48,51.1c5.4,6.79,10.81,13.57,16.21,20.36,2.7,3.39,7.45-1.41,4.77-4.77-5.4-6.79-10.81-13.57-16.21-20.36-2.7-3.39-7.45,1.41-4.77,4.77h0Z' },
      { fill: '#f09223', d: 'M124.92,43.77c-10.43,9.37-18.87,20.52-25.04,33.11-1.9,3.88,3.91,7.3,5.82,3.4,5.94-12.11,13.95-22.73,23.99-31.75,3.23-2.91-1.55-7.66-4.77-4.77h0Z' },
    ],
  },
  caretOrange: {
    viewBox: '358 46 38 44',
    paths: [
      { fill: '#f09223', d: 'M386,50.88c-6.27,7.87-12.53,15.74-18.8,23.61-1.61,2.02,1.24,4.9,2.86,2.86,6.27-7.87,12.53-15.74,18.8-23.61,1.61-2.02-1.24-4.9-2.86-2.86h0Z' },
      { fill: '#f09223', d: 'M361.73,50.21c11.75,10.53,21.19,23.03,28.12,37.2,1.14,2.34,4.63.29,3.49-2.04-7.07-14.46-16.76-27.28-28.75-38.02-1.93-1.73-4.8,1.12-2.86,2.86h0Z' },
    ],
  },
  swooshTeal: {
    viewBox: '30 64 56 34',
    paths: [{ fill: '#336e7c', d: 'M83.83,94.03c-12.23-16.36-30.79-26.37-51.22-27.48-2.6-.14-2.59,3.9,0,4.05,18.87,1.03,36.41,10.33,47.73,25.48,1.54,2.06,5.05.05,3.49-2.04h0Z' }],
  },
}

/* توزيع النودلز في النصف السفلي — تصعد ببطء شديد من أسفل إلى أعلى وتتلاشى */
const floatingDoodles = [
  { shape: 'spiralOrange', style: { bottom: '6%', right: '10%', width: 86 },  rise: 150, rot: 8,   dur: 34, delay: 0 },
  { shape: 'coilOrange',   style: { bottom: '20%', left: '15%', width: 58 },  rise: 130, rot: -10, dur: 30, delay: 6 },
  { shape: 'coilTeal',     style: { bottom: '28%', left: '6%', width: 44 },   rise: 110, rot: 6,   dur: 26, delay: 12 },
  { shape: 'crossTeal',    style: { bottom: '10%', right: '24%', width: 62 }, rise: 140, rot: -6,  dur: 32, delay: 9 },
  { shape: 'vOrange',      style: { bottom: '14%', left: '30%', width: 52 },  rise: 120, rot: 7,   dur: 28, delay: 16 },
  { shape: 'caretOrange',  style: { bottom: '26%', right: '5%', width: 50 },  rise: 115, rot: -8,  dur: 27, delay: 3 },
  { shape: 'swooshTeal',   style: { bottom: '5%', left: '11%', width: 72 },   rise: 145, rot: 5,   dur: 36, delay: 20 },
]
const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 26 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease, delay },
})

/* كلمة بتدرّج لوني متحرك (إبداعي) */
const GradWord = ({ children }) => (
  <span style={{
    display: 'inline-block',
    // حاشية علوية/سفلية مع هوامش سالبة معوِّضة: توسّع صندوق الخلفية
    // حتى لا تُقص الهمزة/المدّة الممتدة فوق ارتفاع السطر (background-clip: text)
    padding: '0.35em 0.1em',
    margin: '-0.35em -0.1em',
    backgroundImage: 'linear-gradient(100deg, #ffb85c, #ef9122, #4db3d4, #35a3c8, #4db3d4, #ef9122, #ffb85c)',
    backgroundSize: '220% 100%',
    animation: 'gradShift 5s linear infinite',
    WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent',
  }}>{children}</span>
)

export default function Hero({ onPrograms = () => {}, onAbout = () => {} }) {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">

      {/* فيديو «ليلة الختام» مستضاف محلياً — أقصى الخلف، مكتوم ويعيد نفسه،
          وخلفه صورة غطاء احتياطية لحين تحميله */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" style={{ zIndex: 0 }}>
        <img src={site.heroImage || '/images/heroback.jpg'} alt="" aria-hidden="true" draggable="false"
          className="absolute inset-0 h-full w-full object-cover" />
        <video
          src={site.heroVideo || '/videos/hero-bg.mp4'}
          autoPlay muted loop playsInline preload="auto"
          aria-hidden="true" tabIndex={-1}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div style={{ position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, rgba(8,38,51,0.84) 0%, rgba(13,58,77,0.74) 42%, rgba(8,38,51,0.8) 75%, rgba(4,23,32,0.94) 100%)' }} />
      </div>

      {/* نودلز رواسم — تصعد ضبابيةً وبنعومة من أسفل إلى أعلى خلف الباترن */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" style={{ zIndex: 0 }}>
        {floatingDoodles.map(({ shape, style, rise: riseBy, rot, dur, delay }, i) => {
          const { viewBox, paths } = doodleShapes[shape]
          return (
            <motion.div
              key={i}
              className="absolute"
              style={{ ...style, filter: 'blur(4px)' }}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: [40, -riseBy], rotate: [0, rot], opacity: [0, 0.3, 0.3, 0] }}
              transition={{
                duration: dur, delay, repeat: Infinity, ease: 'linear',
                opacity: { duration: dur, delay, repeat: Infinity, times: [0, 0.18, 0.75, 1], ease: 'easeInOut' },
              }}
            >
              <svg viewBox={viewBox} style={{ width: '100%', height: 'auto', display: 'block' }}>
                {paths.map((p, j) => <path key={j} d={p.d} fill={p.fill} />)}
              </svg>
            </motion.div>
          )
        })}
      </div>

      {/* باترن الهوية — شريط منحنٍ بعرض كامل، متوسّط رأسياً مع تمويه خفيف */}
      <img src="/images/hero-pattern.png" alt="" aria-hidden="true" draggable="false"
        className="pointer-events-none absolute left-0 w-full"
        style={{
          top: '50%', transform: 'translateY(-50%)', zIndex: 0,
          opacity: 0.5, filter: 'blur(9px)',
        }} />

      {/* توهّجات متنفّسة خلف الشعار */}
      <motion.div
        className="pointer-events-none absolute"
        style={{ width: '560px', height: '560px', borderRadius: '50%', top: '42%', left: '50%', transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(47,167,204,0.20) 0%, transparent 62%)' }}
        animate={{ opacity: [0.55, 1, 0.55], scale: [1, 1.08, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="pointer-events-none absolute"
        style={{ width: '420px', height: '420px', borderRadius: '50%', top: '44%', left: '50%', transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(239,145,34,0.16) 0%, transparent 60%)' }}
        animate={{ opacity: [0.4, 0.85, 0.4], scale: [1.05, 0.95, 1.05] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* رسومات خفيفة على الخلفية */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* شبكة نقاط خافتة تتلاشى نحو المركز */}
        <svg className="absolute inset-0 h-full w-full"
          style={{ opacity: 0.06,
            maskImage: 'radial-gradient(ellipse 55% 55% at 50% 45%, transparent 35%, black 85%)',
            WebkitMaskImage: 'radial-gradient(ellipse 55% 55% at 50% 45%, transparent 35%, black 85%)' }}>
          <defs>
            <pattern id="heroDots" width="36" height="36" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.4" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#heroDots)" />
        </svg>

      </div>

      {/* عبارة الهيرو — سطران متوازنان، كلمة «أثره» بتدرّج لوني متحرك */}
      <motion.h1
        className="relative mb-6 flex flex-col items-center"
        style={{ fontFamily: "'TheYearofHandicrafts', 'IBM Plex Sans Arabic', sans-serif", color: '#ffffff', fontWeight: 700, fontSize: 'clamp(46px, 7.4vw, 92px)', lineHeight: 1.22, letterSpacing: '-0.01em' }}
        {...rise(0.1)}
      >
        <span style={{ display: 'inline-block', whiteSpace: 'nowrap', padding: '0.08em 0',
          fontFeatureSettings: '"swsh" 1', WebkitFontFeatureSettings: '"swsh" 1' }}>
          نبني جيلًا يعتز بقيَمِه
        </span>
        <span style={{ display: 'inline-block', whiteSpace: 'nowrap', padding: '0.08em 0',
          fontFeatureSettings: '"swsh" 1', WebkitFontFeatureSettings: '"swsh" 1' }}>
          ويصنع <GradWord>أثـره</GradWord>
        </span>
      </motion.h1>

      {/* فاصل — يُرسم تدريجياً */}
      <motion.div
        className="mb-8 h-px w-24"
        style={{ background: 'linear-gradient(to left, transparent, #ef9122, transparent)', transformOrigin: 'center' }}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease, delay: 0.35 }}
      />

      {/* النص الوصفي */}
      <motion.p
        className="relative mb-10 max-w-3xl text-center text-[17px] leading-loose md:text-lg"
        style={{ color: '#ffffff', fontWeight: 300 }}
        {...rise(0.5)}
      >
        جمعية سعودية متخصصة في تنمية الطفل، تقدم برامج تربوية وقيمية ومهارية
        <br className="hidden md:block" />
        {' '}تسهم في بناء شخصية متوازنة وقادرة على صناعة الأثر.
      </motion.p>

      {/* الأزرار — رئيسي (حبّة زجاجية بشارة برتقالية) وثانوي (حبّة زجاجية بسيطة) */}
      <motion.div className="relative flex flex-wrap items-center justify-center gap-4" {...rise(0.62)}>
        <motion.button
          onClick={onPrograms}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-3.5"
          style={{
            borderRadius: '999px', padding: '8px 26px 8px 8px',
            background: 'linear-gradient(135deg, rgba(13,58,77,0.6) 0%, rgba(8,38,51,0.6) 100%)',
            backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
            border: '0.5px solid rgba(255,255,255,0.16)', cursor: 'pointer',
          }}
        >
          <span style={{ color: 'white', fontWeight: 500, fontSize: '15px' }}>استكشف برامجنا</span>
          <span style={{ width: '46px', height: '46px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'linear-gradient(135deg, #ef9122 0%, #c9760f 100%)', boxShadow: '0 0 18px rgba(239,145,34,0.55)' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 5 12 12 19" />
            </svg>
          </span>
        </motion.button>

        <motion.button
          onClick={onAbout}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center"
          style={{
            borderRadius: '999px', padding: '8px 30px', minHeight: '62px',
            background: 'linear-gradient(145deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)',
            backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
            border: '0.5px solid rgba(255,255,255,0.16)', cursor: 'pointer',
          }}
        >
          <span style={{ color: 'white', fontWeight: 500, fontSize: '15px' }}>تعرّف على رواسم</span>
        </motion.button>
      </motion.div>
    </section>
  )
}
