import { motion } from 'framer-motion'

/* ─────────────────────────────────────────────────────────────
   كيف نصنع الأثر؟ — رحلة من أربع محطات على «خيط رواسم»:
   خيط الهوية يُرسم متعرجاً من القيم (أزرق) إلى الأثر (برتقالي)،
   وعند المحطة الأخيرة يلتفّ عقدةً كعقدة الشعار.
   ───────────────────────────────────────────────────────────── */

/* التسلسل الرباعي للأثر — يُستخدم حرفياً موحّداً أينما ظهر (قاعدة الخطة) */
export const IMPACT_STEPS = [
  {
    num: '١',
    title: 'نبني بالقيم',
    desc: 'نرسّخ القيم والمعاني التي تشكل وعي المستفيد وشخصيته.',
    accent: '#4db3d4',
  },
  {
    num: '٢',
    title: 'نُمكّن بالمهارات',
    desc: 'ننمي المهارات المناسبة لكل مرحلة عمرية بما يساعد المستفيد على النمو والمشاركة وتحمل المسؤولية.',
    accent: '#2fa7cc',
  },
  {
    num: '٣',
    title: 'نحوّلها إلى ممارسة',
    desc: 'نقدّم تجارب ومواقف وتطبيقات تجعل القيمة والمهارة جزءًا من تجربة المستفيد وسلوكه.',
    accent: '#f4a63f',
  },
  {
    num: '٤',
    title: 'ليصنع أثره',
    desc: 'ينتقل المستفيد من التلقي إلى ممارسة ما تعلمه، والمبادرة، والتأثير في نفسه ومحيطه.',
    accent: '#ef9122',
    final: true,
  },
]

/* محطات الخيط داخل viewBox 1200×520 — من اليمين إلى اليسار
   الأولى قريبة من بداية الخيط والأخيرة قريبة من نهايته */
const stations = [
  { x: 1120, y: 195 }, // نبني بالقيم
  { x: 795,  y: 300 }, // نمكّن بالمهارات
  { x: 470,  y: 200 }, // نحوّلها إلى ممارسة
  { x: 145,  y: 300 }, // ليصنع أثره (العقدة)
]

/* مسار الخيط: بداية قصيرة ثم يمرّ بمراكز المحطات الأربع تماماً،
   وينتهي بتموّج ناعم كبقية المسار */
const THREAD =
  'M 1234 242 ' +
  'C 1178 245, 1164 203, 1120 195 ' +
  'C 1060 120, 940 360, 795 300 ' +
  'C 680 296, 590 140, 470 200 ' +
  'C 400 215, 260 330, 145 300 ' +
  'C 100 295, 65 285, 30 265'

const drawDur = 2.6
const nodeDelay = (i) => 0.5 + i * 0.5

const titleFont = "'TheYearofHandicrafts', 'IBM Plex Sans Arabic', sans-serif"

/* عنوان المحطة الأخيرة بتدرّج لوني (مع حاشية تمنع قصّ الهمزة) */
const gradTextStyle = {
  backgroundImage: 'linear-gradient(100deg, #ffb85c, #ef9122, #f4a63f)',
  WebkitBackgroundClip: 'text', backgroundClip: 'text',
  color: 'transparent', WebkitTextFillColor: 'transparent',
  padding: '0.35em 0.1em', margin: '-0.35em -0.1em', display: 'inline-block',
}

/* ملاحظة: التموضع (التوسيط على مركز المحطة) في غلاف خارجي ثابت،
   والحركة في عنصر داخلي — لأن framer-motion يستبدل transform عند التحريك */
