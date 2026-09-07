import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Hero from './sections/Hero'
import Programs from './sections/Programs'
import ImpactPath from './sections/ImpactPath'
import FinalCTA from './sections/FinalCTA'
import Numbers from './sections/Numbers'
import News from './sections/News'
import Partners from './sections/Partners'
import Footer from './sections/Footer'
import AboutUs from './pages/AboutUs'
import Barie from './pages/Barie'
import Ashbal from './pages/Ashbal'
import Saif from './pages/Saif'
import ProgramsPage from './pages/ProgramsPage'
import Impact from './pages/Impact'
import MediaCenter from './pages/MediaCenter'
import Governance from './pages/Governance'
import Partnerships from './pages/Partnerships'
import Contact from './pages/Contact'
import VolunteerPage from './pages/VolunteerPage'
import ComingSoon from './pages/ComingSoon'
import CrystalLights from './components/CrystalLights'
import Navbar from './components/Navbar'

const backgrounds = {
  hero:     'radial-gradient(ellipse 65% 55% at 78% 78%, rgba(239,145,34,0.18) 0%, transparent 60%), radial-gradient(ellipse 90% 85% at 50% 42%, #2d7d99 0%, #175b75 32%, #0d3a4d 58%, #082633 80%, #041720 100%)',
  programs: 'radial-gradient(ellipse 60% 60% at 18% 72%, rgba(239,145,34,0.18) 0%, transparent 60%), radial-gradient(ellipse 95% 120% at 85% 48%, #2d7d99 0%, #175b75 32%, #0d3a4d 58%, #082633 80%, #041720 100%)',
  how: 'radial-gradient(ellipse 60% 60% at 82% 72%, rgba(239,145,34,0.18) 0%, transparent 60%), radial-gradient(ellipse 95% 120% at 15% 48%, #2d7d99 0%, #175b75 32%, #0d3a4d 58%, #082633 80%, #041720 100%)',
  numbers:  'radial-gradient(ellipse 70% 50% at 50% 92%, rgba(239,145,34,0.18) 0%, transparent 60%), radial-gradient(ellipse 110% 110% at 50% 26%, #2d7d99 0%, #175b75 32%, #0d3a4d 58%, #082633 80%, #041720 100%)',
  news:     'radial-gradient(ellipse 60% 60% at 15% 80%, rgba(239,145,34,0.18) 0%, transparent 60%), radial-gradient(ellipse 100% 110% at 82% 35%, #2d7d99 0%, #175b75 32%, #0d3a4d 58%, #082633 80%, #041720 100%)',
  partners: 'radial-gradient(ellipse 60% 60% at 85% 25%, rgba(239,145,34,0.16) 0%, transparent 60%), radial-gradient(ellipse 110% 110% at 30% 60%, #2d7d99 0%, #175b75 32%, #0d3a4d 58%, #082633 80%, #041720 100%)',
  cta: 'radial-gradient(ellipse 70% 55% at 50% 85%, rgba(239,145,34,0.20) 0%, transparent 60%), radial-gradient(ellipse 110% 110% at 50% 20%, #2d7d99 0%, #175b75 32%, #0d3a4d 58%, #082633 80%, #041720 100%)',
  footer:   'radial-gradient(ellipse 60% 60% at 50% 100%, rgba(239,145,34,0.10) 0%, transparent 60%), radial-gradient(ellipse 120% 110% at 50% 30%, #0a2530 0%, #061a23 55%, #030f15 100%)',
}

const order = ['hero', 'programs', 'numbers', 'how', 'news', 'partners', 'cta', 'footer']

// الصفحات قيد الإعداد مستقبلاً — تُعرض بشاشة «قريباً» (فارغة حالياً)
const COMING_SOON = {}

// خلفية ثابتة للجوال (تمرير طبيعي): بنفسجي أعلى ← داكن أسفل
const mobileBg = 'linear-gradient(180deg, #124a61 0%, #0d3a4d 38%, #082633 72%, #030f15 100%)'

/* ملاحظة: دخول القسم انزلاقي بلا شفافية — أي opacity < 1 على سلفٍ
   يعطّل backdrop-filter (البلور الزجاجي) في كروم حتى اكتمال الحركة. */
const sectionVariants = {
  enter: (dir) => ({ y: dir >= 0 ? 44 : -44 }),
  center: { opacity: 1, y: 0 },
  exit: (dir) => ({ opacity: 0, y: dir >= 0 ? -44 : 44 }),
}

// استعادة آخر موضع محفوظ ليبقى المستخدم في مكانه بعد إعادة تحميل الصفحة
const savedNav = (() => {
  try { return JSON.parse(sessionStorage.getItem('nav') || '{}') } catch { return {} }
})()

