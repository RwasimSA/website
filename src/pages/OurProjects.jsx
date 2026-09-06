import { useState } from 'react'
import { motion } from 'framer-motion'
import { color } from '../theme'
import { text } from '../typography'
import { mapApiProjects, mapApiFilters } from '../data/projects'
import { useApiData } from '../lib/useApiData'
import ProjectCard from '../components/ProjectCard'
import Skeleton from '../components/Skeleton'
import SkeletonSwap from '../components/SkeletonSwap'

const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay },
})

export default function OurProjects({ initialFilter }) {
  const { data: projects, loading } = useApiData('/projects', { map: mapApiProjects, fallback: [] })
  const { data: filters } = useApiData('/categories', { map: mapApiFilters, fallback: ['الكل'] })
  const [activeFilter, setActiveFilter] = useState(initialFilter || 'الكل')
  const shown = activeFilter === 'الكل' ? projects : projects.filter((p) => p.category === activeFilter)

  return (
    <div dir="rtl" className="relative mx-auto w-full max-w-6xl px-6 pb-28 pt-36 md:px-10">
      <div className="mb-10 text-center">
        <motion.p style={{ color: color.copper, fontSize: '14px', fontWeight: 300, letterSpacing: '0.22em', marginBottom: '14px' }} {...rise(0)}>برامجنا وأثرنا</motion.p>
        <motion.h1 style={{ ...text.sectionTitle, fontSize: '34px' }} className="mb-4" {...rise(0.07)}>مشاريعنا</motion.h1>
        <motion.p style={{ color: '#b6ccd6', fontWeight: 300, fontSize: '15px' }} {...rise(0.14)}>مشاريع تقنية تخدم القرآن والسنة وتُعزّز التفاعل معهما.</motion.p>
      </div>

      {/* الفلاتر */}
      <motion.div className="mb-10 flex flex-wrap items-center justify-center gap-2.5" {...rise(0.18)}>
        {filters.map((f) => {
          const active = f === activeFilter
          return (
            <button key={f} onClick={() => setActiveFilter(f)}
              className="rounded-full text-[13px] font-medium transition-colors"
              style={{
                padding: '7px 18px', cursor: 'pointer', color: 'white',
                background: active ? 'linear-gradient(135deg, #ef9122 0%, #c9760f 100%)' : 'rgba(255,255,255,0.06)',
                border: active ? '0.5px solid rgba(239,145,34,0.6)' : '0.5px solid rgba(255,255,255,0.16)',
                backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
              }}>
              {f}
            </button>
          )
        })}
      </motion.div>

      <SkeletonSwap
        loading={loading && projects.length === 0}
        skeleton={(
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} style={{ minHeight: '344px', borderRadius: '18px' }} />
            ))}
          </div>
        )}
      >
        {shown.length === 0 ? (
          <p className="text-center" style={{ color: '#b6ccd6', fontWeight: 300, fontSize: '15px', padding: '40px 0' }}>لا توجد مشاريع في هذا التصنيف حالياً.</p>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {shown.map((p, i) => (
              <ProjectCard key={p.id || p.title} p={p} delay={i * 0.06} layout />
            ))}
          </div>
        )}
      </SkeletonSwap>
    </div>
  )
}
