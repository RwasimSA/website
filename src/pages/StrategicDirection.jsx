import { motion } from 'framer-motion'
import { glass, color } from '../theme'
import { text } from '../typography'

const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay },
})

const tracks = [
  { t: 'مسار المنتجات النوعية', d: 'تطوير منتجات تقنية نوعية عالية الجودة في خدمة القرآن والسنة.' },
  { t: 'مسار الموثوقية', d: 'سدّ فجوة الموثوقية عبر المساهمة في بناء المعايير ونظام الاعتماد.' },
  { t: 'مسار مساند', d: 'استدامة الموارد لتحقيق الأثر واستمراريته.' },
]

const visionWords = ['الريادة', 'بناء', 'موثوقية', 'البيانات']

const values = [
  { t: 'الموثوقية', d: 'الالتزام بأعلى معايير التثبّت العلمي والأمانة المهنية في كل ما يصدر عن الجمعية، والشفافية التامة في التعاملات الإدارية والمالية.' },
  { t: 'التمكين', d: 'التطوير المستمر واستحداث أساليب ووسائل عصرية وإبداعية لتقريب القرآن والسنة للناس، مع الحفاظ على ثوابت المحتوى وأصالته.' },
  { t: 'الابتكار', d: 'الترجمة العملية للأفكار الإبداعية إلى منتجات وخدمات وعمليات وأنظمة وتفاعلات مجتمعية.' },
  { t: 'استدامة الأثر', d: 'تصميم وتنفيذ مشاريع وبرامج ذات نفع متعدٍّ وممتد زمنياً لا تتوقف بانتهاء النشاط، تكاملاً مع مفهوم الصدقة الجارية.' },
  { t: 'تعظيم الوحيين', d: 'ترسيخ مكانة القرآن والسنة كمرجعية عليا وموجّه أساسي لكل أعمال الجمعية وقراراتها.' },
  { t: 'التشاركية', d: 'بناء جسور التعاون والتحالفات الفعّالة مع الجهات المماثلة والقطاعين الخاص والعام، باعتبار خدمة الوحيين مسؤولية تكاملية.' },
]

const perspectives = [
  { p: 'المستفيدون', items: [
    'تمكين الباحثين والمطوّرين من الوصول إلى بيانات وأصول تقنية موثوقة للقرآن والسنة قابلة للاستخدام والتكامل.',
    'إتاحة المواصفات المعيارية لمنتجات القرآن والسنة التقنية وتبنّيها.',
    'تطوير منتجات تقنية نوعية.',
    'تمكين المجتمعات المهنية من تقديم حلول تقنية تحسّن تجربة المستفيد النهائي.',
  ] },
  { p: 'المالي', items: ['تنمية الإيرادات المستدامة وتحسين كفاءة الموارد المالية.'] },
  { p: 'العمليات', items: [
    'تعزيز التميّز المؤسسي وتكامل منظومة العمليات التشغيلية.',
    'تعظيم العائد من الشراكات والتحالفات الاستراتيجية.',
  ] },
  { p: 'التعلّم والنمو', items: ['تعزيز القدرات البشرية وتحسين مساهمتهم في بيئة عمل جاذبة ومحفّزة على الابتكار.'] },
]

const phases = [
  { period: '2026 — 2028', t: 'مرحلة التحوّل الاستراتيجي', role: 'تأسيس «الأساس والثقة»', value: 'معايير حاكمة ومستدامة',
    d: 'توفير الممكّنات والبنية التحتية وإكمال الجاهزية، وتقديم الخدمات أفقياً داخل المملكة، مع التركيز على السوق المحلي والجاهزية للتوسّع الخارجي.' },
  { period: '2029 — 2030', t: 'مرحلة التمكين والاستقرار', role: 'شريك استراتيجي للجهات التشريعية والأكاديمية', value: 'منتجات متكاملة',
    d: 'تكامل خارجي وتمكين المستفيدين من الخدمات محلياً وعالمياً، عبر التوسّع والتقييم والاعتماد، وتحسين النموذج التشغيلي وتجربة المستفيد.' },
]

const SectionTitle = ({ kicker, children }) => (
  <div className="mb-8 text-center">
    {kicker && <motion.p style={{ color: color.copper, fontSize: '12px', fontWeight: 500, letterSpacing: '0.18em', marginBottom: '10px' }} {...rise(0)}>{kicker}</motion.p>}
    <motion.h2 style={{ ...text.sectionTitle, fontSize: '24px' }} {...rise(0.05)}>{children}</motion.h2>
  </div>
)

