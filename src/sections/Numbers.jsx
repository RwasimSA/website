import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { glass, motion as anim } from '../theme'
import SectionCta from '../components/SectionCta'
import { text } from '../typography'
import statsData from '../../content/stats.json'

/* مؤشرات «أثرنا بالأرقام» — القيم من content/stats.json (تُحرَّر من لوحة التحكم) */
const STATS = [
  {
    label: 'مستفيد', value: statsData.beneficiaries, suffix: '', plus: true,
    glow: 'rgba(60,200,210,0.16)', iconGlow: 'rgba(60,200,210,0.55)',
    img: '/images/stats/reach.svg',
  },
  {
    label: 'ساعة', value: statsData.hours, suffix: '', plus: false,
    glow: 'rgba(70,170,205,0.16)', iconGlow: 'rgba(70,170,205,0.55)',
    img: '/images/stats/hours.svg',
  },
  {
    label: 'برنامج ومشروع', value: statsData.programs, suffix: '', plus: false,
    glow: 'rgba(239,145,34,0.15)', iconGlow: 'rgba(239,145,34,0.55)',
    img: '/images/stats/programs.svg',
  },
  {
    label: 'متطوع ومتطوعة', value: statsData.volunteers, suffix: '', plus: false,
    glow: 'rgba(244,166,63,0.15)', iconGlow: 'rgba(244,166,63,0.55)',
    img: '/images/stats/volunteer.svg',
  },
  {
    label: 'شراكة', value: statsData.partnerships, suffix: '', plus: false,
    glow: 'rgba(93,184,164,0.16)', iconGlow: 'rgba(93,184,164,0.55)',
    img: '/images/stats/partnership.svg',
  },
]

/* تحميل أشكال ملف SVG وتضمينها inline (مع كاش مشترك) */
const svgCache = {}
function useSvgShapes(src) {
  const [data, setData] = useState(svgCache[src] || null)
  useEffect(() => {
    if (svgCache[src]) { setData(svgCache[src]); return }
    let alive = true
    fetch(src)
      .then((r) => r.text())
      .then((t) => {
        const svg = new DOMParser().parseFromString(t, 'image/svg+xml').querySelector('svg')
        if (!svg) return
        const shapes = [...svg.querySelectorAll('path, circle, rect, ellipse')].map((el) => {
          const attrs = {}
          for (const a of el.attributes) {
            if (a.name !== 'class' && a.name !== 'style' && a.name !== 'id') attrs[a.name] = a.value
          }
          // وراثة اللون من المجموعات الأعلى (<g fill=...>) إذا لم يكن على الشكل نفسه
          if (!attrs.fill) {
            let p = el.parentElement
            while (p && p.tagName !== 'svg') {
              const f = p.getAttribute('fill')
              if (f) { attrs.fill = f; break }
              p = p.parentElement
            }
          }
          return { tag: el.tagName, attrs }
        })
        svgCache[src] = { viewBox: svg.getAttribute('viewBox') || '0 0 512 512', shapes }
        if (alive) setData(svgCache[src])
      })
      .catch(() => {})
    return () => { alive = false }
  }, [src])
  return data
}

/* نسخة شبحية كبيرة من الأيقونة — اوت لاين خفيف جداً لزخرفة خلفية البطاقة */
function GhostIcon({ src }) {
  const data = useSvgShapes(src)
  if (!data) return null
  return (
    <svg viewBox={data.viewBox} style={{ width: '100%', height: '100%' }}>
      {data.shapes.map((s, i) => {
        const El = s.tag
        const { fill, ...rest } = s.attrs
        return <El key={i} {...rest} fill="none" stroke="#ffffff" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
      })}
    </svg>
  )
}

/* أيقونة تُرسم خطياً: نتتبّع محيط أشكال الـ SVG بخط متحرك (pathLength)
   ثم تظهر التعبئة الملوّنة. */
function DrawnIcon({ src }) {
  const data = useSvgShapes(src)
  if (!data) return <span style={{ width: 50, height: 50, display: 'block' }} />

  return (
    <svg viewBox={data.viewBox} style={{ width: 50, height: 50, overflow: 'visible' }}>
      {/* طبقة التعبئة — تظهر بعد اكتمال الرسم الخطي */}
      {data.shapes.map((s, i) => {
        const El = motion[s.tag]
        const { fill, ...rest } = s.attrs
        return (
          <El key={`f${i}`} {...rest} fill={fill || '#ffffff'} stroke="none"
            transition={{ duration: 0.45, delay: 1.05 + i * 0.1, ease: 'easeOut' }} />
        )
      })}
      {/* طبقة الرسم الخطي — خط يتتبّع محيط كل شكل ثم يتلاشى */}
      {data.shapes.map((s, i) => {
        const El = motion[s.tag]
        const { fill, ...rest } = s.attrs
        return (
          <El key={`s${i}`} {...rest} fill="none" stroke={fill || '#ffffff'}
            strokeWidth="12" strokeLinecap="round" strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 1 }}
            animate={{ pathLength: 1, opacity: 0 }}
            transition={{
              pathLength: { duration: 0.85, delay: 0.2 + i * 0.14, ease: 'easeInOut' },
              opacity: { duration: 0.4, delay: 1.15 + i * 0.1 },
            }} />
        )
      })}
    </svg>
  )
}

