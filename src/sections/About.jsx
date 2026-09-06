import { motion } from 'framer-motion'

const cardBase = {
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  borderRadius: '18px',
  position: 'relative',
  overflow: 'hidden',
}

const cardHover = {
  whileHover: {
    y: -4,
    transition: { duration: 0.25, ease: 'easeOut' },
  },
}

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
})

/* ── باترنات SVG ── */

const PatternCircuit = () => (
  <motion.div
    style={{ position: 'absolute', inset: 0, maskImage: 'linear-gradient(to bottom, black 0%, transparent 72%)', WebkitMaskImage: 'linear-gradient(to bottom, black 0%, transparent 72%)' }}
    animate={{ x: [0, 6, 0], y: [0, -5, 0] }}
    transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
  >
    <svg style={{ width: '100%', height: '100%', opacity: 0.08 }}
      viewBox="0 0 320 420" fill="none" preserveAspectRatio="xMidYMid slice">
      <path d="M20 60 H100 V140 H220 V80 H290" stroke="white" strokeWidth="1"/>
      <path d="M60 180 H140 V240 H60 V310 H200 V360" stroke="white" strokeWidth="1"/>
      <path d="M180 40 V120 H260 V200 H180 V280 H290" stroke="white" strokeWidth="1"/>
      <path d="M20 320 H90 V380" stroke="white" strokeWidth="1"/>
      <circle cx="100" cy="60"  r="3.5" fill="white" style={{animation:'nodeBlink 2.2s ease-in-out infinite 0.0s'}}/>
      <circle cx="220" cy="140" r="3.5" fill="white" style={{animation:'nodeBlink 2.2s ease-in-out infinite 0.5s'}}/>
      <circle cx="140" cy="180" r="3.5" fill="white" style={{animation:'nodeBlink 2.2s ease-in-out infinite 1.0s'}}/>
      <circle cx="200" cy="310" r="3.5" fill="white" style={{animation:'nodeBlink 2.2s ease-in-out infinite 1.5s'}}/>
      <circle cx="260" cy="120" r="3.5" fill="white" style={{animation:'nodeBlink 2.2s ease-in-out infinite 0.8s'}}/>
      <circle cx="180" cy="280" r="3.5" fill="white" style={{animation:'nodeBlink 2.2s ease-in-out infinite 1.3s'}}/>
      <rect x="36"  y="48"  width="24" height="24" rx="3" stroke="white" strokeWidth="0.8"/>
      <rect x="268" y="68"  width="20" height="20" rx="3" stroke="white" strokeWidth="0.8"/>
      <rect x="168" y="268" width="22" height="22" rx="3" stroke="white" strokeWidth="0.8"/>
    </svg>
  </motion.div>
)

const PatternWaves = () => (
  <motion.div
    style={{ position: 'absolute', inset: 0, maskImage: 'linear-gradient(to bottom, black 0%, transparent 72%)', WebkitMaskImage: 'linear-gradient(to bottom, black 0%, transparent 72%)' }}
    animate={{ x: [0, -8, 0] }}
    transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
  >
    <svg style={{ width: '100%', height: '100%', opacity: 0.08 }}
      viewBox="0 0 240 200" fill="none" preserveAspectRatio="xMidYMid slice">
      {[40, 70, 100, 130, 160].map((y, i) => (
        <path key={i}
          d={`M-20 ${y} Q30 ${y-20} 80 ${y} Q130 ${y+20} 180 ${y} Q230 ${y-20} 280 ${y}`}
          stroke="white" strokeWidth="1"/>
      ))}
      {[[80,40],[80,70],[80,100],[180,40],[180,100],[180,160]].map(([cx,cy],i)=>(
        <circle key={i} cx={cx} cy={cy} r="2.5" fill="white"
          style={{animation:`nodeBlink 2.4s ease-in-out infinite ${i*0.4}s`}}/>
      ))}
    </svg>
  </motion.div>
)

const PatternHex = () => (
  <motion.div
    style={{ position: 'absolute', inset: 0, maskImage: 'linear-gradient(to bottom, black 0%, transparent 72%)', WebkitMaskImage: 'linear-gradient(to bottom, black 0%, transparent 72%)' }}
    animate={{ rotate: [0, 3, 0, -3, 0] }}
    transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
  >
    <svg style={{ width: '100%', height: '100%', opacity: 0.08 }}
      viewBox="0 0 240 200" fill="none" preserveAspectRatio="xMidYMid slice">
      {[[60,50],[120,50],[180,50],[90,96],[150,96],[60,142],[120,142],[180,142]].map(([cx,cy],i)=>(
        <polygon key={i}
          points={`${cx},${cy-24} ${cx+21},${cy-12} ${cx+21},${cy+12} ${cx},${cy+24} ${cx-21},${cy+12} ${cx-21},${cy-12}`}
          stroke="white" strokeWidth="0.9" fill="none"/>
      ))}
    </svg>
  </motion.div>
)

