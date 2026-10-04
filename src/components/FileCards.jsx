import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { glass } from '../theme'

/* ─────────────────────────────────────────────────────────────
   بطاقات الملفات — أسلوب موحد لوثائق الموقع:
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
  padding: '10px 0', borderRadius: '999px', fontSize: '13px', fontWeight: 600, color: 'var(--on-accent)', border: 'none',
  background: 'linear-gradient(135deg, #ef9122 0%, #c9760f 100%)', boxShadow: '0 4px 14px rgba(239,145,34,0.3)', cursor: 'pointer',
}

const chip = {
  color: 'var(--gold)', fontSize: '10px', fontWeight: 500, padding: '3px 10px',
  borderRadius: '999px', background: 'rgba(239,145,34,0.14)', whiteSpace: 'nowrap',
}

/* ═══ مشاركة ملف برابط مباشر ═══
   لكل ملف معرّف ثابت من مسار رفعه (مجلد فريد لكل ملف في التخزين)،
   والرابط ‎/<الصفحة>?file=<المعرّف> يفتح الصفحة ونافذة الملف فوقها */
export const fileId = (d) => {
  const m = String(d?.file || '').match(/\/files\/([^/]+)\//)
  if (m) return m[1]
  return String(d?.title || '').trim().replace(/\s+/g, '-').replace(/[^\w؀-ۿ-]/g, '').slice(0, 60)
}

const shareUrl = (d) => `${window.location.origin}${window.location.pathname}?file=${encodeURIComponent(fileId(d))}`

/* نوع الملف من امتداده — يحدد الأيقونة الكبيرة وزر الفتح أو التنزيل */
const KINDS = {
  pdf:   { label: 'PDF',    color: '#E95642', view: true },
  doc:   { label: 'Word',   color: '#61A2BC', view: false },
  sheet: { label: 'Excel',  color: '#336E7C', view: false },
  slide: { label: 'عرض',    color: '#EF9122', view: false },
  image: { label: 'صورة',   color: '#7BB8AB', view: true },
  zip:   { label: 'مضغوط',  color: '#0E4156', view: false },
  file:  { label: 'ملف',    color: '#336E7C', view: false },
}
const kindOf = (url = '') => {
  const ext = (String(url).split('?')[0].split('.').pop() || '').toLowerCase()
  if (ext === 'pdf') return 'pdf'
  if (['doc', 'docx', 'odt', 'rtf'].includes(ext)) return 'doc'
  if (['xls', 'xlsx', 'csv', 'ods'].includes(ext)) return 'sheet'
  if (['ppt', 'pptx', 'key', 'odp'].includes(ext)) return 'slide'
  if (['png', 'jpg', 'jpeg', 'webp', 'gif', 'svg'].includes(ext)) return 'image'
  if (['zip', 'rar', '7z'].includes(ext)) return 'zip'
  return 'file'
}

const ShareIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
    <line x1="8.6" y1="13.5" x2="15.4" y2="17.5" /><line x1="15.4" y1="6.5" x2="8.6" y2="10.5" />
  </svg>
)

/* نسخ رابط الملف — وعلى الجوال تُفتح قائمة المشاركة في النظام */
async function shareFile(d) {
  const url = shareUrl(d)
  try {
    if (navigator.share && window.matchMedia?.('(pointer: coarse)').matches) {
      await navigator.share({ title: d.title, url })
      return 'shared'
    }
  } catch { return null }
  try { await navigator.clipboard.writeText(url); return 'copied' } catch { /* متصفح يمنع الحافظة */ }
  window.prompt('انسخ رابط الملف:', url)
  return 'copied'
}