const StepNode = ({ step, i }) => (
  <div style={{
    position: 'absolute',
    left: `${(stations[i].x / 1200) * 100}%`,
    top: `${(stations[i].y / 520) * 100}%`,
    transform: 'translate(-50%, -50%)',
    zIndex: 3,
  }}>
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: nodeDelay(i), duration: 0.5, type: 'spring', bounce: 0.45 }}
      style={{
        width: '58px', height: '58px', borderRadius: '50%',
        display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative',
        background: step.final
          ? 'linear-gradient(135deg, #ef9122 0%, #c9760f 100%)'
          : 'linear-gradient(150deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.05) 100%)',
        backdropFilter: 'blur(14px) saturate(150%)', WebkitBackdropFilter: 'blur(14px) saturate(150%)',
        border: step.final ? '1px solid rgba(255,200,120,0.65)' : '1px solid rgba(255,255,255,0.28)',
        boxShadow: step.final
          ? '0 0 26px rgba(239,145,34,0.65), inset 0 1px 0 rgba(255,255,255,0.35)'
          : `0 0 20px ${step.accent}44, inset 0 1px 0 rgba(255,255,255,0.3)`,
      }}
    >
      {/* نبض ضوئي حول المحطة */}
      <motion.span
        style={{ position: 'absolute', inset: '-9px', borderRadius: '50%', border: `1.5px solid ${step.accent}`, opacity: 0.5 }}
        animate={{ scale: [1, 1.25, 1], opacity: [0.5, 0, 0.5] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut', delay: nodeDelay(i) + 0.4 }}
      />
      <span style={{ fontFamily: titleFont, fontWeight: 700, fontSize: '23px', color: 'white', lineHeight: 1, paddingTop: '4px' }}>
        {step.num}
      </span>
    </motion.div>
  </div>
)

const StepCard = ({ step, i }) => {
  const above = stations[i].y < 260 // المحطة عالية → البطاقة تحتها، والعكس
  return (
    <div style={{
      position: 'absolute',
      left: `${(stations[i].x / 1200) * 100}%`,
      ...(above
        ? { top: `${(stations[i].y / 520) * 100 + 14.5}%` }
        : { bottom: `${100 - (stations[i].y / 520) * 100 + 14.5}%` }),
      transform: 'translateX(-50%)',
      width: 'min(238px, 21vw)',
      zIndex: 2,
    }}>
      <motion.div
        initial={{ opacity: 0, y: above ? -14 : 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: nodeDelay(i) + 0.25, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        style={{ textAlign: 'center' }}
      >
        <h3 style={{ fontFamily: titleFont, fontWeight: 700, fontSize: '22px', color: 'white', margin: '0 0 8px', lineHeight: 1.4 }}>
          {step.final ? <span style={gradTextStyle}>{step.title}</span> : step.title}
        </h3>
        <p style={{ color: '#c9dde8', fontWeight: 300, fontSize: '13px', lineHeight: 1.9, margin: 0 }}>
          {step.desc}
        </p>
      </motion.div>
    </div>
  )
}

export default function ImpactPath() {
  return (
    <motion.section className="relative flex min-h-screen flex-col items-center justify-center px-6 md:px-16">
      {/* خلفية القسم — صورة جمهور الفعالية (المتبادَلة مع الهيرو) مع تظليل بلون الهوية */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <img src="/images/heroback.jpg" alt="" aria-hidden="true" draggable="false"
          className="absolute inset-0 h-full w-full object-cover" />
        <div style={{ position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, rgba(8,38,51,0.88) 0%, rgba(13,58,77,0.74) 40%, rgba(8,38,51,0.8) 72%, rgba(4,23,32,0.94) 100%)' }} />
      </div>

      {/* توهجات جانبية */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          style={{ position: 'absolute', top: '5%', left: '-10%', width: '55%', height: '90%', borderRadius: '50%',
            background: 'radial-gradient(ellipse, rgba(239,145,34,0.10) 0%, transparent 65%)', filter: 'blur(100px)' }}
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          style={{ position: 'absolute', top: '15%', right: '-10%', width: '45%', height: '70%', borderRadius: '50%',
            background: 'radial-gradient(ellipse, rgba(26,127,161,0.2) 0%, transparent 65%)', filter: 'blur(100px)' }}
          animate={{ x: [0, -25, 0], y: [0, 20, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="relative flex w-full flex-col items-center" style={{ zIndex: 1 }}>
        <motion.h2
          className="mb-2 text-white"
          style={{ fontFamily: titleFont, fontWeight: 700, fontSize: 'clamp(30px, 3.4vw, 44px)', lineHeight: 1.3 }}
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          كيف نصنع الأثر؟
        </motion.h2>
        <motion.p
          className="mb-4 text-center text-[15px]"
          style={{ color: '#c9dde8', fontWeight: 300 }}
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          خيط واحد متصل: قيمة تُغرس، فمهارة تُنمّى، فممارسة تُعاش… حتى يُعقد الأثر.
        </motion.p>

        {/* ── سطح المكتب: الخيط الأفقي المتعرج ── */}
        <div className="relative hidden w-full max-w-6xl md:block" style={{ height: '520px' }}>
          {/* الخيط */}
          <svg viewBox="0 0 1200 520" preserveAspectRatio="none"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
            <defs>
              <linearGradient id="threadGrad" x1="100%" y1="0%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#4db3d4" />
                <stop offset="38%" stopColor="#2fa7cc" />
                <stop offset="75%" stopColor="#f4a63f" />
                <stop offset="100%" stopColor="#ef9122" />
              </linearGradient>
            </defs>
            {/* توهج الخيط */}
            <motion.path d={THREAD} fill="none" stroke="url(#threadGrad)" strokeWidth="13"
              strokeLinecap="round" style={{ filter: 'blur(9px)', opacity: 0.35 }}
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ duration: drawDur, delay: 0.3, ease: 'easeInOut' }} />
            {/* الخيط نفسه */}
            <motion.path d={THREAD} fill="none" stroke="url(#threadGrad)" strokeWidth="5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ duration: drawDur, delay: 0.3, ease: 'easeInOut' }} />
          </svg>

          {IMPACT_STEPS.map((s, i) => <StepNode key={i} step={s} i={i} />)}
          {IMPACT_STEPS.map((s, i) => <StepCard key={i} step={s} i={i} />)}
        </div>

        {/* ── الجوال: خيط عمودي تُعلَّق عليه بطاقات زجاجية ── */}
        <div className="relative mt-8 flex w-full max-w-md flex-col gap-7 md:hidden" style={{ paddingBottom: '6px' }}>
          {IMPACT_STEPS.map((s, i) => (
            <motion.div key={i} className="relative flex items-stretch gap-3.5"
              initial={{ opacity: 0, x: -22 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35 + i * 0.22, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}>

              {/* عقدة الرقم + مقطع الخيط نحو العقدة التالية */}
              <div className="flex flex-shrink-0 flex-col items-center" style={{ width: '52px', zIndex: 1 }}>
                {i < IMPACT_STEPS.length - 1 && (
                  <motion.span aria-hidden="true"
                    className="absolute"
                    style={{ top: '26px', bottom: '-54px', right: '24.5px', width: '3px', borderRadius: '3px',
                      transformOrigin: 'top', zIndex: -1,
                      background: `linear-gradient(180deg, ${s.accent}, ${IMPACT_STEPS[i + 1].accent})`,
                      boxShadow: `0 0 10px ${s.accent}55` }}
                    initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
                    transition={{ duration: 0.55, delay: 0.5 + i * 0.22, ease: 'easeInOut' }}
                  />
                )}
                <motion.div
                  initial={{ scale: 0 }} animate={{ scale: 1 }}
                  transition={{ delay: 0.4 + i * 0.22, type: 'spring', stiffness: 260, damping: 17 }}
                  style={{
                    width: '52px', height: '52px', borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: s.final
                      ? 'linear-gradient(135deg, #ef9122 0%, #c9760f 100%)'
                      : 'rgba(10,42,56,0.75)',
                    backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
                    border: s.final ? '1.5px solid rgba(255,200,120,0.7)' : `1.5px solid ${s.accent}88`,
                    boxShadow: s.final ? '0 0 24px rgba(239,145,34,0.6)' : `0 0 16px ${s.accent}55`,
                  }}>
                  <span style={{ fontFamily: titleFont, fontWeight: 700, fontSize: '21px', color: 'white', paddingTop: '4px' }}>{s.num}</span>
                </motion.div>
              </div>

              {/* بطاقة المحطة */}
              <div className="relative flex-1 overflow-hidden"
                style={{
                  borderRadius: '20px', padding: '16px 18px 17px',
                  background: s.final
                    ? 'linear-gradient(150deg, rgba(239,145,34,0.16) 0%, rgba(255,255,255,0.05) 55%, rgba(239,145,34,0.08) 100%)'
                    : 'linear-gradient(150deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.035) 55%, rgba(255,255,255,0.06) 100%)',
                  backdropFilter: 'blur(18px) saturate(150%)', WebkitBackdropFilter: 'blur(18px) saturate(150%)',
                  border: s.final ? '1px solid rgba(239,145,34,0.45)' : '1px solid rgba(255,255,255,0.18)',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.2), 0 12px 28px rgba(3,15,21,0.28)',
                }}>
                {/* خيط لوني علوي بلون المحطة */}
                <span aria-hidden="true" style={{ position: 'absolute', top: 0, insetInline: '16%', height: '2px',
                  background: `linear-gradient(90deg, transparent, ${s.accent}, transparent)` }} />
                {/* رقم شبحي في الزاوية */}
                <span aria-hidden="true" style={{ position: 'absolute', top: '-16px', left: '-4px', fontFamily: titleFont, fontWeight: 700,
                  fontSize: '72px', lineHeight: 1, color: s.final ? 'rgba(239,145,34,0.12)' : 'rgba(255,255,255,0.05)', userSelect: 'none' }}>
                  {s.num}
                </span>
                <h3 style={{ position: 'relative', fontFamily: titleFont, fontWeight: 700, fontSize: '19px', color: 'white', margin: '0 0 6px' }}>
                  {s.final ? <span style={gradTextStyle}>{s.title}</span> : s.title}
                </h3>
                <p style={{ position: 'relative', color: '#c9dde8', fontWeight: 300, fontSize: '13px', lineHeight: 1.9, margin: 0 }}>{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
