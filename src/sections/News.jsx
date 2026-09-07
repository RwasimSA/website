import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { motion as anim } from '../theme'
import SectionCta from '../components/SectionCta'
import { text } from '../typography'
import mediaData from '../../content/media.json'

/* ─────────────────────────────────────────────────────────────
   «رواسم اليوم» — مسرح الوسائط (Coverflow):
   البطاقة النشطة تتوسط المشهد، والبقية تتراصف خلفها بمنظور
   ثلاثي الأبعاد. التنقل: نقر البطاقات الجانبية، السهمان،
   نقاط المؤشر، سحب بالماوس/اللمس، وأسهم الكيبورد.
   نقر البطاقة النشطة يفتح اللايت بوكس (تكبير صورة / تشغيل فيديو)،
   وبطاقة الفيديو مميزة بأيقونة تشغيل صغيرة أعلى يسارها.
   ───────────────────────────────────────────────────────────── */

/* فيديوهات المسرح من content/media.json (coverage) — تُحرَّر من لوحة التحكم */
const MEDIA = mediaData.coverage.map((v) => ({ type: 'video', id: v.id, title: v.title }))
const START_INDEX = Math.min(2, Math.max(0, MEDIA.length - 1))

/* مصغرات الفيديو محفوظة محلياً حتى لا تعتمد الشبكة */
const thumb = (m) => (m.type === 'video' ? `/images/today/yt-${m.id}.jpg` : m.src)

/* أيقونة تشغيل بيضاء في منتصف الصورة */
const PlayBadge = () => (
  <span style={{
    position: 'absolute', inset: 0, zIndex: 2,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  }}>
    <span style={{
      width: '64px', height: '64px', borderRadius: '50%',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'rgba(255,255,255,0.18)', border: '1.5px solid rgba(255,255,255,0.75)',
      backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
      boxShadow: '0 8px 26px rgba(3,15,21,0.4)',
    }}>
      {/* مثلث بزوايا دائرية — الحد بنفس لون التعبئة يقوّس الأركان */}
      <svg width="26" height="26" viewBox="0 0 24 24" style={{ marginRight: '3px', filter: 'drop-shadow(0 2px 6px rgba(3,15,21,0.35))' }}>
        <path d="M8.5 6.2v11.6L18.5 12z" fill="white" stroke="white" strokeWidth="3.2" strokeLinejoin="round" strokeLinecap="round" />
      </svg>
    </span>
  </span>
)

const ArrowButton = ({ onClick, direction, disabled }) => (
  <motion.button
    onClick={onClick}
    whileHover={disabled ? undefined : { scale: 1.08 }}
    whileTap={disabled ? undefined : { scale: 0.94 }}
    aria-disabled={disabled}
    style={{
      width: '48px', height: '48px', borderRadius: '50%',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      cursor: disabled ? 'default' : 'pointer',
      opacity: disabled ? 0.3 : 1, pointerEvents: disabled ? 'none' : 'auto',
      transition: 'opacity 0.3s',
      background: 'linear-gradient(145deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 100%)',
      border: '0.5px solid rgba(255,255,255,0.20)',
      backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
    }}
  >
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      {direction === 'right' ? <polyline points="9 6 15 12 9 18" /> : <polyline points="15 6 9 12 15 18" />}
    </svg>
  </motion.button>
)

/* ══════════ مسرح الوسائط — حلقة مغلقة بمواضع مصممة ══════════
   لكل مستوى إزاحة (0، ±1، ±2، 3) موضع مصمم يدوياً على مدار
   بيضاوي: الأمامية في المنتصف رياضياً دائماً، الجانبيات منفصلة
   وواضحة، وبطاقة الخلف تلوح خافتة خلف الأمامية فتُغلق الحلقة. */
/* ثلاث بطاقات ظاهرة فقط (0 و±1) — مستويا 2 و3 مساران للخروج/الدخول المتلاشي.
   الوسطى أكبر قليلاً من الطرفيتين (s = المقياس). */
const POS = {
  0: { x: 0,   y: 0,   z: 0,    r: 0,  s: 0.95, o: 1, dim: 0 },
  1: { x: 310, y: -8,  z: -120, r: 30, s: 0.78, o: 1, dim: 0.5 },
  2: { x: 540, y: -22, z: -320, r: 46, s: 0.7,  o: 0, dim: 0.72 },
  3: { x: 0,   y: -48, z: -540, r: 0,  s: 0.64, o: 0, dim: 0.85 },
}