/* أيقونة مع توهّج ضوئي يتنفّس خلفها */
const StatIcon = ({ src, glow }) => (
  <div className="stat-icon" style={{ position: 'relative', width: '54px', height: '54px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <motion.div
      style={{ position: 'absolute', inset: '-12px', borderRadius: '50%',
        background: `radial-gradient(circle, ${glow} 0%, transparent 68%)`, filter: 'blur(12px)', pointerEvents: 'none' }}
      animate={{ opacity: [0.55, 1, 0.55], scale: [0.9, 1.08, 0.9] }}
      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
    />
    <span style={{ position: 'relative', zIndex: 1, display: 'flex' }}>
      <DrawnIcon src={src} />
    </span>
  </div>
)

/* عدّاد تصاعدي بأرقام إنجليزية — يبدأ عند دخول البطاقة مجال الرؤية
   (لا عند تحميل الصفحة)، ومؤقّت احتياطي يثبّت القيمة النهائية حتى لو
   جمّد المتصفح رسوم rAF (تبويب خلفي أو وضع توفير الطاقة في الجوال) */
function CountUp({ value, suffix = '', plus = true, duration = 1.6 }) {
  const [n, setN] = useState(0)
  const ref = useRef(null)
  useEffect(() => {
    let raf, timer, io, started = false
    const run = () => {
      if (started) return
      started = true
      let start
      const step = (t) => {
        if (!start) start = t
        const p = Math.min((t - start) / (duration * 1000), 1)
        setN(Math.round((1 - Math.pow(1 - p, 3)) * value))
        if (p < 1) raf = requestAnimationFrame(step)
      }
      raf = requestAnimationFrame(step)
      timer = setTimeout(() => { cancelAnimationFrame(raf); setN(value) }, duration * 1000 + 500)
    }
    if ('IntersectionObserver' in window && ref.current) {
      io = new IntersectionObserver((entries) => {
        if (entries.some((e) => e.isIntersecting)) { run(); io.disconnect() }
      }, { threshold: 0.2 })
      io.observe(ref.current)
      /* ضمانة أخيرة: مهما حدث، القيمة الحقيقية تظهر بعد 6 ثوانٍ */
      timer = setTimeout(() => { if (!started) setN(value) }, 6000)
    } else {
      run()
    }
    return () => { cancelAnimationFrame(raf); clearTimeout(timer); if (io) io.disconnect() }
  }, [value, duration])
  return (
    <span ref={ref} style={{ display: 'inline-flex', direction: 'rtl', alignItems: 'baseline', gap: '0.14em' }}>
      {plus && <span>+</span>}
      <span dir="ltr">{n.toLocaleString('en-US')}</span>
      {suffix && <span>{suffix}</span>}
    </span>
  )
}

/* رسوم خلفية خفيفة جداً */
const svgProps = { viewBox: '0 0 140 140', preserveAspectRatio: 'xMidYMid slice', style: { width: '100%', height: '100%' } }
const decoSvg = {
  dots: (
    <svg {...svgProps}>
      {Array.from({ length: 7 }, (_, r) => Array.from({ length: 7 }, (_, c) => (
        <circle key={`${r}-${c}`} cx={10 + c * 20} cy={10 + r * 20} r="2" fill="white" />
      )))}
    </svg>
  ),
  rings: (
    <svg {...svgProps} fill="none" stroke="white" strokeWidth="1">
      {[24, 46, 68, 90, 112].map((r) => <circle key={r} cx="18" cy="122" r={r} />)}
    </svg>
  ),
  grid: (
    <svg {...svgProps} stroke="white" strokeWidth="0.7" fill="none">
      {Array.from({ length: 6 }, (_, i) => <line key={`h${i}`} x1="0" y1={i * 28} x2="140" y2={i * 28} />)}
      {Array.from({ length: 6 }, (_, i) => <line key={`v${i}`} x1={i * 28} y1="0" x2={i * 28} y2="140" />)}
    </svg>
  ),
  plus: (
    <svg {...svgProps} stroke="white" strokeWidth="1">
      {Array.from({ length: 5 }, (_, r) => Array.from({ length: 5 }, (_, c) => {
        const x = 14 + c * 28, y = 14 + r * 28
        return <g key={`${r}-${c}`}><line x1={x - 4} y1={y} x2={x + 4} y2={y} /><line x1={x} y1={y - 4} x2={x} y2={y + 4} /></g>
      }))}
    </svg>
  ),
}

const Deco = ({ type }) => (
  <div style={{
    position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', opacity: 0.06,
    maskImage: 'linear-gradient(to top right, black 0%, transparent 65%)',
    WebkitMaskImage: 'linear-gradient(to top right, black 0%, transparent 65%)',
  }}>
    {decoSvg[type]}
  </div>
)

const CardGlow = ({ color }) => (
  <motion.div
    style={{
      position: 'absolute', top: '-30%', left: '50%',
      width: '80%', height: '80%', borderRadius: '50%', transform: 'translateX(-50%)',
      background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
      filter: 'blur(40px)', pointerEvents: 'none',
    }}
    animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.12, 1] }}
    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
  />
)

