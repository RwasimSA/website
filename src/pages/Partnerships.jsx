import { motion } from 'framer-motion'
import { glass } from '../theme'
import partnersData from '../../content/partners.json'
import site from '../../content/site.json'

/* ─────────────────────────────────────────────────────────────
   صفحة «الشراكات» — وفق خطة المحتوى المعتمدة:
   الافتتاحية «شراكات توسّع الأثر» | لماذا نتشارك؟ (٣ بطاقات)
   | شركاء رواسم (شبكة شعارات — placeholder حتى تصل شعارات
   الشركاء الحقيقية، كما في قسم الرئيسية) | ابدأ شراكة مع رواسم.
   المؤجل بانتظار مواده: «مجالات الشراكة» (بعد حصر الأنواع
   الفعلية — لا تصنيف افتراضي) و«نماذج من شراكاتنا» (حالات
   حقيقية موثقة فقط). نموذج «اقترح شراكة» يوجَّه لقنوات التواصل
   حتى تُحدَّد الجهة المستقبلة ومسار المتابعة.
   ───────────────────────────────────────────────────────────── */

const titleFont = "'TheYearofHandicrafts', 'IBM Plex Sans Arabic', sans-serif"
const ACCENT = '#ef9122'

const WHY = [
  {
    title: 'تكامل الإمكانات',
    icon: '/images/partnerships/complement.svg',
    body: 'تجمع الشراكة بين ما تملكه رواسم من خبرة في برامجها وما يقدمه الشريك من إمكانات أو خبرات أو موارد تخدم التجربة.',
  },
  {
    title: 'توسيع الوصول',
    icon: '/images/partnerships/reach.svg',
    body: 'تتيح الشراكات الوصول إلى فرص وفئات وبيئات أوسع لتنفيذ البرامج والمبادرات.',
  },
  {
    title: 'صناعة أثر مشترك',
    icon: '/images/partnerships/impact.svg',
    body: 'تُبنى العلاقة حول فرصة أو مشروع ذي غاية واضحة، بحيث تكون الشراكة مرتبطة بعمل فعلي لا بمجرد ظهور اسم الجهة.',
  },
]

/* الشعارات من content/partners.json — تُحرَّر من لوحة التحكم */
const LOGOS = partnersData.logos.map((l) => l.image)

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

