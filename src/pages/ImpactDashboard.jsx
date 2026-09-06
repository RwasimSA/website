import { motion } from 'framer-motion'
import { glass, color } from '../theme'
import { text } from '../typography'
import { useApiData } from '../lib/useApiData'
import Skeleton from '../components/Skeleton'
import SkeletonSwap from '../components/SkeletonSwap'

const COPPER = '#ef9122'
const PURPLE = '#1e6480'
const GOLD = '#d8c8a4'
const MUTE = '#4f5f66'

const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay },
})

/* ── البطاقات الإحصائية العلوية ── */
const PeopleIcon = () => (<svg width="26" height="26" viewBox="0 0 24 24" fill="white"><path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5zm0 2c-4 0-8 2-8 5v1h16v-1c0-3-4-5-8-5z" /></svg>)
const BookIcon = () => (<svg width="26" height="26" viewBox="0 0 24 24" fill="white"><path d="M4 4h7v16H6a2 2 0 0 1-2-2zm9 0h7v14a2 2 0 0 1-2 2h-5z" /></svg>)
const GlobeIcon = () => (<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8"><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></svg>)
const CapIcon = () => (<svg width="26" height="26" viewBox="0 0 24 24" fill="white"><path d="M12 3 1 8l11 5 9-4.1V14h2V8zM5 13.2V17c0 1.7 3.1 3 7 3s7-1.3 7-3v-3.8l-7 3.2z" /></svg>)

// أيقونات زخرفية للبطاقات (بالترتيب) — مستقلة عن أيقونة الـ API
const STAT_ICONS = [<PeopleIcon />, <BookIcon />, <GlobeIcon />, <CapIcon />, <PeopleIcon />]

/** تحويل إحصائيات الـ API إلى شكل بطاقات اللوحة (القيمة + الوحدة + الاسم). */
function mapDashboardStats(list) {
  return (list || []).map((s, i) => ({
    icon: STAT_ICONS[i % STAT_ICONS.length],
    value: (Number(s.value) || 0).toLocaleString('en-US') + (s.suffix ? ' ' + s.suffix : ''),
    unit: '+',
    label: s.label || '',
  }))
}

const DeltaBadge = ({ v }) => (
  <span className="flex items-center gap-1" style={{ color: '#7fd6a0', fontSize: '11px', fontWeight: 600, padding: '3px 9px', borderRadius: '999px', background: 'rgba(100,200,140,0.14)' }}>
    {v}
    <svg width="9" height="9" viewBox="0 0 24 24" fill="#7fd6a0"><path d="M12 4l8 14H4z" /></svg>
  </span>
)

/* خلفية رسومية خفيفة لبطاقات الإحصائيات */
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
      {[24, 46, 68, 90, 112].map((r) => <circle key={r} cx="16" cy="124" r={r} />)}
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
const decoTypes = ['dots', 'rings', 'grid', 'plus']

const Deco = ({ type }) => (
  <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', opacity: 0.06,
    maskImage: 'linear-gradient(to top right, black 0%, transparent 62%)',
    WebkitMaskImage: 'linear-gradient(to top right, black 0%, transparent 62%)' }}>
    {decoSvg[type]}
  </div>
)

function StatCard({ s, i }) {
  return (
    <motion.div {...rise(0.04 * i)} style={glass({ padding: '22px 20px', position: 'relative', overflow: 'hidden' })}>
      <Deco type={decoTypes[i % decoTypes.length]} />
      {/* توهّج نحاسي ناعم في الزاوية */}
      <div style={{ position: 'absolute', top: '-30%', right: '-20%', width: '60%', height: '60%', borderRadius: '50%', zIndex: 0, pointerEvents: 'none',
        background: 'radial-gradient(circle, rgba(239,145,34,0.12) 0%, transparent 70%)' }} />
      <div className="relative" style={{ zIndex: 1 }}>
        <div className="mb-5 flex items-start justify-between">
          {s.delta ? <DeltaBadge v={s.delta} /> : <span />}
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl" style={{ background: 'linear-gradient(145deg, #14404f, #0b2733)', border: '0.5px solid rgba(255,255,255,0.12)' }}>{s.icon}</div>
        </div>
        <div className="flex items-baseline gap-1" style={{ flexDirection: 'row-reverse', justifyContent: 'flex-end' }}>
          <span style={{ color: COPPER, fontSize: '20px', fontWeight: 700 }}>{s.unit}</span>
          <span style={{ color: 'white', fontSize: '30px', fontWeight: 700, lineHeight: 1 }}>{s.value}</span>
        </div>
        <p style={{ color: '#b6ccd6', fontWeight: 300, fontSize: '13px', marginTop: '6px' }}>{s.label}</p>
      </div>
    </motion.div>
  )
}

