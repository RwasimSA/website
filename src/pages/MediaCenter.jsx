import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { glass } from '../theme'
import FileCards from '../components/FileCards'
import mediaData from '../../content/media.json'

/* ─────────────────────────────────────────────────────────────
   صفحة «المركز الإعلامي» — وفق خطة المحتوى المعتمدة:
   الافتتاحية | آخر الأخبار (بلا عناصر وهمية — حالة صادقة حتى
   يتوفر محتوى حقيقي من نظام الإدارة) | التغطيات (فيديوهات قناة
   رواسم الحقيقية) | المحتوى والإصدارات (إصدارات واردة في التقرير
   كنواة للقسم). الأرشيف يُفعَّل مع نظام الإدارة.
   قاعدة الخطة: عدد العناصر يتكيف مع المحتوى الحقيقي المتاح.
   ───────────────────────────────────────────────────────────── */

const titleFont = "'TheYearofHandicrafts', 'IBM Plex Sans Arabic', sans-serif"
const ACCENT = '#ef9122'

/* المحتوى من content/media.json — يُحرَّر من لوحة التحكم */
const COVERAGE = mediaData.coverage
const NEWS = mediaData.news

const RELEASE_TYPES = ['الأدلة', 'الحقائب', 'الإصدارات']
const RELEASES = mediaData.releases.map((r) => ({ ...r, file: r.file || null }))

const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
})

const SectionTitle = ({ children, delay = 0 }) => (
  <motion.div {...rise(delay)} className="mb-4 flex flex-col items-center">
    <h2 className="text-center text-white"
      style={{ fontFamily: titleFont, fontWeight: 700, fontSize: 'clamp(26px, 3vw, 38px)', lineHeight: 1.4, margin: 0 }}>
      {children}
    </h2>
    <span aria-hidden="true" className="mt-3 block h-[3px] w-14 rounded-full"
      style={{ background: `linear-gradient(90deg, transparent, ${ACCENT}, transparent)`, boxShadow: `0 0 14px ${ACCENT}66` }} />
  </motion.div>
)

