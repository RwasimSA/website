import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { glass } from '../theme'
import FileCards from '../components/FileCards'
import mediaData from '../../content/media.json'

/* ─────────────────────────────────────────────────────────────
   «المركز الإعلامي» — مقسّم لصفحات مستقلة تُفتح من القائمة
   المنسدلة في الهيدر (مثل الحوكمة):
   media-news        → آخر الأخبار
   media-coverage    → التغطيات
   media-releases    → المحتوى والإصدارات
   media-progreports → تقارير البرامج والمشاريع
   بلا عناصر وهمية — حالة صادقة حتى يتوفر محتوى حقيقي من اللوحة.
   ───────────────────────────────────────────────────────────── */

const titleFont = "'TheYearofHandicrafts', 'IBM Plex Sans Arabic', sans-serif"
const ACCENT = '#ef9122'

/* صفحات المركز الإعلامي — معرّفة في navPages.js ليستوردها الهيدر وحده */
export { MEDIA_PAGES } from './navPages'
import { MEDIA_PAGES } from './navPages'

/* المحتوى من content/media.json — يُحرَّر من لوحة التحكم */
const COVERAGE = mediaData.coverage
const NEWS = mediaData.news

/* معرّف الخبر في الرابط: يُشتق من العنوان ليكون رابطاً مقروءاً وقابلاً للمشاركة
   (‎/news-افتتاح-البرنامج)، ويعود لترتيبه إن خلا العنوان */
export const newsSlug = (n, i) =>
  `news-${(n.slug || n.title || '').trim().replace(/\s+/g, '-').replace(/[/?#&]/g, '') || `item-${i + 1}`}`
export const findNews = (slug) => {
  const i = NEWS.findIndex((n, k) => newsSlug(n, k) === slug)
  return i < 0 ? null : { item: NEWS[i], index: i }
}

/* التصنيفات تُدار من اللوحة، مع قيم افتراضية إن لم تُحفظ */
const RELEASE_TYPES = (mediaData.releaseTypes || []).filter(Boolean).length
  ? mediaData.releaseTypes.filter(Boolean)
  : ['الأدلة', 'الحقائب', 'الإصدارات']
const RELEASES = mediaData.releases.map((r) => ({ ...r, file: r.file || null }))
const PROG_REPORTS = (mediaData.progReports || []).map((r) => ({ ...r, file: r.file || null }))

const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
})

/* هيكل موحد لصفحات المركز الإعلامي — افتتاحية + محتوى + روابط بقية الصفحات */
function MediaShell({ title, children, current, onOpenPage }) {
  return (
    <div dir="rtl" className="relative w-full overflow-hidden pb-28">
      <div className="relative overflow-hidden" style={{ paddingTop: '150px', paddingBottom: '76px' }}>
        <div className="bg-fx pointer-events-none absolute inset-0">
          <img src="https://i.ytimg.com/vi/cTz5Kf4vClE/hqdefault.jpg" alt="" aria-hidden="true" draggable="false"
            className="h-full w-full object-cover" />
          <div style={{ position: 'absolute', inset: 0,
            background: 'var(--img-overlay)' }} />
        </div>
        <div className="relative mx-auto flex w-full max-w-4xl flex-col items-center px-6 text-center">
          <motion.span {...rise(0)} style={{ color: 'var(--accent-text)', fontWeight: 500, fontSize: '13.5px', letterSpacing: '0.05em', marginBottom: '14px' }}>
            المركز الإعلامي
          </motion.span>
          <motion.h1 {...rise(0.05)} className="mb-6 text-white"
            style={{ fontFamily: titleFont, fontWeight: 700, fontSize: 'clamp(28px, 3.8vw, 48px)', lineHeight: 1.45 }}>
            {title}
          </motion.h1>
          <motion.span {...rise(0.08)} aria-hidden="true" className="mb-7 block h-[3px] w-16 rounded-full"
            style={{ background: `linear-gradient(90deg, transparent, ${ACCENT}, transparent)`, boxShadow: `0 0 14px ${ACCENT}66` }} />
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-6 pt-16 md:px-10 md:pt-24">
        {children}

        {/* بقية صفحات المركز الإعلامي */}
        <div className="mt-24 flex flex-col items-center">
          <span className="mb-5" style={{ color: 'var(--muted)', fontWeight: 300, fontSize: '13.5px' }}>المزيد في المركز الإعلامي:</span>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {MEDIA_PAGES.filter((g) => g.key !== current).map((g) => (
              <button key={g.key} type="button" onClick={() => onOpenPage(g.key)}
                className="cursor-pointer"
                style={{ ...glass({ borderRadius: '999px', padding: '10px 22px' }), color: 'var(--ink)', fontWeight: 400, fontSize: '13px',
                  border: '0.5px solid rgba(239,145,34,0.28)' }}>
                {g.label}
              </button>
            ))}
          </div>
          <motion.button {...rise(0)}
            onClick={() => onOpenPage('inquiries')}
            whileHover={{ scale: 1.03 }}
            className="mt-10 cursor-pointer border-none bg-transparent"
            style={{ color: 'var(--muted)', fontSize: '14.5px', fontWeight: 300 }}>
            لطلبات التغطية والمحتوى الإعلامي؟ <span style={{ color: 'var(--accent-text)', fontWeight: 500, textDecoration: 'underline', textUnderlineOffset: '5px' }}>تواصل معنا</span>
          </motion.button>
        </div>
      </div>
    </div>
  )
}