/* ── حلقة التوزيع حسب المشروع ── */
const dist = [
  { label: 'أكاديمية رواسم', value: 42, c: COPPER },
  { label: 'مصحف سورة', value: 26, c: PURPLE },
  { label: 'تطبيق سالم', value: 18, c: GOLD },
  { label: 'أخرى', value: 14, c: MUTE },
]
function Donut() {
  const r = 58, cx = 80, cy = 80, C = 2 * Math.PI * r
  let off = 0
  return (
    <div className="flex flex-col items-center">
      <div style={{ position: 'relative', width: '160px', height: '160px' }}>
        <svg width="160" height="160" viewBox="0 0 160 160">
          <g transform="rotate(-90 80 80)">
            {dist.map((d, i) => {
              const len = (d.value / 100) * C
              const el = <circle key={i} cx={cx} cy={cy} r={r} fill="none" stroke={d.c} strokeWidth="20" strokeDasharray={`${len} ${C - len}`} strokeDashoffset={-off} />
              off += len
              return el
            })}
          </g>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span style={{ color: 'white', fontSize: '30px', fontWeight: 700, lineHeight: 1 }}>8</span>
          <span style={{ color: '#8fa6b0', fontSize: '12px', fontWeight: 300 }}>مشاريع</span>
        </div>
      </div>
      <div className="mt-6 w-full" dir="rtl">
        {dist.map((d, i) => (
          <div key={i} className="flex items-center justify-between py-1.5">
            <span className="flex items-center gap-2" style={{ color: '#dcebf2', fontSize: '13px', fontWeight: 300 }}>
              <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: d.c, display: 'inline-block', flexShrink: 0 }} />
              {d.label}
            </span>
            <span style={{ color: '#8fa6b0', fontSize: '13px', fontWeight: 600 }}>{d.value}٪</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── أعمدة المستفيدين شهرياً ── */
const monthly = [
  { m: 'يناير', v: 48 }, { m: 'فبراير', v: 70 }, { m: 'مارس', v: 40 }, { m: 'أبريل', v: 62 },
  { m: 'مايو', v: 80 }, { m: 'يونيو', v: 96 }, { m: 'يوليو', v: 88 },
]
function Bars() {
  return (
    <div className="flex flex-col">
      {/* منطقة الأعمدة فقط — الأعمدة نسبة من هذا الارتفاع الثابت فلا تتجاوز الحافة */}
      <div className="flex items-end justify-between gap-3" style={{ height: '210px', flexDirection: 'row-reverse' }}>
        {monthly.map((b, i) => (
          <div key={i} className="flex flex-1 items-end justify-center" style={{ height: '100%' }}>
            <motion.div
              initial={{ height: 0 }} whileInView={{ height: `${b.v}%` }} viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.05 }}
              style={{ width: '100%', maxWidth: '42px', borderRadius: '10px 10px 4px 4px',
                background: i % 2 === 0 ? `linear-gradient(180deg, ${COPPER}, #c9760f)` : `linear-gradient(180deg, #2a7591, #163f4e)` }} />
          </div>
        ))}
      </div>
      {/* أسماء الأشهر أسفل منطقة الأعمدة */}
      <div className="mt-3 flex justify-between gap-3" style={{ flexDirection: 'row-reverse' }}>
        {monthly.map((b, i) => (
          <span key={i} className="flex-1 text-center" style={{ color: '#8fa6b0', fontSize: '11.5px', fontWeight: 300 }}>{b.m}</span>
        ))}
      </div>
    </div>
  )
}

/* ── أعلى الدول وصولاً ── */
const countries = [
  { name: 'السعودية', ab: 'ال', v: 40 }, { name: 'مصر', ab: 'مص', v: 17 },
  { name: 'إندونيسيا', ab: 'ان', v: 11 }, { name: 'باكستان', ab: 'با', v: 8 },
  { name: 'نيجيريا', ab: 'ني', v: 3.8 }, { name: 'المغرب', ab: 'ال', v: 2.9 },
]
function Countries() {
  const max = countries[0].v
  return (
    <div className="flex flex-col gap-4">
      {countries.map((c, i) => (
        <div key={i} className="flex items-center gap-3">
          <span style={{ color: '#8fa6b0', fontSize: '12px', fontWeight: 600, width: '38px', textAlign: 'left' }}>{c.v}٪</span>
          <span className="flex-1 truncate text-right" style={{ color: '#dcebf2', fontSize: '13.5px', fontWeight: 300 }}>{c.name}</span>
          <div style={{ flex: '1.4', height: '8px', borderRadius: '999px', background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
            <motion.div initial={{ width: 0 }} whileInView={{ width: `${(c.v / max) * 100}%` }} viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: i * 0.06 }}
              style={{ height: '100%', borderRadius: '999px', background: `linear-gradient(90deg, #c9760f, ${COPPER})` }} />
          </div>
          <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg" style={{ background: 'rgba(239,145,34,0.16)', border: '0.5px solid rgba(239,145,34,0.3)', color: GOLD, fontSize: '10px', fontWeight: 600 }}>{c.ab}</span>
        </div>
      ))}
    </div>
  )
}

/* ── النمو التراكمي ── */
function AreaChart() {
  const line = 'M0,168 C60,165 90,156 140,150 C200,143 240,120 300,104 C360,88 400,62 460,48 C520,36 560,22 600,16'
  const fill = `${line} L600,190 L0,190 Z`
  const labels = ['ربع 1', 'ربع 2', 'ربع 3', 'ربع 4', 'ربع 5', 'ربع 6']
  return (
    <div>
      <svg viewBox="0 0 600 200" className="w-full" style={{ height: '210px' }} preserveAspectRatio="none">
        <defs>
          <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={COPPER} stopOpacity="0.35" />
            <stop offset="100%" stopColor={COPPER} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={fill} fill="url(#areaFill)" />
        <motion.path d={line} fill="none" stroke={COPPER} strokeWidth="3" strokeLinecap="round"
          initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.4, ease: 'easeInOut' }} />
      </svg>
      <div className="mt-2 flex justify-between" style={{ flexDirection: 'row-reverse' }}>
        {labels.map((l) => <span key={l} style={{ color: '#8fa6b0', fontSize: '11px', fontWeight: 300 }}>{l}</span>)}
      </div>
    </div>
  )
}

