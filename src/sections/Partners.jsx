import { motion } from 'framer-motion'
import { motion as anim } from '../theme'
import { text } from '../typography'
import partnersData from '../../content/partners.json'

/* ─────────────────────────────────────────────────────────────
   «شركاء النجاح» — ⚠️ الشعارات الحالية تجريبية مولّدة (أشكال
   مجردة بنص «شعار الشريك») لعرض التصميم فقط، وتُستبدل بشعارات
   شركاء رواسم المعتمدة فور وصولها (نفس المسارات في
   static/images/partners/).
   ───────────────────────────────────────────────────────────── */

const logos = partnersData.logos.map((l) => l.image)

/* خانة شعار للشريط المتحرك — حجمها يتبع مقاس الشاشة عبر متغيّر CSS */
const MarqueeCell = ({ src }) => (
  <div className="partner-cell flex-shrink-0"
    style={{
      width: 'var(--partner-size, 78px)', height: 'var(--partner-size, 78px)',
      borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '9px', background: '#ffffff', border: '0.5px solid rgba(255,255,255,0.6)',
    }}>
    <img src={src} alt="شريك" draggable="false" loading="lazy" className="h-full w-full object-contain" />
  </div>
)

/* يكرر شعارات السطر حتى تتجاوز عرض أي شاشة (ولو كانت القائمة قصيرة) */
const fillRow = (row) => {
  if (!row.length) return row
  let out = [...row]
  while (out.length < 12) out = [...out, ...row]
  return out
}

/* سطر متحرّك أفقياً بلا نهاية */
const MarqueeRow = ({ logos, anim: animName, speed = 26 }) => (
  <div className="overflow-hidden">
    <div className="flex w-max gap-2" style={{ animation: `${animName} ${speed}s linear infinite` }}>
      {[...logos, ...logos].map((src, i) => <MarqueeCell key={i} src={src} />)}
    </div>
  </div>
)

/* صفّان متعاكسان بلا نهاية، وحواف القسم الجانبية تتلاشى تدريجياً */
const EDGE_FADE = {
  maskImage: 'linear-gradient(90deg, transparent 0%, #000 9%, #000 91%, transparent 100%)',
  WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, #000 9%, #000 91%, transparent 100%)',
}

const TwoRowMarquee = ({ speed, size, className = '' }) => (
  <div className={className} style={{ ...EDGE_FADE, '--partner-size': size }}>
    <div className="flex flex-col gap-2">
      <MarqueeRow logos={fillRow(logos.slice(0, Math.ceil(logos.length / 2)))} anim="partners-right" speed={speed} />
      <MarqueeRow logos={fillRow(logos.slice(Math.ceil(logos.length / 2)))} anim="partners-left" speed={speed} />
    </div>
  </div>
)

export default function Partners({ onOpenPage = () => {} }) {
  return (
    <motion.section
      className="partners-section relative flex min-h-screen flex-col items-center justify-center px-6 md:px-16"
    >
      {/* توهجات جانبية */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          style={{ position: 'absolute', top: '5%', left: '-10%', width: '55%', height: '90%', borderRadius: '50%',
            background: 'radial-gradient(ellipse, rgba(26,127,161,0.22) 0%, transparent 65%)', filter: 'var(--fx-blur, blur(100px))' }}
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          style={{ position: 'absolute', top: '15%', right: '-10%', width: '45%', height: '70%', borderRadius: '50%',
            background: 'radial-gradient(ellipse, rgba(18,113,154,0.15) 0%, transparent 65%)', filter: 'var(--fx-blur, blur(100px))' }}
          animate={{ x: [0, -25, 0], y: [0, 20, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="flex w-full flex-col items-center" style={{ zIndex: 1 }}>
        <motion.h2 style={text.sectionTitle} className="mb-3" {...anim.fade(0.07)}>شركاء النجاح</motion.h2>
        <motion.p
          className="mb-12 max-w-2xl text-center text-[15px] leading-loose"
          style={{ color: '#c9dde8', fontWeight: 300 }}
          {...anim.fade(0.12)}
        >
          نفخر بشبكة من الشركاء الذين أسهموا في دعم البرامج وتوسيع الأثر.
        </motion.p>

        {/* سطح المكتب: صفان بلوب لا نهائي في اتجاهين متعاكسين،
            والحواف الجانبية تتلاشى تدريجياً */}
        <TwoRowMarquee className="-mx-6 hidden w-screen md:block md:-mx-16" speed={42} size="86px" />

        {/* الجوال: نفس الصفين بحجم أصغر وسرعة أعلى.
            ‎-mx-6 تلغي حشوة القسم الجانبية فتصل الشعارات لحافتي الشاشة */}
        <TwoRowMarquee className="-mx-6 w-screen md:hidden" speed={26} size="72px" />
      </div>
    </motion.section>
  )
}