/* نافذة الملف المشارَك */
function FileModal({ d, onClose }) {
  const kind = kindOf(d.file)
  const k = KINDS[kind] || KINDS.file
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <motion.div className="fixed inset-0 flex items-center justify-center p-5" style={{ zIndex: 150 }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.22 }}
      role="dialog" aria-modal="true" aria-label={d.title}>
      <div className="absolute inset-0" onClick={onClose}
        style={{ background: 'rgba(4,23,32,0.62)', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)' }} />
      <motion.div className="relative w-full max-w-md text-center"
        initial={{ y: 26, scale: 0.96 }} animate={{ y: 0, scale: 1 }} exit={{ y: 16, scale: 0.97 }}
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        style={{ borderRadius: '28px', padding: '34px 28px 28px', background: 'var(--panel)',
          border: '1px solid var(--line)', boxShadow: '0 30px 80px rgba(3,15,21,0.45)' }}>
        <button type="button" onClick={onClose} aria-label="إغلاق"
          className="absolute flex h-9 w-9 cursor-pointer items-center justify-center rounded-full"
          style={{ top: '14px', left: '14px', background: 'var(--glass-a)', border: '1px solid var(--line)', color: 'var(--ink)' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12" /></svg>
        </button>

        {/* أيقونة المجلد نفسها التي على بطاقات الملفات — بحجم كبير، ونوع الملف تحتها */}
        <div className="mb-4 flex flex-col items-center gap-2">
          <FolderIcon size={112} />
          <span style={{ fontSize: '11px', fontWeight: 700, color: '#fff', background: k.color, borderRadius: '999px', padding: '3px 12px' }}>{k.label}</span>
        </div>
        {d.type && <span className="mb-2 inline-block" style={{ color: 'var(--accent-text)', fontWeight: 600, fontSize: '12.5px' }}>{d.type}{d.year ? ` · ${d.year}` : ''}</span>}
        <h2 style={{ color: 'var(--ink)', fontWeight: 700, fontSize: '19px', lineHeight: 1.6, margin: '0 0 10px' }}>{d.title}</h2>
        <p style={{ color: 'var(--ink-2)', fontWeight: 300, fontSize: '13.5px', lineHeight: 1.95, margin: '0 0 24px' }}>
          {d.desc ? `${d.desc} ` : ''}
          {d.file
            ? (k.view ? 'يمكنك عرض الملف مباشرة في المتصفح، أو تنزيله للاحتفاظ بنسخة على جهازك.' : 'نزّل الملف لفتحه بالتطبيق المناسب على جهازك.')
            : 'ستتاح النسخة المعتمدة من هذا الملف هنا فور اعتمادها للنشر.'}
        </p>

        {d.file && (
          <div className="flex flex-col gap-2.5">
            {k.view && (
              <a href={d.file} target="_blank" rel="noopener noreferrer" style={{ ...downloadBtn, marginTop: 0, padding: '12px 0', fontSize: '14px' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                فتح الملف
              </a>
            )}
            <a href={d.file} download={d.filename || ''} target={k.view ? undefined : '_blank'} rel="noopener noreferrer"
              style={k.view
                ? { ...downloadBtn, marginTop: 0, padding: '11px 0', fontSize: '13.5px', background: 'var(--glass-a)', color: 'var(--ink)', border: '1px solid var(--line)', boxShadow: 'none' }
                : { ...downloadBtn, marginTop: 0, padding: '12px 0', fontSize: '14px' }}>
              <DownloadIcon /> تنزيل الملف
            </a>
          </div>
        )}
        <p style={{ color: 'var(--muted)', fontWeight: 300, fontSize: '11.5px', margin: '18px 0 0' }}>جمعية رواسم لتنمية الطفل</p>
      </motion.div>
    </motion.div>
  )
}

/* بطاقة ملف واحدة */
export function FileCard({ d }) {
  const [note, setNote] = useState('')
  const onShare = async (e) => {
    e.stopPropagation()
    const r = await shareFile(d)
    if (r === 'copied') { setNote('نُسخ الرابط'); setTimeout(() => setNote(''), 2200) }
  }
  return (
    <div style={glass({ padding: '24px 22px', display: 'flex', flexDirection: 'column', minHeight: '210px', height: '100%' })}>
      <div className="mb-4 flex items-start justify-between gap-2">
        <FolderIcon />
        <div className="flex flex-wrap items-center justify-end gap-1.5">
          {d.file && (
            <button type="button" onClick={onShare} title="مشاركة رابط الملف" aria-label="مشاركة رابط الملف"
              className="file-share flex cursor-pointer items-center gap-1.5"
              style={{ ...chip, color: 'var(--ink-3)', background: 'var(--glass-a)', border: '1px solid var(--line)', padding: '4px 10px', fontSize: '11px' }}>
              <ShareIcon />{note || 'مشاركة'}
            </button>
          )}
          {d.type && <span style={{ ...chip, color: 'var(--ink-3)', background: 'rgba(127,184,212,0.14)' }}>{d.type}</span>}
          {d.year
            ? <span style={chip}>{d.year}</span>
            : (!d.file && <span style={chip}>قريباً</span>)}
        </div>
      </div>
      <h3 style={{ color: 'var(--ink)', fontWeight: 600, fontSize: '15px', lineHeight: 1.55, marginBottom: '8px' }}>{d.title}</h3>
      <p style={{ color: 'var(--muted)', fontWeight: 300, fontSize: '12.5px', lineHeight: 1.8, marginBottom: '20px' }}>
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
  /* رابط مشاركة ‎?file=… يفتح نافذة الملف فوق الصفحة */
  const [shared, setShared] = useState(null)
  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get('file')
    if (!id) return
    const hit = files.find((f) => fileId(f) === id)
    if (hit) setShared(hit)
  }, [files])
  const closeShared = () => {
    setShared(null)
    /* إزالة المعرّف من العنوان حتى لا تعود النافذة عند التحديث */
    const u = new URL(window.location.href)
    u.searchParams.delete('file')
    window.history.replaceState(window.history.state, '', u.pathname + u.search + u.hash)
  }
  const items = !showFilter || active === 'الكل' ? files : files.filter((f) => f.type === active)

  return (
    <div>
      {/* النافذة تُرسم على مستوى الصفحة كلها — خارج عناصر الصفحة المتحركة
          التي تحبس العناصر الثابتة داخلها */}
      {createPortal(
        <AnimatePresence>
          {shared && <FileModal key="shared" d={shared} onClose={closeShared} />}
        </AnimatePresence>,
        document.body,
      )}

      {/* فلتر الأنواع */}
      {showFilter && (
        <motion.div {...rise(0)} className="mb-10 flex flex-wrap items-center justify-center gap-2.5">
          {['الكل', ...types].map((t) => {
            const isActive = active === t
            return (
              <button key={t} type="button" onClick={() => setActive(t)}
                className="cursor-pointer transition-all"
                style={isActive
                  ? { borderRadius: '999px', padding: '9px 22px', border: 'none', color: 'var(--ink)', fontWeight: 600, fontSize: '13px',
                      background: 'linear-gradient(135deg, #ef9122 0%, #c9760f 100%)', boxShadow: '0 6px 18px rgba(239,145,34,0.35)' }
                  : { ...glass({ borderRadius: '999px', padding: '9px 22px' }), color: 'var(--ink-3)', fontWeight: 400, fontSize: '13px' }}>
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
              <p style={{ color: 'var(--ink-3)', fontWeight: 300, fontSize: '15px', margin: 0 }}>{emptyNote}</p>
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