/* ── إنجاز مستهدفات المشاريع ── */
const targets = [
  { name: 'أكاديمية رواسم', v: 86 }, { name: 'برنامج مدكر', v: 72 },
  { name: 'تطبيق سالم', v: 94 }, { name: 'مصحف سورة', v: 68 },
  { name: 'قاعدة المعلومات القرآنية', v: 100 }, { name: 'إذاعة نوبل', v: 91 },
]
function Targets() {
  return (
    <div className="grid gap-x-12 gap-y-6 md:grid-cols-2">
      {targets.map((t, i) => (
        <div key={i}>
          <div className="mb-2 flex items-center justify-between">
            <span style={{ color: '#8fa6b0', fontSize: '12.5px', fontWeight: 600 }}>{t.v}٪</span>
            <span style={{ color: '#dcebf2', fontSize: '14px', fontWeight: 300 }}>{t.name}</span>
          </div>
          <div style={{ height: '10px', borderRadius: '999px', background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
            <motion.div initial={{ width: 0 }} whileInView={{ width: `${t.v}%` }} viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: i * 0.05 }}
              style={{ height: '100%', borderRadius: '999px', background: `linear-gradient(90deg, #c9760f, ${COPPER})` }} />
          </div>
        </div>
      ))}
    </div>
  )
}

