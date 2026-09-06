import { useRef, useState, useLayoutEffect } from 'react'
import { motion } from 'framer-motion'
import { color } from '../theme'
import { text } from '../typography'

const departments = [
  { name: 'التعليم والأبحاث', items: ['المشاريع العلمية', 'التدريب'] },
  { name: 'التسويق والإعلام', items: ['التسويق الرقمي', 'المحتوى'] },
  { name: 'المشاريع والتقنية', items: ['تطوير المنتجات', 'الدعم التقني'] },
  { name: 'الإدارية والمالية', items: ['المالية', 'الموارد البشرية'] },
  { name: 'فرع مكة المكرمة', items: ['إدارة الفرع'] },
  { name: 'فرع المدينة المنورة', items: ['إدارة الفرع'] },
]

const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay },
})

const LINE = 'rgba(255,255,255,0.24)'

const nodeBase = {
  borderRadius: '18px', textAlign: 'center', position: 'relative', zIndex: 1,
  background: 'linear-gradient(160deg, rgba(255,255,255,0.085) 0%, rgba(255,255,255,0.02) 100%)',
  border: '1px solid rgba(255,255,255,0.1)',
  boxShadow: '0 14px 34px rgba(4,23,32,0.4), inset 0 1px 0 rgba(255,255,255,0.14)',
  backdropFilter: 'blur(22px)', WebkitBackdropFilter: 'blur(22px)',
}
// نمط موحّد لبطاقات القيادة الأربع — نفس الحجم والاستايل
const leadCard = { ...nodeBase, width: '300px', padding: '18px 28px', background: 'linear-gradient(155deg, #175066 0%, #0d2c38 100%)', border: '1px solid rgba(255,255,255,0.18)' }

const Title = ({ children, size = '15px' }) => <div style={{ color: '#fff', fontWeight: 600, fontSize: size }}>{children}</div>
const En = ({ children, c = '#a7c5d6' }) => <div style={{ color: c, fontWeight: 300, fontSize: '11px', letterSpacing: '0.04em', marginTop: '4px' }}>{children}</div>

