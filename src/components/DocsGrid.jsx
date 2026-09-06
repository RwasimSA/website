import { motion } from 'framer-motion'
import { glass, color } from '../theme'
import { text } from '../typography'
import { mapApiDocs } from '../data/governance'
import { useApiData } from '../lib/useApiData'
import Skeleton from './Skeleton'
import SkeletonSwap from './SkeletonSwap'

const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay },
})

const FolderIcon = ({ size = 54 }) => (
  <img src="/images/foldericon.png" alt="" draggable="false" style={{ width: `${size}px`, height: `${size}px`, objectFit: 'contain' }} />
)

export const DownloadIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
)

export const downloadBtn = {
  marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
  padding: '10px 0', borderRadius: '999px', fontSize: '13px', fontWeight: 600, color: '#fff', border: 'none',
  background: 'linear-gradient(135deg, #ef9122 0%, #c9760f 100%)', boxShadow: '0 4px 14px rgba(239,145,34,0.3)', cursor: 'pointer',
}

/* بطاقة وثيقة واحدة — قابل لإعادة الاستخدام */
export function DocCard({ d }) {
  return (
    <div style={glass({ padding: '24px 22px', display: 'flex', flexDirection: 'column', minHeight: '210px' })}>
      <div className="mb-4 flex items-start justify-between">
        <FolderIcon />
        {d.year
          ? <span style={{ color: '#d8c8a4', fontSize: '10px', fontWeight: 500, padding: '3px 10px', borderRadius: '999px', background: 'rgba(239,145,34,0.14)' }}>{d.year}</span>
          : (!d.file && <span style={{ color: '#d8c8a4', fontSize: '10px', fontWeight: 500, padding: '3px 10px', borderRadius: '999px', background: 'rgba(239,145,34,0.14)' }}>قريباً</span>)}
      </div>
      <h3 style={{ color: 'white', fontWeight: 600, fontSize: '15px', lineHeight: 1.55, marginBottom: '8px' }}>{d.title}</h3>
      <p style={{ color: '#8fa6b0', fontWeight: 300, fontSize: '12.5px', marginBottom: '20px' }}>
        {d.description || (d.file ? 'وثيقة رسمية معتمدة.' : 'وثيقة رسمية معتمدة — ستتاح قريباً.')}
      </p>
      {d.file ? (
        <a href={d.file} target="_blank" rel="noopener noreferrer" download={d.filename || undefined} style={downloadBtn}>
          <DownloadIcon /> تنزيل
        </a>
      ) : (
        <button disabled style={{ ...downloadBtn, opacity: 0.5, cursor: 'not-allowed' }}><DownloadIcon /> تنزيل</button>
      )}
    </div>
  )
}

export default function DocsGrid({ eyebrow = 'الحوكمة', title, subtitle, categories }) {
  const cats = categories == null ? null : (Array.isArray(categories) ? categories : [categories])
  const { data: allDocs, loading } = useApiData('/governance/documents', { map: mapApiDocs, fallback: [] })
  const items = cats ? allDocs.filter((d) => cats.includes(d.categorySlug)) : allDocs

  return (
    <div dir="rtl" className="relative mx-auto w-full max-w-6xl px-6 pb-28 pt-36 md:px-10">
      <div className="mb-14 text-center">
        <motion.p style={{ color: color.copper, fontSize: '14px', fontWeight: 300, letterSpacing: '0.22em', marginBottom: '14px' }} {...rise(0)}>{eyebrow}</motion.p>
        <motion.h1 style={{ ...text.sectionTitle, fontSize: '34px' }} className="mb-4" {...rise(0.07)}>{title}</motion.h1>
        <motion.p style={{ color: '#b6ccd6', fontWeight: 300, fontSize: '15px' }} {...rise(0.14)}>{subtitle}</motion.p>
      </div>

      <SkeletonSwap
        loading={loading && items.length === 0}
        skeleton={(
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} style={{ minHeight: '210px', borderRadius: '18px' }} />
            ))}
          </div>
        )}
      >
        {items.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-16 text-center" style={glass({ borderRadius: '20px', padding: '48px 28px' })}>
            <FolderIcon size={64} />
            <p style={{ color: '#b6ccd6', fontWeight: 300, fontSize: '15px' }}>لا توجد وثائق منشورة في هذا القسم حالياً.</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((d, i) => (
              <motion.div key={d.id} {...rise(0.05 * i)} whileHover={{ y: -4, transition: { duration: 0.25 } }}>
                <DocCard d={d} />
              </motion.div>
            ))}
          </div>
        )}
      </SkeletonSwap>
    </div>
  )
}