export default function Numbers({ onOpenPage = () => {} }) {
  return (
    <motion.section
      className="relative flex min-h-screen flex-col items-center justify-center px-6 md:px-16"
    >
      {/* خلفية القسم — صورة قوية الحضور من فعاليات الجمعية مع تظليل بلون الهوية */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <img src="/images/numbers-back.jpg" alt="" aria-hidden="true" draggable="false"
          className="h-full w-full object-cover" />
        <div style={{ position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, rgba(8,38,51,0.88) 0%, rgba(13,58,77,0.72) 40%, rgba(8,38,51,0.78) 72%, rgba(4,23,32,0.94) 100%)' }} />
      </div>

      {/* توهجات جانبية */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          style={{ position:'absolute', top:'5%', left:'-10%', width:'55%', height:'90%', borderRadius:'50%',
            background:'radial-gradient(ellipse, rgba(26,127,161,0.22) 0%, transparent 65%)', filter:'blur(100px)' }}
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          style={{ position:'absolute', top:'15%', right:'-10%', width:'45%', height:'70%', borderRadius:'50%',
            background:'radial-gradient(ellipse, rgba(18,113,154,0.15) 0%, transparent 65%)', filter:'blur(100px)' }}
          animate={{ x: [0, -25, 0], y: [0, 20, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="flex w-full flex-col items-center" style={{ zIndex: 1 }}>
        <motion.h2 style={text.sectionTitle} className="mb-3" {...anim.fade(0.07)}>أثرنا بالأرقام</motion.h2>
        <motion.p
          style={{ ...text.body, fontWeight: 300, maxWidth: '34rem', textAlign: 'center' }}
          className="mb-12"
          {...anim.fade(0.12)}
        >
          خمسة مؤشرات من أحدث البيانات المعتمدة.
        </motion.p>

        <div className="grid w-full max-w-6xl grid-cols-2 gap-4 md:grid-cols-5 md:gap-5">
          {STATS.map((s, i) => (
            <motion.div
              key={i}
              // انزلاق بلا شفافية: أي opacity متحركة على البطاقة تؤجّل رسم البلور الزجاجي في كروم
              initial={{ y: 30 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.18 + i * 0.08 }}
              {...anim.hoverLift}
              className={`stat-card ${i === STATS.length - 1 ? 'col-span-2 md:col-span-1' : ''}`}
              style={glass({
                padding: '30px 22px',
                minHeight: '285px',
                borderRadius: '36px',
                display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '13px',
                textAlign: 'right', overflow: 'hidden',
                background: 'linear-gradient(150deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.04) 55%, rgba(255,255,255,0.07) 100%)',
                backdropFilter: 'blur(30px) saturate(150%)', WebkitBackdropFilter: 'blur(30px) saturate(150%)',
                border: '1px solid rgba(255,255,255,0.22)',
                borderTop: '1px solid rgba(255,255,255,0.32)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.28), 0 20px 44px rgba(3,15,21,0.3)',
              })}
            >
              <CardGlow color={s.glow} />
              {/* نسخة شبحية كبيرة من أيقونة البطاقة — في الزاوية اليسرى السفلية، يظهر جزؤها العلوي فقط */}
              <div aria-hidden="true" style={{
                position: 'absolute', bottom: '-96px', left: '-30px', width: '170px', height: '170px',
                opacity: 0.07, pointerEvents: 'none', zIndex: 0,
              }}>
                <GhostIcon src={s.img} />
              </div>
              <StatIcon src={s.img} glow={s.iconGlow} />
              {/* marginTop: auto يدفع الرقم والعنوان لأسفل البطاقة والأيقونة تبقى أعلى */}
              <span className="stat-number" style={{ position: 'relative', zIndex: 1, marginTop: 'auto', color: 'white', fontWeight: 600, fontSize: '34px', lineHeight: 1, whiteSpace: 'nowrap' }}>
                <CountUp value={s.value} suffix={s.suffix} plus={s.plus} />
              </span>
              <span style={{
                position: 'relative', zIndex: 1, width: '26px', height: '2px', borderRadius: '2px',
                background: 'linear-gradient(90deg, transparent, #ef9122, transparent)',
              }} />
              <span style={{ position: 'relative', zIndex: 1, width: '100%', ...text.body, color: '#b6ccd6', fontWeight: 300, lineHeight: 1.5 }}>
                {s.label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* زر صفحة أثرنا */}
        <SectionCta label="تعرّف على أثرنا" onClick={() => onOpenPage('impact')} className="mx-auto mt-12 md:mt-14" delay={0.55} />

      </div>
    </motion.section>
  )
}