export default function OrgStructure() {
  const wrapRef = useRef(null)
  const innerRef = useRef(null)
  const gaRef = useRef(null)
  const boardRef = useRef(null)
  const secRef = useRef(null)
  const ceoRef = useRef(null)
  const deptRefs = useRef([])
  const [paths, setPaths] = useState([])
  const [scale, setScale] = useState(1)
  const [boxH, setBoxH] = useState(null)

  useLayoutEffect(() => {
    const compute = () => {
      const inner = innerRef.current
      const wrap = wrapRef.current
      if (!inner || !wrap || !gaRef.current || !ceoRef.current) return
      // نقيس بالأبعاد الطبيعية (بدون أي تحويل) ثم نحسب معامل التصغير ليناسب عرض الشاشة
      inner.style.transform = 'none'
      const naturalW = inner.offsetWidth
      const naturalH = inner.offsetHeight
      const avail = wrap.clientWidth
      const s = Math.min(1, avail / naturalW)
      const base = inner.getBoundingClientRect()
      const rel = (el) => {
        const r = el.getBoundingClientRect()
        return { cx: r.left - base.left + r.width / 2, top: r.top - base.top, bottom: r.bottom - base.top }
      }
      const ga = rel(gaRef.current), bd = rel(boardRef.current), sec = rel(secRef.current), ceo = rel(ceoRef.current)
      const depts = deptRefs.current.filter(Boolean).map(rel)
      const L = []
      // وصلة عمودية (أو مرفقية) بين أسفل الأب وأعلى الابن
      const link = (a, b) => {
        if (Math.abs(a.cx - b.cx) < 0.6) L.push(`M ${a.cx} ${a.bottom} V ${b.top}`)
        else { const m = (a.bottom + b.top) / 2; L.push(`M ${a.cx} ${a.bottom} V ${m} H ${b.cx} V ${b.top}`) }
      }
      link(ga, bd); link(bd, sec); link(sec, ceo)
      if (depts.length) {
        const busY = ceo.bottom + (depts[0].top - ceo.bottom) / 2
        L.push(`M ${ceo.cx} ${ceo.bottom} V ${busY}`)              // نزول من المدير التنفيذي
        const xs = depts.map((d) => d.cx)
        L.push(`M ${Math.min(...xs)} ${busY} H ${Math.max(...xs)}`) // الناقل الأفقي
        depts.forEach((d) => L.push(`M ${d.cx} ${busY} V ${d.top}`)) // نزول لكل إدارة
      }
      // نطبّق التصغير مباشرة لتفادي أي وميض، ثم نحدّث الحالة
      inner.style.transform = s !== 1 ? `scale(${s})` : 'none'
      setPaths(L)
      setScale(s)
      setBoxH(naturalH * s)
    }
    compute()
    const ro = new ResizeObserver(compute)
    if (wrapRef.current) ro.observe(wrapRef.current)
    window.addEventListener('resize', compute)
    const t1 = setTimeout(compute, 200)
    const t2 = setTimeout(compute, 700)
    if (document.fonts?.ready) document.fonts.ready.then(compute)
    return () => { ro.disconnect(); window.removeEventListener('resize', compute); clearTimeout(t1); clearTimeout(t2) }
  }, [])

  return (
    <div dir="rtl" className="relative mx-auto w-full max-w-6xl px-6 pb-28 pt-36 md:px-10">
      <div className="mb-16 text-center">
        <motion.p style={{ color: color.copper, fontSize: '14px', fontWeight: 300, letterSpacing: '0.22em', marginBottom: '14px' }} {...rise(0)}>الحوكمة</motion.p>
        <motion.h1 style={{ ...text.sectionTitle, fontSize: '34px' }} className="mb-4" {...rise(0.07)}>الهيكل التنظيمي</motion.h1>
        <motion.p style={{ color: '#b6ccd6', fontWeight: 300, fontSize: '15px' }} {...rise(0.14)}>البنية التنظيمية لجمعية رواسم وإداراتها وفروعها.</motion.p>
      </div>

      <motion.div ref={wrapRef} className="w-full" style={{ overflow: 'hidden', paddingBottom: '8px', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', height: boxH ? `${boxH}px` : undefined }}
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
        <div ref={innerRef} style={{ position: 'relative', width: 'max-content', transform: scale !== 1 ? `scale(${scale})` : 'none', transformOrigin: 'top center' }}>
          {/* طبقة الموصّلات — مرسومة بدقة من مواقع العُقد */}
          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', overflow: 'visible', zIndex: 0 }}>
            {paths.map((d, i) => (
              <path key={i} d={d} fill="none" stroke={LINE} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            ))}
          </svg>

          {/* العمود القيادي */}
          <div className="flex flex-col items-center" style={{ gap: '52px' }}>
            <div ref={gaRef} style={leadCard}>
              <Title size="16px">الجمعية العمومية</Title><En>General Assembly</En>
            </div>
            <div ref={boardRef} style={leadCard}>
              <Title size="16px">مجلس الإدارة</Title><En>Board of Directors</En>
            </div>
            <div ref={secRef} style={leadCard}>
              <Title size="16px">أمانة المجلس واللجان</Title><En>Board Secretariat</En>
            </div>
            <div ref={ceoRef} style={leadCard}>
              <Title size="16px">المدير التنفيذي</Title><En>Executive Director</En>
            </div>
          </div>

          {/* الإدارات والفروع */}
          <div className="flex justify-center" style={{ gap: '18px', marginTop: '52px' }}>
            {departments.map((d, i) => (
              <div key={d.name} ref={(el) => { deptRefs.current[i] = el }}
                style={{ ...nodeBase, width: '152px', minHeight: '124px', padding: '18px 16px', display: 'flex', flexDirection: 'column', textAlign: 'right' }}>
                <h3 style={{ color: '#fff', fontWeight: 600, fontSize: '14px', textAlign: 'center', marginBottom: '12px' }}>{d.name}</h3>
                <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(239,145,34,0.45), transparent)', marginBottom: '13px' }} />
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '9px', padding: 0, margin: 0, listStyle: 'none' }}>
                  {d.items.map((it) => (
                    <li key={it} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: '8px' }}>
                      <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: color.copper, flexShrink: 0, boxShadow: '0 0 6px rgba(239,145,34,0.6)' }} />
                      <span style={{ color: '#c9dde8', fontWeight: 300, fontSize: '12.5px' }}>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