function MediaStage({ onOpen, lightboxOpen, onActive = () => {} }) {
  const n = MEDIA.length
  /* active عدّاد غير محدود (يزيد وينقص للأبد) — دوران مستمر بلا نهاية */
  const [active, setActive] = useState(START_INDEX)
  const activeIdx = ((active % n) + n) % n

  /* إبلاغ القسم بالعنصر النشط ليبدّل فيديو الخلفية */
  useEffect(() => { onActive(activeIdx) }, [activeIdx, onActive])
  /* أثناء السحب لا نعتبر النقرة اللاحقة نقرة مقصودة */
  const panRef = useRef(false)

  const step = useCallback((d) => setActive((a) => a + d), [])

  /* القفز لعنصر معيّن بأقصر مسار دوراني */
  const goTo = (i) => {
    let delta = i - activeIdx
    if (delta > n / 2) delta -= n
    if (delta < -n / 2) delta += n
    setActive((a) => a + delta)
  }

  /* أسهم الكيبورد — معطلة عند فتح اللايت بوكس */
  useEffect(() => {
    if (lightboxOpen) return
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') { e.preventDefault(); step(1) }
      else if (e.key === 'ArrowRight') { e.preventDefault(); step(-1) }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightboxOpen, step])

  const onCardClick = (item, off) => {
    if (panRef.current) return
    if (off === 0) onOpen(item)
    else step(off)
  }

  return (
    <motion.div
      className="flex w-full flex-col items-center"
      initial={{ y: 34 }} animate={{ y: 0 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
    >
      {/* المسرح — منظور ثلاثي الأبعاد، ويدعم السحب أفقياً */}
      <motion.div
        className="relative w-full select-none"
        style={{ height: '408px', perspective: '1700px', transformStyle: 'preserve-3d', touchAction: 'pan-y' }}
        onPanStart={() => { panRef.current = true }}
        onPanEnd={(_, info) => {
          if (Math.abs(info.offset.x) > 60) step(info.offset.x > 0 ? 1 : -1)
          setTimeout(() => { panRef.current = false }, 130)
        }}
      >
        {MEDIA.map((item, i) => {
          /* أقصر إزاحة دائرية عن الواجهة: -2..3 (RTL: الموجبة يساراً) */
          let off = ((i - activeIdx) % n + n) % n
          if (off > n / 2) off -= n
          const abs = Math.abs(off)
          const sgn = Math.sign(off)
          const p = POS[abs]
          const isFront = off === 0
          return (
            <motion.div
              key={i}
              onClick={() => onCardClick(item, off)}
              className="absolute left-1/2 top-1/2"
              style={{
                width: '300px', marginLeft: '-150px', marginTop: '-178px',
                zIndex: 20 - abs * 5,
                pointerEvents: abs <= 1 ? 'auto' : 'none',
                cursor: 'pointer',
              }}
              animate={{
                x: -sgn * p.x,
                y: p.y,
                z: p.z,
                rotateY: -sgn * p.r,
                scale: p.s,
                opacity: p.o,
              }}
              transition={{ type: 'spring', stiffness: 165, damping: 25, mass: 0.95 }}
            >
              <motion.div
                whileHover={isFront ? { scale: 1.02 } : undefined}
                whileTap={abs <= 1 ? { scale: 0.985 } : undefined}
              >
                <div style={{
                  borderRadius: '24px', padding: '10px 10px 0', pointerEvents: 'none',
                  background: 'linear-gradient(150deg, #15516c 0%, #0d3a4d 60%, #0f4257 100%)',
                  border: '1px solid rgba(255,255,255,0.22)',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.28), 0 18px 40px rgba(3,15,21,0.4)',
                }}>
                  <div style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', aspectRatio: '1 / 1' }}>
                    <img src={thumb(item)} alt={item.title} loading="lazy" draggable="false"
                      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                    {item.type === 'video' && <PlayBadge />}
                    {/* تعتيم متدرّج مع البعد عن الواجهة */}
                    <div style={{ position: 'absolute', inset: 0, background: 'rgba(4,23,32,0.6)',
                      opacity: p.dim, transition: 'opacity 0.5s' }} />
                  </div>
                  <h3 style={{
                    color: 'white', fontWeight: 600, fontSize: '14px', lineHeight: 1.7,
                    margin: 0, padding: '12px 8px 14px', textAlign: 'center',
                    opacity: isFront ? 1 : abs === 1 ? 0.3 : 0, transition: 'opacity 0.5s',
                    whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                  }}>{item.title}</h3>
                </div>
              </motion.div>
            </motion.div>
          )
        })}
      </motion.div>

      {/* التنقل: سهم لليمين (السابق) — المؤشرات — سهم لليسار (التالي) */}
      <div className="mt-6 flex items-center gap-5">
        <ArrowButton direction="right" onClick={() => step(-1)} />
        <div className="flex items-center gap-2">
          {MEDIA.map((_, i) => (
            <button key={i} type="button" onClick={() => goTo(i)} aria-label={`عنصر ${i + 1}`}
              style={{
                width: i === activeIdx ? '26px' : '8px', height: '8px', borderRadius: '999px', cursor: 'pointer', border: 'none', padding: 0,
                background: i === activeIdx ? 'linear-gradient(90deg, #ef9122, #f4a63f)' : 'rgba(255,255,255,0.25)',
                transition: 'all 0.35s',
              }} />
          ))}
        </div>
        <ArrowButton direction="left" onClick={() => step(1)} />
      </div>
    </motion.div>
  )
}

/* اللايت بوكس — تكبير الصورة أو تشغيل الفيديو */
function Lightbox({ media, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <motion.div
      className="fixed inset-0 z-[90] flex items-center justify-center p-4 md:p-10"
      style={{ background: 'rgba(3,15,21,0.88)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)' }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
    >
      <button type="button" onClick={onClose} aria-label="إغلاق"
        className="absolute top-5 left-5 z-10 flex h-11 w-11 items-center justify-center rounded-full"
        style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.28)', cursor: 'pointer' }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
          <line x1="6" y1="6" x2="18" y2="18" /><line x1="6" y1="18" x2="18" y2="6" />
        </svg>
      </button>

      <motion.div
        initial={{ scale: 0.92, y: 18 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.94, y: 10 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '92vw', maxHeight: '86vh' }}
      >
        {media.type === 'image' ? (
          <img src={media.src} alt={media.title}
            style={{ maxWidth: '92vw', maxHeight: '80vh', borderRadius: '22px',
              border: '1px solid rgba(255,255,255,0.2)', boxShadow: '0 40px 90px rgba(0,0,0,0.6)' }} />
        ) : (
          <div style={{ width: 'min(1080px, 92vw)', aspectRatio: '16 / 9', borderRadius: '22px', overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.2)', boxShadow: '0 40px 90px rgba(0,0,0,0.6)', background: '#000' }}>
            <iframe
              src={`https://www.youtube.com/embed/${media.id}?autoplay=1&rel=0`}
              title={media.title}
              style={{ width: '100%', height: '100%', border: 'none' }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}
        <p className="mt-4 text-center" style={{ color: '#dcebf2', fontWeight: 300, fontSize: '14.5px' }}>{media.title}</p>
      </motion.div>
    </motion.div>
  )
}

export default function News({ onOpenPage = () => {} }) {
  const [open, setOpen] = useState(null)
  /* فيديو الخلفية يتبع البطاقة النشطة في المسرح */
  const [bgIdx, setBgIdx] = useState(START_INDEX)
  const bgItem = MEDIA[bgIdx]

  return (
    <motion.section
      className="relative flex min-h-screen flex-col items-center justify-center px-6 md:px-16"
    >
      {/* خلفية القسم — مقطع صامت من فيديو البطاقة النشطة، يتبدل معها بتلاشٍ متقاطع */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <AnimatePresence>
          <motion.div
            key={bgIdx}
            className="absolute inset-0"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: 'easeInOut' }}
          >
            {/* مصغّر فورية تسدّ فجوة تحميل المشغّل */}
            <img src={thumb(bgItem)} alt="" aria-hidden="true" draggable="false"
              className="absolute inset-0 h-full w-full object-cover" />
            <iframe
              src={`https://www.youtube.com/embed/${bgItem.id}?autoplay=1&mute=1&loop=1&playlist=${bgItem.id}&controls=0&modestbranding=1&playsinline=1&rel=0&iv_load_policy=3&disablekb=1&start=20`}
              title="" aria-hidden="true" tabIndex={-1}
              style={{
                /* تغطية كاملة مع تعويض زوم الشاشات المتوسطة (متغيرا --vw/--vh-full)،
                   وscale إضافي يدفع واجهة يوتيوب (العنوان والشعار) خارج حدود القسم */
                position: 'absolute', top: '50%', left: '50%',
                transform: 'translate(-50%, -50%) scale(1.35)',
                width: 'max(var(--vw-full), calc(var(--vh-full) * 1.7778))',
                height: 'max(var(--vh-full), calc(var(--vw-full) * 0.5625))',
                border: 'none', pointerEvents: 'none',
              }}
              allow="autoplay; encrypted-media"
            />
          </motion.div>
        </AnimatePresence>
        {/* تظليل الهوية فوق الفيديو */}
        <div style={{ position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, rgba(8,38,51,0.9) 0%, rgba(13,58,77,0.78) 40%, rgba(8,38,51,0.84) 72%, rgba(4,23,32,0.95) 100%)' }} />
      </div>

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

      <div className="flex w-full flex-col items-center" style={{ zIndex: 1 }}>
        <motion.h2 style={text.sectionTitle} className="mb-9" {...anim.fade(0.07)}>رواسم اليوم</motion.h2>

        <MediaStage onOpen={setOpen} lightboxOpen={!!open} onActive={setBgIdx} />

        {/* زر المركز الإعلامي */}
        <SectionCta label="زُر المركز الإعلامي" onClick={() => onOpenPage('news')} className="mt-10 md:mt-12" />

      </div>

      {/* اللايت بوكس */}
      <AnimatePresence>
        {open && <Lightbox media={open} onClose={() => setOpen(null)} />}
      </AnimatePresence>
    </motion.section>
  )
}