/* ── ترويسة بطاقة ── */
function CardHead({ title, sub, icon }) {
  return (
    <div className="mb-6 flex items-start justify-between">
      <div style={{ textAlign: 'right' }}>
        <h3 style={{ color: 'white', fontWeight: 600, fontSize: '16px', marginBottom: '4px' }}>{title}</h3>
        <p style={{ color: '#8fa6b0', fontWeight: 300, fontSize: '12.5px' }}>{sub}</p>
      </div>
      <span className="flex h-9 w-9 items-center justify-center rounded-lg" style={{ background: 'rgba(239,145,34,0.14)', border: '0.5px solid rgba(239,145,34,0.28)', color: COPPER }}>{icon}</span>
    </div>
  )
}
const Ic = ({ d }) => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{d}</svg>

export default function ImpactDashboard() {
  const { data: stats, loading } = useApiData('/stats', { map: mapDashboardStats, fallback: [] })
  return (
    <div dir="rtl" className="relative mx-auto w-full max-w-6xl px-6 pb-28 pt-36 md:px-10">
      <div className="mb-12 text-center">
        <motion.p style={{ color: color.copper, fontSize: '14px', fontWeight: 300, letterSpacing: '0.22em', marginBottom: '14px' }} {...rise(0)}>برامجنا وأثرنا</motion.p>
        <motion.h1 style={{ ...text.sectionTitle, fontSize: '34px' }} className="mb-4" {...rise(0.07)}>لوحة الأثر</motion.h1>
        <motion.p style={{ color: '#b6ccd6', fontWeight: 300, fontSize: '15px' }} {...rise(0.14)}>أثر جمعية رواسم في خدمة القرآن والسنة — أرقام حيّة.</motion.p>
      </div>

      {/* البطاقات الإحصائية */}
      <SkeletonSwap
        loading={loading && stats.length === 0}
        className="mb-5"
        style={{ display: 'grid', gap: '16px', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))' }}
        skeleton={Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} style={{ minHeight: '150px', borderRadius: '18px' }} />)}
      >
        {stats.map((s, i) => <StatCard key={i} s={s} i={i} />)}
      </SkeletonSwap>

      {/* الحلقة + الأعمدة */}
      <div className="mb-5 grid gap-5 lg:grid-cols-3">
        <motion.div {...rise(0.05)} style={glass({ padding: '26px 24px' })}>
          <CardHead title="حسب المشروع" sub="توزيع المستفيدين" icon={<Ic d={<><path d="M4 19V5" /><path d="M4 19h16" /><rect x="7" y="10" width="3" height="6" /><rect x="13" y="7" width="3" height="9" /></>} />} />
          <Donut />
        </motion.div>
        <motion.div {...rise(0.1)} className="lg:col-span-2" style={glass({ padding: '26px 24px' })}>
          <CardHead title="المستفيدون شهرياً" sub="نمو الوصول خلال آخر 7 أشهر" icon={<Ic d={<><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></>} />} />
          <Bars />
        </motion.div>
      </div>

      {/* الدول + النمو التراكمي */}
      <div className="mb-5 grid gap-5 lg:grid-cols-3">
        <motion.div {...rise(0.05)} style={glass({ padding: '26px 24px' })}>
          <CardHead title="أعلى الدول وصولاً" sub="نسبة المستفيدين" icon={<Ic d={<><circle cx="12" cy="12" r="9" /><path d="M3 12h18" /><path d="M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18z" /></>} />} />
          <Countries />
        </motion.div>
        <motion.div {...rise(0.1)} className="lg:col-span-2" style={glass({ padding: '26px 24px' })}>
          <CardHead title="النمو التراكمي للمستفيدين" sub="بالملايين — على مدى عامين" icon={<Ic d={<><polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" /></>} />} />
          <AreaChart />
        </motion.div>
      </div>

      {/* المستهدفات */}
      <motion.div {...rise(0.08)} style={glass({ padding: '30px 28px' })}>
        <CardHead title="إنجاز مستهدفات المشاريع لهذا العام" sub="نسبة تحقيق المستهدف السنوي" icon={<Ic d={<><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="4" /></>} />} />
        <Targets />
      </motion.div>
    </div>
  )
}
