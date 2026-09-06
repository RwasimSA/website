import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { mapApiProjects, mapApiFilters } from '../data/projects'
import { useApiData } from '../lib/useApiData'
import ProjectCard from '../components/ProjectCard'
import Skeleton from '../components/Skeleton'
import SkeletonSwap from '../components/SkeletonSwap'

/* نفس النمط الزجاجي المستخدم في قسم مسارات العمل */
const cardBase = {
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  borderRadius: '18px',
  position: 'relative',
  overflow: 'hidden',
}

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
})

const ArrowButton = ({ onClick, direction }) => (
  <motion.button
    onClick={onClick}
    whileHover={{ scale: 1.08, background: 'linear-gradient(145deg, rgba(255,255,255,0.20) 0%, rgba(255,255,255,0.08) 100%)' }}
    whileTap={{ scale: 0.94 }}
    style={{
      width: '52px', height: '52px', borderRadius: '50%',
      display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
      ...cardBase,
      background: 'linear-gradient(145deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 100%)',
      border: '0.5px solid rgba(255,255,255,0.20)',
      borderTop: '0.5px solid rgba(255,255,255,0.32)',
    }}
  >
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      {direction === 'right'
        ? <polyline points="9 6 15 12 9 18" />
        : <polyline points="15 6 9 12 15 18" />}
    </svg>
  </motion.button>
)

export default function Projects({ onOpenPage }) {
  const scrollRef = useRef(null)
  // start = الوصول للبداية (الحافة اليمنى في RTL) ، end = الوصول لآخر بطاقة (الحافة اليسرى)
  const [edges, setEdges] = useState({ start: true, end: false })
  const { data: projects, loading } = useApiData('/projects', { map: mapApiProjects, fallback: [] })
  const { data: filters } = useApiData('/categories', { map: mapApiFilters, fallback: ['الكل'] })
  const [activeFilter, setActiveFilter] = useState('الكل')
  const shown = activeFilter === 'الكل' ? projects : projects.filter((p) => p.category === activeFilter)

  const updateEdges = () => {
    const el = scrollRef.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    const pos = Math.abs(el.scrollLeft)
    setEdges({ start: pos <= 4, end: max <= 4 || pos >= max - 4 })
  }

  useEffect(() => {
    updateEdges()
    window.addEventListener('resize', updateEdges)
    return () => window.removeEventListener('resize', updateEdges)
  }, [])

  useEffect(() => {
    scrollRef.current?.scrollTo({ left: 0 })
    updateEdges()
  }, [activeFilter])

  const scrollByCards = (dir) => {
    const el = scrollRef.current
    if (!el) return
    const card = el.querySelector('[data-card]')
    const step = card ? card.getBoundingClientRect().width + 20 : 320 // عرض البطاقة + الفجوة
    el.scrollBy({ left: dir * step, behavior: 'smooth' })
  }

  // تلاشٍ على الطرف الذي لا يزال خلفه محتوى مخفي
  const fadeRight = !edges.start  // الحافة اليمنى = جهة البداية
  const fadeLeft = !edges.end     // الحافة اليسرى = جهة النهاية
  const maskImage = `linear-gradient(to right, transparent 0, #000 ${fadeLeft ? '56px' : '0px'}, #000 ${fadeRight ? 'calc(100% - 56px)' : '100%'}, transparent 100%)`

  return (
    <motion.section
      className="relative flex min-h-screen flex-col items-center justify-center px-6 md:px-16"
    >
      {/* توهجات جانبية — مطابقة لقسم مسارات العمل */}
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
        <motion.h2 className="mb-8 text-white" style={{ fontFamily: "'TheYearofHandicrafts', 'IBM Plex Sans Arabic', sans-serif", fontWeight: 700, fontSize: 'clamp(30px, 3.4vw, 44px)', lineHeight: 1.3 }} {...fade(0.07)}>
          مشاريع تخدم القرآن والسنة
        </motion.h2>

        {/* الفلاتر */}
        <motion.div className="mb-9 flex flex-wrap items-center justify-center gap-2.5" {...fade(0.1)}>
          {filters.map((f) => {
            const active = f === activeFilter
            return (
              <button
                key={f}
                onClick={() => onOpenPage ? onOpenPage(f === 'الكل' ? 'projects' : 'projects:' + f) : setActiveFilter(f)}
                className="rounded-full text-[13px] font-medium transition-all"
                style={{
                  padding: '7px 18px', cursor: 'pointer', color: 'white',
                  background: active ? 'linear-gradient(135deg, #ef9122 0%, #c9760f 100%)' : 'rgba(255,255,255,0.06)',
                  border: active ? '0.5px solid rgba(239,145,34,0.6)' : '0.5px solid rgba(255,255,255,0.16)',
                  backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
                }}
              >
                {f}
              </button>
            )
          })}
        </motion.div>

        {/* شريط السكرول الأفقي */}
        <motion.div
          ref={scrollRef}
          onScroll={updateEdges}
          className="projects-scroll hide-scrollbar w-full max-w-6xl overflow-x-auto"
          style={{ scrollSnapType: 'x mandatory', maskImage, WebkitMaskImage: maskImage }}
        >
          <SkeletonSwap
            loading={loading && projects.length === 0}
            className="flex gap-5"
            style={{ paddingInline: '2px', paddingTop: '12px', paddingBottom: '12px' }}
            skeleton={Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} style={{ flex: '0 0 auto', width: '300px', minHeight: '344px', borderRadius: '18px' }} />
            ))}
          >
            {shown.map((p, i) => (
              <ProjectCard key={i} p={p} delay={i * 0.13}
                wrapperStyle={{ flex: '0 0 auto', width: '300px', scrollSnapAlign: 'start' }} />
            ))}
          </SkeletonSwap>
        </motion.div>

        {/* أسهم التنقّل تحت القسم */}
        <motion.div className="mt-10 flex items-center justify-center gap-4" {...fade(0.2)}>
          <ArrowButton direction="right" onClick={() => scrollByCards(1)} />
          <ArrowButton direction="left" onClick={() => scrollByCards(-1)} />
        </motion.div>
      </div>
    </motion.section>
  )
}