export default function StrategicDirection() {
  return (
    <div dir="rtl" className="relative mx-auto w-full max-w-6xl px-6 pb-28 pt-36 md:px-10">
      {/* الترويسة */}
      <div className="mb-16 text-center">
        <motion.p style={{ color: color.copper, fontSize: '14px', fontWeight: 300, letterSpacing: '0.22em', marginBottom: '14px' }} {...rise(0)}>الخطة الاستراتيجية 2026 — 2030</motion.p>
        <motion.h1 style={{ ...text.sectionTitle, fontSize: '34px' }} className="mb-4" {...rise(0.07)}>التوجّه الاستراتيجي</motion.h1>
        <motion.p style={{ color: '#b6ccd6', fontWeight: 300, fontSize: '15px', maxWidth: '640px', margin: '0 auto', lineHeight: 1.9 }} {...rise(0.14)}>
          خلاصة التوجّه الاستراتيجي لجمعية رواسم وفق الخطة المعتمدة.
        </motion.p>
      </div>

      {/* التموضع الجديد + المسارات */}
      <motion.div {...rise(0.05)} style={glass({ padding: '34px 30px', marginBottom: '20px' })}>
        <p style={{ color: '#dcebf2', fontWeight: 300, fontSize: '16px', lineHeight: 2, textAlign: 'justify', marginBottom: '4px' }}>
          بُني التوجّه الاستراتيجي على نتائج تحليلٍ معمّق كشف عن فجوةٍ في موثوقية المنتجات والتطبيقات التقنية في مجال القرآن والسنة. وبناءً عليه تتّجه الجمعية إلى تحوّلٍ في نموذج العمل من مقدّم خدمة للمستفيد النهائي إلى مرجعٍ للموثوقية وبنيةٍ تحتية رقمية للمطوّرين والباحثين والجهات، عبر التفرّد في محرّكات البيانات والمعايير التي تخدم المنتجات الرقمية بدلاً من التنافس في واجهات التطبيقات المزدحمة.
        </p>
      </motion.div>

      <div className="mb-20 grid gap-4 md:grid-cols-3">
        {tracks.map((t, i) => (
          <motion.div key={i} {...rise(0.06 * i)} whileHover={{ y: -4, transition: { duration: 0.25 } }} style={glass({ padding: '24px 22px' })}>
            <span style={{ color: color.copper, fontWeight: 700, fontSize: '22px' }}>{i + 1}</span>
            <h3 style={{ color: 'white', fontWeight: 600, fontSize: '16px', margin: '8px 0 8px' }}>{t.t}</h3>
            <p style={{ color: '#b6ccd6', fontWeight: 300, fontSize: '13.5px', lineHeight: 1.8 }}>{t.d}</p>
          </motion.div>
        ))}
      </div>

      {/* الرؤية + الرسالة */}
      <div className="mb-20 grid gap-5 lg:grid-cols-2">
        <motion.div {...rise(0.05)} style={glass({ padding: '34px 30px', border: '0.5px solid rgba(239,145,34,0.4)', display: 'flex', flexDirection: 'column' })}>
          <span style={{ color: color.copper, fontSize: '12px', fontWeight: 500, letterSpacing: '0.18em', marginBottom: '14px' }}>الرؤية</span>
          <p style={{ color: 'white', fontWeight: 600, fontSize: '21px', lineHeight: 1.7, marginBottom: '20px' }}>الريادة في بناء موثوقية البيانات التي تخدم الكتاب والسنة.</p>
          <div className="mt-auto flex flex-wrap gap-2">
            {visionWords.map((w) => (
              <span key={w} style={{ color: '#d8c8a4', fontSize: '12px', fontWeight: 500, padding: '4px 12px', borderRadius: '999px', background: 'rgba(239,145,34,0.16)', border: '0.5px solid rgba(239,145,34,0.3)' }}>{w}</span>
            ))}
          </div>
        </motion.div>

        <motion.div {...rise(0.1)} style={glass({ padding: '34px 30px' })}>
          <span style={{ color: color.copper, fontSize: '12px', fontWeight: 500, letterSpacing: '0.18em', marginBottom: '14px', display: 'block' }}>الرسالة</span>
          <p style={{ color: '#dcebf2', fontWeight: 300, fontSize: '16px', lineHeight: 2, textAlign: 'justify' }}>
            نُسهم في تمكين الانتفاع العالمي بالقرآن والسنة عبر بناء منظومة بيانات عميقة وموثوقة، ومعايير تقنية حاكمة، وشراكات استراتيجية فاعلة، من خلال فريقٍ محترفٍ من الموظفين والمتطوّعين.
          </p>
        </motion.div>
      </div>

      {/* القيم */}
      <div className="mb-20">
        <SectionTitle kicker="ما نؤمن به">قيم الجمعية</SectionTitle>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((v, i) => (
            <motion.div key={v.t} {...rise(0.05 * i)} whileHover={{ y: -4, transition: { duration: 0.25 } }} style={glass({ padding: '24px 22px' })}>
              <div className="mb-3 flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg" style={{ background: 'rgba(239,145,34,0.16)', border: '0.5px solid rgba(239,145,34,0.35)', color: color.copper, fontWeight: 700, fontSize: '14px' }}>{i + 1}</span>
                <h3 style={{ color: 'white', fontWeight: 600, fontSize: '16px' }}>{v.t}</h3>
              </div>
              <p style={{ color: '#b6ccd6', fontWeight: 300, fontSize: '13.5px', lineHeight: 1.85, textAlign: 'justify' }}>{v.d}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* الأهداف الاستراتيجية */}
      <div className="mb-20">
        <SectionTitle kicker="ما نسعى لتحقيقه">الأهداف الاستراتيجية</SectionTitle>
        <div className="grid gap-4 md:grid-cols-2">
          {perspectives.map((g, gi) => (
            <motion.div key={g.p} {...rise(0.06 * gi)} style={glass({ padding: '26px 24px' })}>
              <div className="mb-5 flex items-center gap-2.5" style={{ paddingBottom: '12px', borderBottom: '0.5px solid rgba(255,255,255,0.1)' }}>
                <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: color.copper }} />
                <span style={{ color: '#d8c8a4', fontSize: '13px', fontWeight: 600, letterSpacing: '0.04em' }}>بُعد {g.p}</span>
              </div>
              <ul className="flex flex-col gap-3.5">
                {g.items.map((it, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span style={{ color: color.copper, fontWeight: 700, fontSize: '13px', flexShrink: 0, marginTop: '2px' }}>↩</span>
                    <span style={{ color: '#dcebf2', fontWeight: 300, fontSize: '14px', lineHeight: 1.8 }}>{it}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      {/* مراحل التنفيذ */}
      <div>
        <SectionTitle kicker="خريطة الطريق">مراحل تحقيق التوجّه</SectionTitle>
        <div className="grid gap-5 md:grid-cols-2">
          {phases.map((ph, i) => (
            <motion.div key={i} {...rise(0.08 * i)} whileHover={{ y: -4, transition: { duration: 0.25 } }}
              style={glass({ padding: '30px 28px', ...(i === 0 ? { border: '0.5px solid rgba(239,145,34,0.4)' } : {}) })}>
              <span style={{ display: 'inline-block', color: '#d8c8a4', fontSize: '13px', fontWeight: 600,
                padding: '5px 16px', borderRadius: '999px', marginBottom: '16px',
                background: 'rgba(239,145,34,0.16)', border: '0.5px solid rgba(239,145,34,0.3)' }}>{ph.period}</span>
              <h3 style={{ color: 'white', fontWeight: 600, fontSize: '19px', marginBottom: '12px' }}>{ph.t}</h3>
              <p style={{ color: '#b6ccd6', fontWeight: 300, fontSize: '14px', lineHeight: 1.9, textAlign: 'justify', marginBottom: '20px' }}>{ph.d}</p>
              <div className="flex flex-col gap-3" style={{ borderTop: '0.5px solid rgba(255,255,255,0.1)', paddingTop: '16px' }}>
                <div className="flex gap-2">
                  <span style={{ color: '#8fa6b0', fontSize: '12.5px', fontWeight: 500, minWidth: '52px' }}>الدور</span>
                  <span style={{ color: '#dcebf2', fontSize: '13px', fontWeight: 300 }}>{ph.role}</span>
                </div>
                <div className="flex gap-2">
                  <span style={{ color: '#8fa6b0', fontSize: '12.5px', fontWeight: 500, minWidth: '52px' }}>القيمة</span>
                  <span style={{ color: '#dcebf2', fontSize: '13px', fontWeight: 300 }}>{ph.value}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
