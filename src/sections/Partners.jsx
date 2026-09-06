import { motion } from 'framer-motion'
import { motion as anim, glass } from '../theme'
import { text } from '../typography'

/* ─────────────────────────────────────────────────────────────
   «شركاء النجاح» — بانتظار شعارات شركاء رواسم المعتمدة.
   لا تُعرض أي شعارات بديلة (قاعدة: لا عناصر وهمية) — حالة صادقة
   حتى تصل الشعارات، ثم تُبنى شبكتها هنا.
   ───────────────────────────────────────────────────────────── */

export default function Partners({ onOpenPage = () => {} }) {
  return (
    <motion.section
      className="partners-section relative flex min-h-screen flex-col items-center justify-center px-6 md:px-16"
    >
      {/* توهجات جانبية */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          style={{ position: 'absolute', top: '5%', left: '-10%', width: '55%', height: '90%', borderRadius: '50%',
            background: 'radial-gradient(ellipse, rgba(26,127,161,0.22) 0%, transparent 65%)', filter: 'blur(100px)' }}
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          style={{ position: 'absolute', top: '15%', right: '-10%', width: '45%', height: '70%', borderRadius: '50%',
            background: 'radial-gradient(ellipse, rgba(18,113,154,0.15) 0%, transparent 65%)', filter: 'blur(100px)' }}
          animate={{ x: [0, -25, 0], y: [0, 20, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="flex w-full flex-col items-center" style={{ zIndex: 1 }}>
        <motion.h2 style={text.sectionTitle} className="mb-3" {...anim.fade(0.07)}>شركاء النجاح</motion.h2>
        <motion.p
          className="mb-12 max-w-2xl text-center text-[15px] leading-loose"
          style={{ color: '#c9dde8', fontWeight: 300 }}
          {...anim.fade(0.12)}
        >
          نفخر بشبكة من الشركاء الذين أسهموا في دعم البرامج وتوسيع الأثر.
        </motion.p>

        {/* حالة صادقة حتى اعتماد شعارات الشركاء */}
        <motion.div
          initial={{ y: 30 }} animate={{ y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="relative w-full max-w-2xl overflow-hidden text-center"
          style={glass({ borderRadius: '30px', padding: 'clamp(36px, 5vw, 56px)' })}
        >
          <div aria-hidden="true" className="pointer-events-none absolute"
            style={{ top: '-40%', right: '-10%', width: '45%', height: '110%', borderRadius: '50%',
              background: 'radial-gradient(ellipse, rgba(239,145,34,0.16) 0%, transparent 65%)', filter: 'blur(55px)' }} />
          <span dir="ltr" className="relative block" style={{ fontFamily: "'TheYearofHandicrafts', 'IBM Plex Sans Arabic', sans-serif",
            fontWeight: 700, fontSize: '46px', lineHeight: 1,
            backgroundImage: 'linear-gradient(120deg, #ffb85c, #ef9122)', WebkitBackgroundClip: 'text', backgroundClip: 'text',
            color: 'transparent', WebkitTextFillColor: 'transparent' }}>
            20
          </span>
          <span className="relative mt-2 block" style={{ color: '#b6ccd6', fontWeight: 300, fontSize: '14px' }}>
            شراكة في أحدث بيانات رواسم المعتمدة
          </span>
          <p className="relative mt-6" style={{ color: '#dcebf2', fontWeight: 300, fontSize: '15px', lineHeight: 2.05, margin: '24px 0 0' }}>
            تُعرض شعارات شركائنا هنا فور اعتمادها للنشر.
          </p>
          <motion.button
            type="button" onClick={() => onOpenPage('partners')}
            whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
            className="relative mt-7 flex cursor-pointer items-center gap-2.5"
            style={{ margin: '28px auto 0', borderRadius: '999px', padding: '12px 26px', border: 'none',
              background: 'linear-gradient(135deg, #ef9122 0%, #c9760f 100%)',
              boxShadow: '0 10px 26px rgba(239,145,34,0.35)' }}>
            <span style={{ color: 'white', fontWeight: 600, fontSize: '14px' }}>تعرّف على شراكاتنا</span>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  )
}