/* نافذة تشغيل الفيديو */
function Lightbox({ video, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])
  return (
    <motion.div
      className="fixed inset-0 z-[90] flex items-center justify-center p-4 md:p-10"
      style={{ background: 'var(--shadow)', backdropFilter: 'var(--glass, blur(14px))', WebkitBackdropFilter: 'var(--glass, blur(14px))' }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}>
      <button type="button" onClick={onClose} aria-label="إغلاق"
        className="absolute left-5 top-5 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full"
        style={{ background: 'var(--glass-a)', border: '0.5px solid var(--line)' }}>
        <svg className="on-accent" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
          <line x1="6" y1="6" x2="18" y2="18" /><line x1="6" y1="18" x2="18" y2="6" />
        </svg>
      </button>
      <motion.div
        className="w-full max-w-4xl overflow-hidden"
        style={{ borderRadius: '22px', aspectRatio: '16 / 9', border: '0.5px solid var(--line)', boxShadow: '0 40px 100px rgba(0,0,0,0.6)' }}
        initial={{ scale: 0.94, y: 14 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.94, y: 14 }}
        onClick={(e) => e.stopPropagation()}>
        <iframe
          src={`https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0`}
          title={video.title} className="h-full w-full" style={{ border: 'none' }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen />
      </motion.div>
    </motion.div>
  )
}

