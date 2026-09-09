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

const COLS = 9
const logos = partnersData.logos.map((l) => l.image)

/* خانة شعار — خلفية بيضاء + ظهور تدريجي + طفو خفيف متتابع + تكبير عند المرور */
const LogoCell = ({ src, index }) => {
  const col = index % COLS
  const row = Math.floor(index / COLS)
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.1 + index * 0.012 }}
    >
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: (col * 0.18 + row * 0.12) }}
      >
        <motion.div
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="partner-cell"
          style={{
            borderRadius: '12px', aspectRatio: '1 / 1', display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '14px', background: '#ffffff', border: '0.5px solid rgba(255,255,255,0.6)', cursor: 'pointer',
          }}
        >
          <img src={src} alt="شريك" draggable="false" loading="lazy"
            className="h-full w-full object-contain" />
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

/* خانة شعار للشريط المتحرك على الجوال */
const MarqueeCell = ({ src }) => (
  <div className="partner-cell flex-shrink-0"
    style={{
      width: '96px', height: '96px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '12px', background: '#ffffff', border: '0.5px solid rgba(255,255,255,0.6)',
    }}>
    <img src={src} alt="شريك" draggable="false" loading="lazy" className="h-full w-full object-contain" />
  </div>
)

/* يكرر شعارات السطر حتى تتجاوز عرض أي شاشة (ولو كانت القائمة قصيرة) */
const fillRow = (row) => {
  if (!row.length) return row
  let out = [...row]
  while (out.length < 10) out = [...out, ...row]
  return out
}

/* سطر متحرّك أفقياً بلا نهاية */
const MarqueeRow = ({ logos, anim: animName }) => (
  <div className="overflow-hidden">
    <div className="flex w-max gap-3" style={{ animation: `${animName} 26s linear infinite` }}>
      {[...logos, ...logos].map((src, i) => <MarqueeCell key={i} src={src} />)}
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

        {/* سطح المكتب: شبكة الشعارات */}
        <div className="partners-grid hidden w-full max-w-6xl md:grid" style={{ gap: '12px' }}>
          {logos.map((src, i) => (
            <LogoCell key={i} src={src} index={i} />
          ))}
        </div>

        {/* الجوال: سطران ظاهران دائماً يتحركان باتجاهين متعاكسين بلا نهاية.
            كل سطر يُكرَّر شعاراته حتى يفيض عرضه عن الشاشة مهما قلّ عددها */}
        <div className="flex w-full flex-col gap-3 md:hidden">
          <MarqueeRow logos={fillRow(logos.slice(0, Math.ceil(logos.length / 2)))} anim="partners-right" />
          <MarqueeRow logos={fillRow(logos.slice(Math.ceil(logos.length / 2)))} anim="partners-left" />
        </div>
      </div>
    </motion.section>
  )
}