const PatternBars = () => (
  <motion.div
    style={{ position: 'absolute', inset: 0, maskImage: 'linear-gradient(to bottom, black 0%, transparent 72%)', WebkitMaskImage: 'linear-gradient(to bottom, black 0%, transparent 72%)' }}
    animate={{ y: [0, -5, 0] }}
    transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
  >
    <svg style={{ width: '100%', height: '100%', opacity: 0.08 }}
      viewBox="0 0 240 200" fill="none" preserveAspectRatio="xMidYMid slice">
      {[[30,110,60],[68,80,90],[106,50,120],[144,65,105],[182,35,135]].map(([x,y,h],i)=>(
        <rect key={i} x={x} y={y} width="22" height={h} rx="3" stroke="white" strokeWidth="1"/>
      ))}
      <polyline points="41,108 79,78 117,48 155,63 193,33"
        stroke="white" strokeWidth="1" fill="none" strokeDasharray="4 3"/>
      {[[41,108],[79,78],[117,48],[155,63],[193,33]].map(([cx,cy],i)=>(
        <circle key={i} cx={cx} cy={cy} r="3" fill="white"
          style={{animation:`nodeBlink 2.0s ease-in-out infinite ${i*0.35}s`}}/>
      ))}
    </svg>
  </motion.div>
)

const PatternDots = () => (
  <motion.div
    style={{ position: 'absolute', inset: 0, maskImage: 'linear-gradient(to bottom, black 0%, transparent 72%)', WebkitMaskImage: 'linear-gradient(to bottom, black 0%, transparent 72%)' }}
    animate={{ opacity: [0.07, 0.12, 0.07] }}
    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
  >
    <svg style={{ width: '100%', height: '100%' }}
      viewBox="0 0 240 200" fill="none" preserveAspectRatio="xMidYMid slice">
      {Array.from({ length: 8 }, (_, row) =>
        Array.from({ length: 10 }, (_, col) => (
          <circle key={`${row}-${col}`} cx={20 + col * 24} cy={20 + row * 22} r="1.8" fill="white"
            style={{animation:`nodeBlink ${2 + ((row*10+col)*0.13)%1.5}s ease-in-out infinite ${((row*3+col*7)*0.11)%2}s`}}/>
        ))
      )}
    </svg>
  </motion.div>
)

/* توهج داخلي يتنفس داخل كل بطاقة */
const CardGlow = ({ color }) => (
  <motion.div
    style={{
      position: 'absolute', top: '-30%', right: '-20%',
      width: '70%', height: '70%', borderRadius: '50%',
      background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
      filter: 'blur(40px)', pointerEvents: 'none',
    }}
    animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.15, 1] }}
    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
  />
)

const cards = [
  { axis: 'المسار الأول',  title: 'تطوير منتجات ذكية', desc: 'منتجات رقمية قرآنية تعتمد الذكاء الاصطناعي لتجارب تفاعلية ذكية وموثوقة.',           Pattern: PatternCircuit, glowColor: 'rgba(100,160,255,0.14)' },
  { axis: 'المسار الثاني', title: 'التمكين والتدريب',   desc: 'تأسيس مجتمعات قرآنية رقمية وتمكين أفرادها من التفاعل التقني مع القرآن والسنة.', Pattern: PatternWaves,   glowColor: 'rgba(80,180,215,0.14)' },
  { axis: 'المسار الثالث', title: 'المعايير والجودة',   desc: 'أطر رقمية معتمدة تضبط جودة المبادرات القرآنية محتوىً وامتثالاً.',                  Pattern: PatternHex,     glowColor: 'rgba(255,200,100,0.12)' },
  { axis: 'المسار الرابع', title: 'نماذج الأعمال',      desc: 'نماذج مرنة تحقق الاستدامة والأثر مع تقليص التبعية للمنح.',                         Pattern: PatternBars,    glowColor: 'rgba(100,220,160,0.12)' },
]

const cardStyle = (extra = {}) => ({
  ...cardBase,
  background: 'linear-gradient(145deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)',
  border: '0.5px solid rgba(255,255,255,0.12)',
  borderTop: '0.5px solid rgba(255,255,255,0.20)',
  ...extra,
})