export default function Partnerships({ onOpenPage = () => {} }) {
  return (
    <div dir="rtl" className="relative w-full overflow-hidden pb-28">

      {/* ═══ افتتاحية الشراكات ═══ */}
      <div className="relative overflow-hidden" style={{ paddingTop: '150px', paddingBottom: '80px' }}>
        <div className="pointer-events-none absolute inset-0">
          {site.backCta && <img src={site.backCta} alt="" aria-hidden="true" draggable="false"
            className="h-full w-full object-cover" />}
          <div style={{ position: 'absolute', inset: 0,
            background: 'linear-gradient(180deg, rgba(8,38,51,0.92) 0%, rgba(13,58,77,0.82) 45%, rgba(4,23,32,0.97) 100%)' }} />
        </div>
        <div className="relative mx-auto flex w-full max-w-4xl flex-col items-center px-6 text-center">
          <motion.h1 {...rise(0)} className="mb-6 text-white"
            style={{ fontFamily: titleFont, fontWeight: 700, fontSize: 'clamp(32px, 4.2vw, 54px)', lineHeight: 1.45 }}>
            شراكات{' '}
            <span style={{
              backgroundImage: 'linear-gradient(120deg, #ffb85c, #ef9122)',
              WebkitBackgroundClip: 'text', backgroundClip: 'text',
              color: 'transparent', WebkitTextFillColor: 'transparent',
              padding: '0.35em 0.1em', margin: '-0.35em -0.1em',
            }}>توسّع الأثر</span>
          </motion.h1>
          <motion.p {...rise(0.1)} className="max-w-3xl"
            style={{ color: '#dcebf2', fontWeight: 300, fontSize: '16px', lineHeight: 2.05, margin: 0 }}>
            تعمل رواسم مع شركائها على دعم البرامج والتجارب التربوية، وتوسيع نطاق الوصول والأثر، من خلال
            تعاون يجمع الإمكانات والخبرات حول فرص تخدم الطفل وتدعم رسالة الجمعية.
          </motion.p>
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-6 pt-16 md:px-10 md:pt-24">

        {/* ═══ لماذا نتشارك؟ ═══ */}
        <SectionTitle>لماذا نتشارك؟</SectionTitle>
        <div className="mb-24 mt-12 grid gap-5 md:grid-cols-3">
          {WHY.map((w, i) => (
            <motion.div key={w.title} {...rise(0.06 * i)}
              whileHover={{ y: -5, transition: { duration: 0.25 } }}
              className="relative overflow-hidden"
              style={glass({ borderRadius: '26px', padding: '32px 28px' })}>
              <span aria-hidden="true" style={{ position: 'absolute', top: 0, insetInline: '18%', height: '2px',
                background: `linear-gradient(90deg, transparent, ${ACCENT}99, transparent)` }} />
              <div aria-hidden="true" className="pointer-events-none absolute"
                style={{ top: '-40%', left: '-15%', width: '55%', height: '100%', borderRadius: '50%',
                  background: 'radial-gradient(ellipse, rgba(239,145,34,0.12) 0%, transparent 65%)', filter: 'var(--fx-blur, blur(46px))' }} />
              <div className="mb-5 flex h-[58px] w-[58px] items-center justify-center rounded-2xl"
                style={{ background: 'rgba(239,145,34,0.1)', border: '0.5px solid rgba(239,145,34,0.3)' }}>
                <img src={w.icon} alt="" aria-hidden="true" draggable="false" style={{ width: '35px', height: '35px' }} />
              </div>
              <h3 style={{ fontFamily: titleFont, color: 'white', fontWeight: 700, fontSize: '21px', margin: '0 0 10px' }}>{w.title}</h3>
              <p style={{ color: '#dcebf2', fontWeight: 300, fontSize: '14.5px', lineHeight: 2, margin: 0 }}>{w.body}</p>
            </motion.div>
          ))}
        </div>

        {/* ═══ شركاء رواسم ═══ */}
        <SectionTitle>شركاء رواسم</SectionTitle>
        <Lead>جهات حكومية وخاصة وغير ربحية أسهمت مع رواسم في دعم برامجها وتوسيع نطاق أثرها.</Lead>
        {LOGOS.length > 0 ? (
          <motion.div {...rise(0.08)} className="partners-grid mb-24 grid w-full gap-3">
            {LOGOS.map((src, i) => (
              <div key={i} className="partner-cell flex items-center justify-center"
                style={{ ...glass({ borderRadius: '18px', padding: '14px 10px' }), aspectRatio: '1.5' }}>
                <img src={src} alt="شريك" draggable="false" loading="lazy"
                  className="max-h-[52px] w-auto max-w-full object-contain opacity-85" />
              </div>
            ))}
          </motion.div>
        ) : (
          /* حالة صادقة حتى اعتماد الشعارات للنشر */
          <motion.div {...rise(0.08)} className="relative mx-auto mb-24 max-w-2xl overflow-hidden text-center"
            style={glass({ borderRadius: '28px', padding: 'clamp(32px, 5vw, 48px)' })}>
            <div aria-hidden="true" className="pointer-events-none absolute"
              style={{ top: '-40%', right: '-10%', width: '45%', height: '110%', borderRadius: '50%',
                background: 'radial-gradient(ellipse, rgba(239,145,34,0.14) 0%, transparent 65%)', filter: 'blur(55px)' }} />
            <p className="relative" style={{ color: '#dcebf2', fontWeight: 300, fontSize: '15.5px', lineHeight: 2.05, margin: 0 }}>
              20 شراكة في أحدث بيانات رواسم المعتمدة —
              <br />
              تُعرض شعارات شركائنا هنا فور اعتمادها للنشر.
            </p>
          </motion.div>
        )}

        {/* ═══ ابدأ شراكة مع رواسم ═══ */}
        <motion.div {...rise(0.05)} className="relative overflow-hidden"
          style={glass({ borderRadius: '32px', padding: 'clamp(34px, 5vw, 56px)' })}>
          <div aria-hidden="true" className="pointer-events-none absolute"
            style={{ top: '-40%', right: '-8%', width: '42%', height: '120%', borderRadius: '50%',
              background: 'radial-gradient(ellipse, rgba(239,145,34,0.18) 0%, transparent 65%)', filter: 'blur(55px)' }} />
          <div className="flex flex-col items-center text-center">
            <span style={{ color: '#f4a63f', fontWeight: 500, fontSize: '13.5px', letterSpacing: '0.04em' }}>ابدأ شراكة مع رواسم</span>
            <h3 className="mt-3" style={{ fontFamily: titleFont, color: 'white', fontWeight: 700, fontSize: 'clamp(26px, 3.2vw, 40px)', margin: '12px 0 0' }}>
              لنبنِ{' '}
              <span style={{
                backgroundImage: 'linear-gradient(120deg, #ffb85c, #ef9122)',
                WebkitBackgroundClip: 'text', backgroundClip: 'text',
                color: 'transparent', WebkitTextFillColor: 'transparent',
                padding: '0.35em 0.1em', margin: '-0.35em -0.1em',
              }}>فرصة مشتركة</span>
            </h3>
            <p className="mt-5 max-w-2xl" style={{ color: '#dcebf2', fontWeight: 300, fontSize: '15.5px', lineHeight: 2.05, margin: '20px 0 0' }}>
              إذا كانت لدى جهتك فرصة للتعاون مع رواسم في برنامج أو مبادرة أو مشروع، يسعدنا التعرف عليها
              وبحث إمكانات العمل المشترك.
            </p>
            <motion.button
              type="button" onClick={() => onOpenPage('inquiries')}
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              className="mt-8 flex cursor-pointer items-center gap-2.5"
              style={{ borderRadius: '999px', padding: '14px 30px', border: 'none',
                background: 'linear-gradient(135deg, #ef9122 0%, #c9760f 100%)',
                boxShadow: '0 10px 26px rgba(239,145,34,0.35)' }}>
              <span style={{ color: 'white', fontWeight: 600, fontSize: '15px' }}>اقترح شراكة</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