/* ═══════════ 1) آخر الأخبار ═══════════ */
function MediaNews({ onOpenPage }) {
  return (
    <MediaShell current="media-news" onOpenPage={onOpenPage}
      title="آخر الأخبار">
      {NEWS.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {NEWS.map((n, i) => (
            <motion.article key={n.title + i} {...rise(0.05 * i)}
              whileHover={{ y: -5, transition: { duration: 0.25 } }}
              onClick={() => onOpenPage(newsSlug(n, i))}
              className="relative flex cursor-pointer flex-col overflow-hidden"
              style={glass({ borderRadius: '24px' })}>
              {n.image && (
                <div className="relative" style={{ aspectRatio: '16 / 9' }}>
                  <img src={n.image} alt="" draggable="false" className="h-full w-full object-cover" />
                  <div style={{ position: 'absolute', inset: 0,
                    background: 'linear-gradient(180deg, transparent 45%, rgba(10,42,56,0.85) 100%)' }} />
                </div>
              )}
              <div className="flex flex-1 flex-col px-6 pb-6 pt-5">
                <div className="mb-2.5 flex flex-wrap items-center gap-2">
                  {n.tag && <span style={{ color: 'var(--accent-text)', fontWeight: 600, fontSize: '11.5px' }}>{n.tag}</span>}
                  {n.date && <span style={{ color: 'var(--muted)', fontWeight: 300, fontSize: '11.5px' }} dir="ltr">{n.date}</span>}
                </div>
                <h3 style={{ fontFamily: titleFont, color: 'var(--ink)', fontWeight: 700, fontSize: '17px', lineHeight: 1.7, margin: '0 0 8px' }}>{n.title}</h3>
                {n.summary && <p style={{ color: 'var(--ink-2)', fontWeight: 300, fontSize: '13.5px', lineHeight: 1.95, margin: 0 }}>{n.summary}</p>}
                <span className="mt-4 flex items-center gap-1.5"
                  style={{ color: 'var(--accent-text)', fontWeight: 500, fontSize: '12.5px' }}>
                  اقرأ الخبر
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"
                    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M19 12H5" /><path d="m12 19-7-7 7-7" />
                  </svg>
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      ) : (
        <motion.div {...rise(0.08)} className="relative mx-auto max-w-3xl overflow-hidden text-center"
          style={glass({ borderRadius: '28px', padding: 'clamp(34px, 5vw, 52px)' })}>
          <div aria-hidden="true" className="pointer-events-none absolute"
            style={{ top: '-40%', right: '-10%', width: '45%', height: '110%', borderRadius: '50%',
              background: 'radial-gradient(ellipse, rgba(239,145,34,0.14) 0%, transparent 65%)', filter: 'blur(55px)' }} />
          <p style={{ color: 'var(--ink-2)', fontWeight: 300, fontSize: '15.5px', lineHeight: 2.1, margin: 0 }}>
            تُنشر أخبار رواسم وتحديثاتها هنا فور صدورها.
            <br />
            حتى ذلك الحين، تابع جديدنا لحظة بلحظة عبر حساباتنا الرسمية.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            {[
              { label: 'إكس', href: 'https://x.com/RwasimSA' },
              { label: 'إنستجرام', href: 'https://www.instagram.com/RwasimSA' },
              { label: 'يوتيوب', href: 'https://www.youtube.com/@RwasimSA' },
              { label: 'سناب شات', href: 'https://www.snapchat.com/add/RwasimSA' },
            ].map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                style={{ ...glass({ borderRadius: '999px', padding: '9px 20px' }), color: 'var(--ink)', fontWeight: 500, fontSize: '13px',
                  textDecoration: 'none', border: '0.5px solid rgba(239,145,34,0.32)' }}>
                {s.label}
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </MediaShell>
  )
}

/* ═══════════ صفحة الخبر — المحتوى الكامل ═══════════ */
function NewsArticle({ slug, onOpenPage }) {
  const found = findNews(slug)
  if (!found) return <MediaNews onOpenPage={onOpenPage} />
  const { item: n, index } = found
  /* نص الخبر الكامل: فقرات مفصولة بأسطر فارغة، وإن لم يُكتب يُعرض الملخص */
  const paragraphs = String(n.body || n.summary || '').split(/\n{1,}/).map((p) => p.trim()).filter(Boolean)
  const others = NEWS.map((x, i) => ({ x, i })).filter(({ i }) => i !== index).slice(0, 3)

  return (
    <div dir="rtl" className="relative w-full overflow-hidden pb-28">
      {/* رأس الصفحة بصورة الخبر */}
      <div className="relative overflow-hidden" style={{ paddingTop: '150px', paddingBottom: '70px' }}>
        <div className="bg-fx pointer-events-none absolute inset-0">
          {n.image
            ? <img src={n.image} alt="" aria-hidden="true" draggable="false" className="h-full w-full object-cover" />
            : <img src="https://i.ytimg.com/vi/cTz5Kf4vClE/hqdefault.jpg" alt="" aria-hidden="true" draggable="false" className="h-full w-full object-cover" />}
          <div style={{ position: 'absolute', inset: 0,
            background: 'var(--img-overlay)' }} />
        </div>
        <div className="relative mx-auto flex w-full max-w-4xl flex-col items-center px-6 text-center">
          <motion.button {...rise(0)} type="button" onClick={() => onOpenPage('media-news')}
            className="mb-5 flex cursor-pointer items-center gap-1.5 border-none bg-transparent"
            style={{ color: 'var(--accent-text)', fontWeight: 500, fontSize: '13px' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"
              strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
            </svg>
            آخر الأخبار
          </motion.button>
          <motion.h1 {...rise(0.05)} className="mb-5 text-white"
            style={{ fontFamily: titleFont, fontWeight: 700, fontSize: 'clamp(26px, 3.6vw, 44px)', lineHeight: 1.5 }}>
            {n.title}
          </motion.h1>
          <motion.div {...rise(0.09)} className="flex flex-wrap items-center justify-center gap-3">
            {n.tag && (
              <span style={{ ...glass({ borderRadius: '999px', padding: '6px 16px' }),
                color: 'var(--accent-text)', fontWeight: 600, fontSize: '12px', border: '0.5px solid rgba(239,145,34,0.32)' }}>
                {n.tag}
              </span>
            )}
            {n.date && <span dir="ltr" style={{ color: 'var(--muted)', fontWeight: 300, fontSize: '12.5px' }}>{n.date}</span>}
          </motion.div>
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-3xl px-6 pt-12 md:px-10 md:pt-16">
        {/* صورة الخبر كاملة */}
        {n.image && (
          <motion.div {...rise(0.05)} className="mb-10 overflow-hidden"
            style={{ borderRadius: '24px', border: '0.5px solid var(--line)', boxShadow: '0 22px 50px var(--shadow)' }}>
            <img src={n.image} alt={n.title} draggable="false" className="block w-full" />
          </motion.div>
        )}

        {/* نص الخبر */}
        <motion.div {...rise(0.1)}>
          {paragraphs.length > 0 ? paragraphs.map((p, i) => (
            <p key={i} style={{ color: 'var(--ink-2)', fontWeight: 300, fontSize: '15.5px', lineHeight: 2.15, margin: '0 0 18px' }}>{p}</p>
          )) : (
            <p style={{ color: 'var(--muted)', fontWeight: 300, fontSize: '15px', lineHeight: 2.1, margin: 0 }}>
              يُنشر نص هذا الخبر كاملاً قريباً.
            </p>
          )}
        </motion.div>

        {/* أخبار أخرى */}
        {others.length > 0 && (
          <div className="mt-20">
            <h2 className="mb-6 text-center text-white"
              style={{ fontFamily: titleFont, fontWeight: 700, fontSize: '22px' }}>أخبار أخرى</h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {others.map(({ x, i }) => (
                <motion.article key={i} {...rise(0.05)}
                  whileHover={{ y: -4, transition: { duration: 0.22 } }}
                  onClick={() => onOpenPage(newsSlug(x, i))}
                  className="flex cursor-pointer flex-col overflow-hidden"
                  style={glass({ borderRadius: '18px' })}>
                  {x.image && (
                    <div style={{ aspectRatio: '16 / 9' }}>
                      <img src={x.image} alt="" draggable="false" className="h-full w-full object-cover" />
                    </div>
                  )}
                  <div className="px-4 pb-4 pt-3">
                    {x.date && <span dir="ltr" style={{ color: 'var(--muted)', fontWeight: 300, fontSize: '11px' }}>{x.date}</span>}
                    <h3 style={{ color: 'var(--ink)', fontWeight: 600, fontSize: '13.5px', lineHeight: 1.75, margin: '4px 0 0' }}>{x.title}</h3>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        )}

        {/* العودة */}
        <div className="mt-16 flex justify-center">
          <button type="button" onClick={() => onOpenPage('media-news')} className="cursor-pointer"
            style={{ ...glass({ borderRadius: '999px', padding: '11px 26px' }), color: 'var(--ink)', fontWeight: 500,
              fontSize: '13.5px', border: '0.5px solid rgba(239,145,34,0.3)' }}>
            العودة إلى آخر الأخبار
          </button>
        </div>
      </div>
    </div>
  )
}

/* ═══════════ 2) التغطيات — محتوى حقيقي من قناة رواسم ═══════════ */
function MediaCoverage({ onOpenPage }) {
  const [playing, setPlaying] = useState(null)
  return (
    <MediaShell current="media-coverage" onOpenPage={onOpenPage}
      title="التغطيات">
      <div className="mb-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {COVERAGE.map((v, i) => (
          <motion.button key={v.id} type="button" {...rise(0.05 * i)}
            whileHover={{ y: -6, transition: { duration: 0.25 } }}
            onClick={() => setPlaying(v)}
            className="group relative cursor-pointer overflow-hidden border-none p-0 text-right"
            style={{ borderRadius: '22px', background: 'transparent',
              border: '0.5px solid var(--line)', boxShadow: '0 18px 40px var(--shadow)' }}>
            <div className="relative" style={{ aspectRatio: '16 / 9' }}>
              <img src={`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`} alt={v.title} draggable="false"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div style={{ position: 'absolute', inset: 0,
                background: 'linear-gradient(180deg, rgba(8,38,51,0.05) 30%, rgba(4,23,32,0.85) 100%)' }} />
              {/* شارة التشغيل */}
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110"
                  style={{ background: 'var(--line)', backdropFilter: 'var(--glass, blur(10px))', WebkitBackdropFilter: 'var(--glass, blur(10px))',
                    border: '0.5px solid rgba(255,255,255,0.45)' }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true"
                    style={{ marginRight: '2px', filter: 'drop-shadow(0 2px 6px var(--shadow))' }}>
                    <path d="M8.5 6.2v11.6L18.5 12z" fill="white" stroke="white" strokeWidth="3.2" strokeLinejoin="round" strokeLinecap="round" />
                  </svg>
                </span>
              </span>
              {/* التصنيف */}
              <span className="absolute right-3 top-3" style={{ ...glass({ borderRadius: '999px', padding: '5px 12px' }),
                color: 'var(--on-accent)', fontWeight: 500, fontSize: '11px' }}>
                {v.tag}
              </span>
              <h3 className="absolute bottom-3.5 right-4 left-4"
                style={{ color: 'var(--on-accent)', fontWeight: 500, fontSize: '14px', lineHeight: 1.8, margin: 0 }}>
                {v.title}
              </h3>
            </div>
          </motion.button>
        ))}
      </div>
      {/* رابط القناة */}
      <motion.div {...rise(0.08)} className="flex justify-center">
        <a href="https://www.youtube.com/@RwasimSA" target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-2.5"
          style={{ ...glass({ borderRadius: '999px', padding: '11px 24px' }), color: 'var(--ink)', fontWeight: 500, fontSize: '13.5px', textDecoration: 'none' }}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="#f4a63f" aria-hidden="true">
            <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.6 15.6V8.4L15.8 12z" />
          </svg>
          جميع التغطيات على قناة رواسم
        </a>
      </motion.div>
      <AnimatePresence>
        {playing && <Lightbox video={playing} onClose={() => setPlaying(null)} />}
      </AnimatePresence>
    </MediaShell>
  )
}

/* ═══════════ 3) المحتوى والإصدارات ═══════════ */
function MediaReleases({ onOpenPage }) {
  return (
    <MediaShell current="media-releases" onOpenPage={onOpenPage}
      title="المحتوى والإصدارات">
      <FileCards files={RELEASES} types={RELEASE_TYPES}
        emptyNote="تُنشر إصدارات هذا التصنيف هنا فور توفر نسخها الرقمية." />
    </MediaShell>
  )
}

/* ═══════════ 4) تقارير البرامج والمشاريع ═══════════ */
function MediaProgReports({ onOpenPage }) {
  return (
    <MediaShell current="media-progreports" onOpenPage={onOpenPage}
      title="تقارير البرامج والمشاريع">
      <FileCards files={PROG_REPORTS}
        emptyNote="تُنشر تقارير البرامج والمشاريع هنا فور اعتماد نسخها للنشر." />
    </MediaShell>
  )
}

/* المدخل: يختار صفحة المركز الإعلامي حسب القسم المطلوب */
export default function MediaCenter({ section = 'media-news', onOpenPage = () => {} }) {
  if (section.startsWith('news-')) return <NewsArticle slug={section} onOpenPage={onOpenPage} />
  switch (section) {
    case 'media-coverage': return <MediaCoverage onOpenPage={onOpenPage} />
    case 'media-releases': return <MediaReleases onOpenPage={onOpenPage} />
    case 'media-progreports': return <MediaProgReports onOpenPage={onOpenPage} />
    default: return <MediaNews onOpenPage={onOpenPage} />
  }
}