const Lead = ({ children, delay = 0.08 }) => (
  <motion.p {...rise(delay)} className="mx-auto mb-12 max-w-3xl text-center"
    style={{ color: '#dcebf2', fontWeight: 300, fontSize: '15.5px', lineHeight: 2.05 }}>
    {children}
  </motion.p>
)

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
      style={{ background: 'rgba(3,15,21,0.88)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)' }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}>
      <button type="button" onClick={onClose} aria-label="إغلاق"
        className="absolute left-5 top-5 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full"
        style={{ background: 'rgba(255,255,255,0.08)', border: '0.5px solid rgba(255,255,255,0.2)' }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
          <line x1="6" y1="6" x2="18" y2="18" /><line x1="6" y1="18" x2="18" y2="6" />
        </svg>
      </button>
      <motion.div
        className="w-full max-w-4xl overflow-hidden"
        style={{ borderRadius: '22px', aspectRatio: '16 / 9', border: '0.5px solid rgba(255,255,255,0.2)', boxShadow: '0 40px 100px rgba(0,0,0,0.6)' }}
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

export default function MediaCenter({ onOpenPage = () => {} }) {
  const [playing, setPlaying] = useState(null)

  return (
    <div dir="rtl" className="relative w-full overflow-hidden pb-28">

      {/* ═══ الافتتاحية ═══ */}
      <div className="relative overflow-hidden" style={{ paddingTop: '150px', paddingBottom: '80px' }}>
        <div className="pointer-events-none absolute inset-0">
          <img src="/images/today/yt-cTz5Kf4vClE.jpg" alt="" aria-hidden="true" draggable="false"
            className="h-full w-full object-cover" />
          <div style={{ position: 'absolute', inset: 0,
            background: 'linear-gradient(180deg, rgba(8,38,51,0.92) 0%, rgba(13,58,77,0.82) 45%, rgba(4,23,32,0.97) 100%)' }} />
        </div>
        <div className="relative mx-auto flex w-full max-w-4xl flex-col items-center px-6 text-center">
          <motion.h1 {...rise(0)} className="mb-5 text-white"
            style={{ fontFamily: titleFont, fontWeight: 700, fontSize: 'clamp(34px, 4.4vw, 56px)', lineHeight: 1.4 }}>
            المركز الإعلامي
          </motion.h1>
          <motion.p {...rise(0.06)} className="mb-4" style={{ color: '#f4a63f', fontWeight: 500, fontSize: '15px', margin: '0 0 14px' }}>
            كل جديد من رواسم، في مكان واحد
          </motion.p>
          <motion.p {...rise(0.12)} className="max-w-3xl"
            style={{ color: '#dcebf2', fontWeight: 300, fontSize: '15.5px', lineHeight: 2.05, margin: 0 }}>
            هنا تتابع جديد رواسم، وتصل إلى أخبارها وتغطياتها ومحتواها وإصداراتها. مساحة تجمع أحدث ما تنشره
            الجمعية من أخبار وتحديثات، وتوثّق أبرز البرامج والمبادرات والفعاليات، وتتيح الوصول إلى المحتوى
            التربوي والإصدارات التي تنتجها رواسم.
          </motion.p>
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-6 pt-16 md:px-10 md:pt-24">

        {/* ═══ التغطيات — محتوى حقيقي من قناة رواسم ═══ */}
        <SectionTitle>التغطيات</SectionTitle>
        <Lead>ألبومات وفيديوهات مختارة من البرامج والمواسم والفعاليات، من قناة رواسم الرسمية.</Lead>
        <div className="mb-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {COVERAGE.map((v, i) => (
            <motion.button key={v.id} type="button" {...rise(0.05 * i)}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              onClick={() => setPlaying(v)}
              className="group relative cursor-pointer overflow-hidden border-none p-0 text-right"
              style={{ borderRadius: '22px', background: 'transparent',
                border: '0.5px solid rgba(255,255,255,0.16)', boxShadow: '0 18px 40px rgba(3,15,21,0.3)' }}>
              <div className="relative" style={{ aspectRatio: '16 / 9' }}>
                <img src={`/images/today/yt-${v.id}.jpg`} alt={v.title} draggable="false"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div style={{ position: 'absolute', inset: 0,
                  background: 'linear-gradient(180deg, rgba(8,38,51,0.05) 30%, rgba(4,23,32,0.85) 100%)' }} />
                {/* شارة التشغيل */}
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110"
                    style={{ background: 'rgba(255,255,255,0.16)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
                      border: '0.5px solid rgba(255,255,255,0.45)' }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true"
                      style={{ marginRight: '2px', filter: 'drop-shadow(0 2px 6px rgba(3,15,21,0.35))' }}>
                      <path d="M8.5 6.2v11.6L18.5 12z" fill="white" stroke="white" strokeWidth="3.2" strokeLinejoin="round" strokeLinecap="round" />
                    </svg>
                  </span>
                </span>
                {/* التصنيف */}
                <span className="absolute right-3 top-3" style={{ ...glass({ borderRadius: '999px', padding: '5px 12px' }),
                  color: 'white', fontWeight: 500, fontSize: '11px' }}>
                  {v.tag}
                </span>
                <h3 className="absolute bottom-3.5 right-4 left-4"
                  style={{ color: 'white', fontWeight: 500, fontSize: '14px', lineHeight: 1.8, margin: 0 }}>
                  {v.title}
                </h3>
              </div>
            </motion.button>
          ))}
        </div>
        {/* رابط القناة */}
        <motion.div {...rise(0.08)} className="mb-24 flex justify-center">
          <a href="https://www.youtube.com/@RwasimSA" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2.5"
            style={{ ...glass({ borderRadius: '999px', padding: '11px 24px' }), color: 'white', fontWeight: 500, fontSize: '13.5px', textDecoration: 'none' }}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="#f4a63f" aria-hidden="true">
              <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.6 15.6V8.4L15.8 12z" />
            </svg>
            جميع التغطيات على قناة رواسم
          </a>
        </motion.div>

        {/* ═══ المحتوى والإصدارات ═══ */}
        <SectionTitle>المحتوى والإصدارات</SectionTitle>
        <Lead>
          أدلة وحقائب وإصدارات تربوية تنتجها رواسم للمستفيدين والأسرة والمربي، صدرت ضمن برامجها ومواسمها.
        </Lead>
        <div className="mb-24">
          <FileCards files={RELEASES} types={RELEASE_TYPES}
            emptyNote="تُنشر إصدارات هذا التصنيف هنا فور توفر نسخها الرقمية." />
        </div>

        {/* ═══ آخر الأخبار — من لوحة التحكم؛ وحالة صادقة إن لم توجد أخبار ═══ */}
        <SectionTitle>آخر الأخبار</SectionTitle>
        {NEWS.length > 0 && (
          <div className="mb-24 mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {NEWS.map((n, i) => (
              <motion.article key={n.title + i} {...rise(0.05 * i)}
                whileHover={{ y: -5, transition: { duration: 0.25 } }}
                className="relative flex flex-col overflow-hidden"
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
                    {n.tag && <span style={{ color: '#f4a63f', fontWeight: 600, fontSize: '11.5px' }}>{n.tag}</span>}
                    {n.date && <span style={{ color: '#8fb0c1', fontWeight: 300, fontSize: '11.5px' }} dir="ltr">{n.date}</span>}
                  </div>
                  <h3 style={{ fontFamily: titleFont, color: 'white', fontWeight: 700, fontSize: '17px', lineHeight: 1.7, margin: '0 0 8px' }}>{n.title}</h3>
                  {n.summary && <p style={{ color: '#c9dde8', fontWeight: 300, fontSize: '13.5px', lineHeight: 1.95, margin: 0 }}>{n.summary}</p>}
                </div>
              </motion.article>
            ))}
          </div>
        )}
        {NEWS.length === 0 && (
        <motion.div {...rise(0.08)} className="relative mx-auto mb-24 max-w-3xl overflow-hidden text-center"
          style={glass({ borderRadius: '28px', padding: 'clamp(34px, 5vw, 52px)' })}>
          <div aria-hidden="true" className="pointer-events-none absolute"
            style={{ top: '-40%', right: '-10%', width: '45%', height: '110%', borderRadius: '50%',
              background: 'radial-gradient(ellipse, rgba(239,145,34,0.14) 0%, transparent 65%)', filter: 'blur(55px)' }} />
          <p style={{ color: '#dcebf2', fontWeight: 300, fontSize: '15.5px', lineHeight: 2.1, margin: 0 }}>
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
                style={{ ...glass({ borderRadius: '999px', padding: '9px 20px' }), color: 'white', fontWeight: 500, fontSize: '13px',
                  textDecoration: 'none', border: '0.5px solid rgba(239,145,34,0.32)' }}>
                {s.label}
              </a>
            ))}
          </div>
        </motion.div>
        )}

        {/* ختام خفيف */}
        <div className="flex flex-col items-center">
          <motion.button {...rise(0)}
            onClick={() => onOpenPage('inquiries')}
            whileHover={{ scale: 1.03 }}
            className="cursor-pointer border-none bg-transparent"
            style={{ color: '#a2becf', fontSize: '14.5px', fontWeight: 300 }}>
            لطلبات التغطية والمحتوى الإعلامي؟ <span style={{ color: '#f4a63f', fontWeight: 500, textDecoration: 'underline', textUnderlineOffset: '5px' }}>تواصل معنا</span>
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {playing && <Lightbox video={playing} onClose={() => setPlaying(null)} />}
      </AnimatePresence>
    </div>
  )
}
