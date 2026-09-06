import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { glass } from '../theme'

/* ─────────────────────────────────────────────────────────────
   بطاقات الملفات — بنفس أسلوب بطاقات وثائق موقع البرهان:
   أيقونة مجلد + وسم سنة/«قريباً» + عنوان + وصف + زر تنزيل
   (برتقالي، ومعطّل بشفافية إن لم يُرفع الملف بعد).
   عناصر files: { title, desc?, type?, year?, file?, filename? }
   وعند تمرير types (أكثر من نوع) يظهر فلتر اختيار علوي.
   ───────────────────────────────────────────────────────────── */

const ACCENT = '#ef9122'

const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay },
})

const FolderIcon = ({ size = 54 }) => (
  <img src="/images/glassfolder.svg" alt="" aria-hidden="true" draggable="false"
    style={{ width: `${size}px`, height: `${size}px`, objectFit: 'contain' }} />
)

const DownloadIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
  </svg>
)

const downloadBtn = {
  marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
  padding: '10px 0', borderRadius: '999px', fontSize: '13px', fontWeight: 600, color: '#fff', border: 'none',
  background: 'linear-gradient(135deg, #ef9122 0%, #c9760f 100%)', boxShadow: '0 4px 14px rgba(239,145,34,0.3)', cursor: 'pointer',
}

const chip = {
  color: '#d8c8a4', fontSize: '10px', fontWeight: 500, padding: '3px 10px',
  borderRadius: '999px', background: 'rgba(239,145,34,0.14)', whiteSpace: 'nowrap',
}

/* بطاقة ملف واحدة */
export function FileCard({ d }) {
  return (
    <div style={glass({ padding: '24px 22px', display: 'flex', flexDirection: 'column', minHeight: '210px', height: '100%' })}>
      <div className="mb-4 flex items-start justify-between gap-2">
        <FolderIcon />
        <div className="flex flex-wrap justify-end gap-1.5">
          {d.type && <span style={{ ...chip, color: '#bcd9e6', background: 'rgba(127,184,212,0.14)' }}>{d.type}</span>}
          {d.year
            ? <span style={chip}>{d.year}</span>
            : (!d.file && <span style={chip}>قريباً</span>)}
        </div>
      </div>
      <h3 style={{ color: 'white', fontWeight: 600, fontSize: '15px', lineHeight: 1.55, marginBottom: '8px' }}>{d.title}</h3>
      <p style={{ color: '#8fa6b0', fontWeight: 300, fontSize: '12.5px', lineHeight: 1.8, marginBottom: '20px' }}>
        {d.desc || (d.file ? 'وثيقة رسمية معتمدة.' : 'ستتاح النسخة المعتمدة هنا فور اعتمادها للنشر.')}
      </p>
      {d.file ? (
        <a href={d.file} target="_blank" rel="noopener noreferrer" download={d.filename || undefined} style={downloadBtn}>
          <DownloadIcon /> تنزيل
        </a>
      ) : (
        <button type="button" disabled style={{ ...downloadBtn, opacity: 0.5, cursor: 'not-allowed' }}>
          <DownloadIcon /> تنزيل
        </button>
      )}
    </div>
  )
}

export default function FileCards({ files = [], types = null, emptyNote = 'لا توجد ملفات منشورة في هذا القسم حالياً.' }) {
  const showFilter = Array.isArray(types) && types.length > 1
  const [active, setActive] = useState('الكل')
  const items = !showFilter || active === 'الكل' ? files : files.filter((f) => f.type === active)

  return (
    <div>
      {/* فلتر الأنواع */}
      {showFilter && (
        <motion.div {...rise(0)} className="mb-10 flex flex-wrap items-center justify-center gap-2.5">
          {['الكل', ...types].map((t) => {
            const isActive = active === t
            return (
              <button key={t} type="button" onClick={() => setActive(t)}
                className="cursor-pointer transition-all"
                style={isActive
                  ? { borderRadius: '999px', padding: '9px 22px', border: 'none', color: 'white', fontWeight: 600, fontSize: '13px',
                      background: 'linear-gradient(135deg, #ef9122 0%, #c9760f 100%)', boxShadow: '0 6px 18px rgba(239,145,34,0.35)' }
                  : { ...glass({ borderRadius: '999px', padding: '9px 22px' }), color: '#bcd9e6', fontWeight: 400, fontSize: '13px' }}>
                {t}
              </button>
            )
          })}
        </motion.div>
      )}

      <AnimatePresence mode="wait">
        <motion.div key={active}
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}>
          {items.length === 0 ? (
            <div className="flex flex-col items-center gap-3 py-10 text-center"
              style={glass({ borderRadius: '22px', padding: '48px 28px' })}>
              <FolderIcon size={64} />
              <p style={{ color: '#b6ccd6', fontWeight: 300, fontSize: '15px', margin: 0 }}>{emptyNote}</p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((d, i) => (
                <motion.div key={d.title} {...rise(0.04 * i)} whileHover={{ y: -4, transition: { duration: 0.25 } }}>
                  <FileCard d={d} />
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