export default function App() {
  const [section, setSection] = useState(order.includes(savedNav.section) ? savedNav.section : 'hero')
  const [direction, setDirection] = useState(1) // +1 نزولاً، -1 صعوداً
  const [isMobile, setIsMobile] = useState(false)
  const [page, setPage] = useState(savedNav.page ?? null) // صفحة داخلية مفتوحة (null = الصفحة الرئيسية)

  // فتح صفحة داخلية أو العودة للرئيسية
  const openPage = (p) => {
    /* 'home:<قسم>' يفتح الرئيسية عند قسم محدد (سطح المكتب: تبديل القسم، الجوال: تمرير إليه) */
    if (typeof p === 'string' && p.startsWith('home:')) {
      const sec = p.slice(5)
      setPage(null)
      if (order.includes(sec)) { setDirection(1); setSection(sec) }
      setTimeout(() => document.getElementById(`${sec}-mobile`)?.scrollIntoView({ behavior: 'smooth' }), 80)
      window.scrollTo({ top: 0 })
      return
    }
    setPage(p)
    window.scrollTo({ top: 0 })
  }
  const lockRef = useRef(false)
  const currentRef = useRef(order.includes(savedNav.section) ? savedNav.section : 'hero')
  const scrollerRef = useRef(null) // حاوي القسم الحالي — للتمرير الداخلي على الشاشات الصغيرة

  // كشف الجوال — الشاشات الصغيرة أو أجهزة اللمس الخالصة (حتى مع «طلب موقع
  // سطح المكتب» على الهاتف) تعتمد التمرير العمودي الطبيعي بدل القفل
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px), ((pointer: coarse) and (hover: none))')
    const update = () => setIsMobile(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  // حفظ الصفحة والقسم الحاليين ليُستعادا بعد إعادة التحميل
  useEffect(() => {
    try {
      const prev = JSON.parse(sessionStorage.getItem('nav') || '{}')
      sessionStorage.setItem('nav', JSON.stringify({ ...prev, page, section }))
    } catch { /* تجاهل */ }
  }, [page, section])

  // حفظ مكان التمرير (الجوال والصفحات الداخلية) واستعادته عند التحميل
  useEffect(() => {
    if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual'

    // استعادة موضع التمرير مع محاولات متتابعة ريثما يكتمل تحميل المحتوى غير المتزامن
    const targetY = savedNav.scrollY || 0
    let cancelled = false
    const cancel = () => { cancelled = true }
    if (targetY > 0) {
      window.addEventListener('wheel', cancel, { passive: true, once: true })
      window.addEventListener('touchstart', cancel, { passive: true, once: true })
      window.addEventListener('keydown', cancel, { once: true })
      let tries = 0
      const restore = () => {
        if (cancelled) return
        window.scrollTo(0, targetY)
        if (++tries < 10 && Math.abs(window.scrollY - targetY) > 2) setTimeout(restore, 120)
      }
      requestAnimationFrame(restore)
    }

    // حفظ مكان التمرير باستمرار (throttle) وعند مغادرة/تحديث الصفحة
    let t = 0
    const save = () => {
      try {
        const prev = JSON.parse(sessionStorage.getItem('nav') || '{}')
        sessionStorage.setItem('nav', JSON.stringify({ ...prev, scrollY: window.scrollY }))
      } catch { /* تجاهل */ }
    }
    const onScroll = () => { if (t) return; t = setTimeout(() => { t = 0; save() }, 200) }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('pagehide', save)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('pagehide', save)
      window.removeEventListener('wheel', cancel)
      window.removeEventListener('touchstart', cancel)
      window.removeEventListener('keydown', cancel)
      if (t) clearTimeout(t)
    }
  }, [])

  // الانتقال لقسم محدّد مع حساب اتجاه الحركة
  const goTo = (target) => {
    const cur = order.indexOf(currentRef.current)
    const next = order.indexOf(target)
    if (next === cur || next < 0) return
    setDirection(next > cur ? 1 : -1)
    setSection(target)
  }

  useEffect(() => {
    currentRef.current = section
  }, [section])

  // سكرول ذكي (سطح المكتب): تمريرة واحدة تنقل قسماً كاملاً ثم تُقفل.
  // القسم الأطول من الشاشة يتمرر داخلياً، وينتقل فقط عند بلوغ حافته.
  useEffect(() => {
    if (isMobile || page) return // الجوال أو صفحة داخلية: تمرير طبيعي بلا قفل
    /* هل بلغ حاوي القسم حافته في اتجاه الحركة؟ */
    const atEdge = (dir) => {
      const el = scrollerRef.current
      if (!el) return true
      if (dir > 0) return el.scrollTop + el.clientHeight >= el.scrollHeight - 4
      return el.scrollTop <= 4
    }
    const navigate = (dir) => {
      if (lockRef.current) return
      if (!atEdge(dir)) return // اترك التمرير الداخلي يعمل أولاً
      const idx = order.indexOf(currentRef.current)
      const next = idx + dir
      if (next < 0 || next >= order.length) return
      lockRef.current = true
      setDirection(dir)
      setSection(order[next])
      setTimeout(() => { lockRef.current = false }, 1200)
    }

    const onWheel = (e) => {
      if (Math.abs(e.deltaY) < 10) return
      navigate(e.deltaY > 0 ? 1 : -1)
    }

    let touchStartY = 0
    const onTouchStart = (e) => { touchStartY = e.touches[0].clientY }
    const onTouchMove = (e) => {
      const dy = touchStartY - e.touches[0].clientY
      if (Math.abs(dy) < 45) return
      navigate(dy > 0 ? 1 : -1)
      touchStartY = e.touches[0].clientY
    }

    // التنقّل بسهمي الكيبورد (أعلى/أسفل) — وكذلك PageUp/PageDown
    const onKeyDown = (e) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown') { e.preventDefault(); navigate(1) }
      else if (e.key === 'ArrowUp' || e.key === 'PageUp') { e.preventDefault(); navigate(-1) }
    }

    window.addEventListener('wheel', onWheel, { passive: true })
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: true })
    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isMobile, page])

  return (
    <motion.div
      className={`relative ${isMobile || page ? 'min-h-screen' : 'h-screen overflow-hidden'}`}
      animate={{ background: page ? mobileBg : isMobile ? mobileBg : backgrounds[section] }}
      transition={{ duration: 1.2, ease: 'easeInOut' }}
    >
      {/* أضواء تدور حول حواف الشاشة */}
      <CrystalLights />

      <Navbar
        collapsed={!page && !isMobile && section !== 'hero'}
        progress={isMobile || page ? 0 : order.indexOf(section) / (order.length - 1)}
        onOpenPage={openPage}
      />

      {page === 'about-us' ? (
        <div className="relative z-10"><AboutUs onOpenPage={openPage} /></div>
      ) : page === 'barie' ? (
        <div className="relative z-10"><Barie onOpenPage={openPage} /></div>
      ) : page === 'ashbal' ? (
        <div className="relative z-10"><Ashbal onOpenPage={openPage} /></div>
      ) : page === 'saif' ? (
        <div className="relative z-10"><Saif onOpenPage={openPage} /></div>
      ) : page === 'programs' ? (
        <div className="relative z-10"><ProgramsPage onOpenPage={openPage} /></div>
      ) : page === 'policies' || (page && page.startsWith('gov-')) ? (
        <div className="relative z-10"><Governance section={page === 'policies' ? 'gov-data' : page} onOpenPage={openPage} /></div>
      ) : page === 'news' ? (
        <div className="relative z-10"><MediaCenter onOpenPage={openPage} /></div>
      ) : page === 'volunteer' ? (
        <div className="relative z-10"><VolunteerPage onOpenPage={openPage} /></div>
      ) : page === 'partners' ? (
        <div className="relative z-10"><Partnerships onOpenPage={openPage} /></div>
      ) : page === 'inquiries' ? (
        <div className="relative z-10"><Contact onOpenPage={openPage} /></div>
      ) : page === 'impact' ? (
        <div className="relative z-10"><Impact onOpenPage={openPage} /></div>
      ) : COMING_SOON[page] ? (
        <div className="relative z-10"><ComingSoon {...COMING_SOON[page]} /></div>
      ) : isMobile ? (
        // الجوال: كل الأقسام متتالية بتمرير طبيعي مع مساحات كافية بينها
        <div className="relative z-10 flex flex-col gap-20">
          <Hero
            onPrograms={() => document.getElementById('programs-mobile')?.scrollIntoView({ behavior: 'smooth' })}
            onAbout={() => openPage('about-us')}
          />
          <div id="programs-mobile"><Programs onOpenPage={openPage} /></div>
          <Numbers onOpenPage={openPage} />
          <ImpactPath />
          <News onOpenPage={openPage} />
          <Partners onOpenPage={openPage} />
          <FinalCTA onOpenPage={openPage} />
          <Footer onTop={() => window.scrollTo({ top: 0, behavior: 'smooth' })} onOpenPage={openPage} />
        </div>
      ) : (
        // سطح المكتب: قسم واحد بملء الشاشة، حركته تتبع اتجاه التمرير
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={section}
            ref={scrollerRef}
            className="snap-scroller relative z-10 hide-scrollbar"
            style={{ overflowY: 'auto', overflowX: 'hidden' }}
            custom={direction}
            variants={sectionVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {section === 'hero' && <Hero onPrograms={() => goTo('programs')} onAbout={() => openPage('about-us')} />}
            {section === 'programs' && <Programs onOpenPage={openPage} />}
            {section === 'how' && <ImpactPath />}
            {section === 'numbers' && <Numbers onOpenPage={openPage} />}
            {section === 'news' && <News onOpenPage={openPage} />}
            {section === 'partners' && <Partners onOpenPage={openPage} />}
            {section === 'cta' && <FinalCTA onOpenPage={openPage} />}
            {section === 'footer' && <Footer onTop={() => goTo('hero')} onOpenPage={openPage} />}

            {/* غشاء لوني يتلاشى فوق القسم الداخل — بديل تلاشي القسم نفسه:
                يمنح الدخول نفس سلاسة الخروج دون وضع opacity على سلف البطاقات
                (ما كان يعطّل البلور الزجاجي backdrop-filter في كروم) */}
            <motion.div
              className="pointer-events-none absolute inset-0"
              style={{ background: backgrounds[section], zIndex: 40 }}
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            />
          </motion.div>
        </AnimatePresence>
      )}
    </motion.div>
  )
}