export default function About({ onOpenPage = () => {} }) {
  return (
    <motion.section
      className="relative flex min-h-screen flex-col items-center justify-center px-6 md:px-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
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

      {/* المحتوى الرئيسي */}
      <div className="flex w-full flex-col items-center">
        <motion.p style={{ color:'#ef9122', fontSize:'18px', fontWeight:300, letterSpacing:'0.20em', marginBottom:'10px' }} {...fade(0)}>
          مسارات العمل
        </motion.p>
        <motion.h2 className="mb-10 text-2xl font-semibold text-white" {...fade(0.07)}>
          التوجهات الاستراتيجية
        </motion.h2>

      {/* شبكة البنتو */}
      <div className="about-bento w-full max-w-5xl"
        style={{ display:'grid', gridTemplateColumns:'2fr 1fr 1fr', gridTemplateRows:'1fr 1fr', gap:'16px' }}
      >
        {/* بطاقة كبيرة */}
        <motion.div {...fade(0.12)} {...cardHover} className="about-feature"
          style={cardStyle({ gridRow:'1/3', padding:'22px', minHeight:'416px', display:'flex', flexDirection:'column', justifyContent:'flex-end' })}
        >
          <CardGlow color={cards[0].glowColor} />
          <PatternCircuit />
          <div style={{ position:'relative', zIndex:1 }}>
            <p style={{ color:'#ef9122', fontWeight:300, fontSize:'12px', letterSpacing:'0.14em', marginBottom:'8px' }}>{cards[0].axis}</p>
            <h3 style={{ color:'white', fontWeight:600, fontSize:'18px', marginBottom:'10px' }}>{cards[0].title}</h3>
            <p style={{ color:'#b6ccd6', fontWeight:300, fontSize:'14px', lineHeight:1.7, margin:0,
              display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden' }}>{cards[0].desc}</p>
          </div>
        </motion.div>

        {/* بطاقات صغيرة */}
        {cards.slice(1).map((c, i) => (
          <motion.div key={i} {...fade(0.18 + i * 0.06)} {...cardHover}
            style={cardStyle({ padding:'18px', minHeight:'200px', display:'flex', flexDirection:'column', justifyContent:'flex-end' })}
          >
            <CardGlow color={c.glowColor} />
            <c.Pattern />
            <div style={{ position:'relative', zIndex:1 }}>
              <p style={{ color:'#ef9122', fontWeight:300, fontSize:'12px', letterSpacing:'0.12em', marginBottom:'5px' }}>{c.axis}</p>
              <h3 style={{ color:'white', fontWeight:600, fontSize:'18px', marginBottom:'5px' }}>{c.title}</h3>
              <p style={{ color:'#b6ccd6', fontWeight:300, fontSize:'14px', lineHeight:1.6, margin:0,
                display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden' }}>{c.desc}</p>
            </div>
          </motion.div>
        ))}

        {/* بطاقة CTA */}
        <motion.div {...fade(0.36)} {...cardHover} className="about-cta"
          style={cardStyle({ padding:'18px', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', textAlign:'center',
            background:'linear-gradient(145deg, rgba(239,145,34,0.30) 0%, rgba(190,112,16,0.16) 55%, rgba(239,145,34,0.06) 100%)',
            border:'0.5px solid rgba(239,145,34,0.30)',
            borderTop:'0.5px solid rgba(255,195,120,0.40)' })}
        >
          <PatternDots />
          <div className="cta-inner" style={{ position:'relative', zIndex:1 }}>
            <p style={{ color:'#b6ccd6', fontWeight:300, fontSize:'14px', marginBottom:'14px' }}>هل أنت مهتم بالتعاون؟</p>
            <motion.button
              className="cta-btn flex items-center gap-3"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              style={{
                borderRadius: '999px', padding: '7px 22px 7px 7px',
                background: 'linear-gradient(135deg, rgba(13,58,77,0.55) 0%, rgba(8,38,51,0.55) 100%)',
                backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
                border: '0.5px solid rgba(255,255,255,0.16)', cursor: 'pointer',
              }}
            >
              <span className="cta-label" style={{ color: 'white', fontWeight: 500, fontSize: '14px' }}>تواصل معنا</span>
              <span className="cta-icon" style={{ width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                background: 'linear-gradient(135deg, #ef9122 0%, #c9760f 100%)', boxShadow: '0 0 16px rgba(239,145,34,0.5)' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 5 12 12 19" />
                </svg>
              </span>
            </motion.button>
          </div>
        </motion.div>
      </div>

        {/* زر الانتقال لصفحة التوجّه الاستراتيجي — بنمط زر الهيرو */}
        <motion.button
          onClick={() => onOpenPage('strategic')}
          {...fade(0.42)}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.98 }}
          className="relative mt-12 flex items-center gap-3.5"
          style={{
            borderRadius: '999px', padding: '8px 26px 8px 8px',
            background: 'linear-gradient(135deg, rgba(13,58,77,0.6) 0%, rgba(8,38,51,0.6) 100%)',
            backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
            border: '0.5px solid rgba(255,255,255,0.16)', cursor: 'pointer',
          }}
        >
          <span style={{ color: 'white', fontWeight: 500, fontSize: '15px' }}>التوجّه الاستراتيجي</span>
          <span style={{ width: '46px', height: '46px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'linear-gradient(135deg, #ef9122 0%, #c9760f 100%)', boxShadow: '0 0 18px rgba(239,145,34,0.55)' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 5 12 12 19" />
            </svg>
          </span>
        </motion.button>
      </div>{/* نهاية المحتوى الرئيسي */}

    </motion.section>
  )
}
