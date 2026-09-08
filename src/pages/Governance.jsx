import { motion } from 'framer-motion'
import { glass } from '../theme'
import FileCards from '../components/FileCards'
import people from '../../content/people.json'
import docs from '../../content/documents.json'
import official from '../../content/official.json'

/* ─────────────────────────────────────────────────────────────
   صفحات «الحوكمة» — مقسمة وفق أقسام الخطة، وكل صفحة تُفتح من
   القائمة المنسدلة في الهيدر:
   gov-data       → البيانات الرسمية للجمعية
   gov-board      → مجلس الإدارة
   gov-executive  → الإدارة التنفيذية (المدير التنفيذي)
   gov-assembly   → الجمعية العمومية
   gov-reports    → التقارير والقوائم المالية
   gov-policies   → اللوائح والسياسات والإفصاحات
   gov-complaints → الشكاوى والبلاغات
   لا تُفترض وثائق لم تُستلم — أقسام المكتبة بحالات صادقة.
   الجهة المشرفة والهيكل التنظيمي بانتظار الوثائق الرسمية،
   والمحتوى الحوكمي يخضع للمراجعة القانونية قبل الإطلاق.
   ───────────────────────────────────────────────────────────── */

const titleFont = "'TheYearofHandicrafts', 'IBM Plex Sans Arabic', sans-serif"
const ACCENT = '#ef9122'

/* روابط صفحات الحوكمة — تُستخدم أيضاً في القائمة المنسدلة بالهيدر */
export const GOV_PAGES = [
  { key: 'gov-data', label: 'البيانات الرسمية' },
  { key: 'gov-board', label: 'مجلس الإدارة' },
  { key: 'gov-executive', label: 'الإدارة التنفيذية' },
  { key: 'gov-assembly', label: 'الجمعية العمومية' },
  { key: 'gov-reports', label: 'التقارير والقوائم المالية' },
  { key: 'gov-policies', label: 'اللوائح والسياسات والإفصاحات' },
  { key: 'gov-complaints', label: 'الشكاوى والبلاغات' },
]

/* البيانات الرسمية من content/official.json — تُحرَّر من لوحة ديوان */
const OFFICIAL = official.items

/* الأشخاص من content/people.json — تُحرَّر من لوحة التحكم.
   البطاقة المصورة PhotoMemberCard تُفعّل تلقائياً لأي عضو له photo */
const BOARD = people.board
const ASSEMBLY = people.assembly
const EXECUTIVE = people.executive

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

/* بطاقة العضو المعتمدة (النموذج المختار): الصورة المفرغة تعلو صندوقاً
   زجاجياً بعرضها وحوافها، والاسم والوصف أسفله خارجه.
   تُستخدم لكل عضو له photo؛ والبقية على بطاقة الحرف حتى تصل صورهم. */
const PhotoMemberCard = ({ name, role, photo, delay = 0, width = 230 }) => (
  <motion.div {...rise(delay)} whileHover={{ y: -5, transition: { duration: 0.25 } }}
    className="mx-auto flex flex-col items-center" style={{ width: `${width}px` }}>
    {/* الصندوق الزجاجي يضم الصورة كاملة من جميع الجهات */}
    <div className="relative w-full overflow-hidden"
      style={glass({ borderRadius: '26px' })}>
      <div aria-hidden="true" className="pointer-events-none absolute"
        style={{ top: '-15%', left: '10%', width: '80%', height: '70%', borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(239,145,34,0.22) 0%, transparent 65%)', filter: 'blur(36px)' }} />
      <img src={photo} alt={name} draggable="false"
        className="relative block w-full"
        style={{ filter: 'drop-shadow(0 10px 18px rgba(3,15,21,0.35))' }} />
    </div>
    {/* الاسم والوصف — خارج الصندوق */}
    <h3 className="text-center" style={{ fontFamily: titleFont, color: 'white', fontWeight: 700, fontSize: '18px', lineHeight: 1.6, margin: '20px 0 0' }}>{name}</h3>
    <span style={{ color: ACCENT, fontWeight: 500, fontSize: '13px', marginTop: '6px' }}>{role}</span>
  </motion.div>
)

const MemberCard = ({ name, role, delay = 0, accent = ACCENT }) => (
  <motion.div {...rise(delay)}
    whileHover={{ y: -4, transition: { duration: 0.22 } }}
    className="flex items-center gap-4"
    style={glass({ borderRadius: '22px', padding: '20px 22px' })}>
    <span className="flex h-[52px] w-[52px] flex-shrink-0 items-center justify-center rounded-full"
      style={{ background: `linear-gradient(135deg, ${accent}2e, ${accent}14)`, border: `0.5px solid ${accent}4d`,
        fontFamily: titleFont, color: 'white', fontWeight: 700, fontSize: '21px' }}>
      {name.replace(/^(د|أ)\. /, '').charAt(0)}
    </span>
    <div>
      <h3 style={{ color: 'white', fontWeight: 600, fontSize: '15.5px', lineHeight: 1.7, margin: 0 }}>{name}</h3>
      {role && <span style={{ color: accent, fontWeight: 500, fontSize: '12.5px' }}>{role}</span>}
    </div>
  </motion.div>
)

/* هيكل الصفحة الموحد: افتتاحية + محتوى + روابط بقية صفحات الحوكمة */
function GovShell({ title, lead, children, current, onOpenPage }) {
  return (
    <div dir="rtl" className="relative w-full overflow-hidden pb-28">
      <div className="relative overflow-hidden" style={{ paddingTop: '150px', paddingBottom: '76px' }}>
        <div className="pointer-events-none absolute inset-0">
          <img src="/images/numbers-back.jpg" alt="" aria-hidden="true" draggable="false"
            className="h-full w-full object-cover" />
          <div style={{ position: 'absolute', inset: 0,
            background: 'linear-gradient(180deg, rgba(8,38,51,0.92) 0%, rgba(13,58,77,0.84) 45%, rgba(4,23,32,0.97) 100%)' }} />
        </div>
        <div className="relative mx-auto flex w-full max-w-4xl flex-col items-center px-6 text-center">
          <motion.span {...rise(0)} style={{ color: '#f4a63f', fontWeight: 500, fontSize: '13.5px', letterSpacing: '0.05em', marginBottom: '14px' }}>
            الحوكمة
          </motion.span>
          <motion.h1 {...rise(0.05)} className="mb-6 text-white"
            style={{ fontFamily: titleFont, fontWeight: 700, fontSize: 'clamp(28px, 3.8vw, 48px)', lineHeight: 1.45 }}>
            {title}
          </motion.h1>
          <motion.span {...rise(0.08)} aria-hidden="true" className="mb-7 block h-[3px] w-16 rounded-full"
            style={{ background: `linear-gradient(90deg, transparent, ${ACCENT}, transparent)`, boxShadow: `0 0 14px ${ACCENT}66` }} />
          {lead && (
            <motion.p {...rise(0.12)} className="max-w-3xl"
              style={{ color: '#dcebf2', fontWeight: 300, fontSize: '15.5px', lineHeight: 2.05, margin: 0 }}>
              {lead}
            </motion.p>
          )}
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-6 pt-16 md:px-10 md:pt-24">
        {children}

        {/* بقية صفحات الحوكمة */}
        <div className="mt-24 flex flex-col items-center">
          <span className="mb-5" style={{ color: '#a2becf', fontWeight: 300, fontSize: '13.5px' }}>المزيد في الحوكمة:</span>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {GOV_PAGES.filter((g) => g.key !== current).map((g) => (
              <button key={g.key} type="button" onClick={() => onOpenPage(g.key)}
                className="cursor-pointer"
                style={{ ...glass({ borderRadius: '999px', padding: '10px 22px' }), color: 'white', fontWeight: 400, fontSize: '13px',
                  border: '0.5px solid rgba(239,145,34,0.28)' }}>
                {g.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ═══════════ 1) البيانات الرسمية ═══════════ */
function GovData({ onOpenPage }) {
  return (
    <GovShell current="gov-data" onOpenPage={onOpenPage}
      title="البيانات الرسمية للجمعية"
      lead="تلتزم رواسم بالشفافية والإفصاح، وتتيح في صفحات الحوكمة أبرز بياناتها المؤسسية ووثائقها وتقاريرها ذات العلاقة.">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {OFFICIAL.map((o, i) => (
          <motion.div key={o.k} {...rise(0.04 * i)}
            className="relative overflow-hidden"
            style={glass({ borderRadius: '22px', padding: '22px 24px' })}>
            <span aria-hidden="true" style={{ position: 'absolute', top: 0, insetInline: '18%', height: '2px',
              background: `linear-gradient(90deg, transparent, ${ACCENT}80, transparent)` }} />
            <span className="mb-2 block" style={{ color: '#f4a63f', fontWeight: 600, fontSize: '12px', letterSpacing: '0.06em' }}>{o.k}</span>
            {o.href ? (
              <a href={o.href} className="footer-link" style={{ color: 'white', fontWeight: 500, fontSize: '16px', textDecoration: 'none' }} dir="ltr">{o.v}</a>
            ) : (
              <span style={{ color: 'white', fontWeight: 500, fontSize: '16px' }}>{o.v}</span>
            )}
          </motion.div>
        ))}
      </div>
      {/* الجهة المشرفة والهيكل التنظيمي — بانتظار الوثائق الرسمية */}
      <motion.p {...rise(0.1)} className="mt-8 text-center"
        style={{ color: '#8fb0c1', fontWeight: 300, fontSize: '13px', lineHeight: 2 }}>
        تُستكمل بقية البيانات النظامية — كالجهة المشرفة والهيكل التنظيمي المعتمد — فور توفر وثائقها الرسمية.
      </motion.p>
    </GovShell>
  )
}

/* ═══════════ 2) مجلس الإدارة ═══════════ */
function GovBoard({ onOpenPage }) {
  return (
    <GovShell current="gov-board" onOpenPage={onOpenPage}
      title="مجلس الإدارة"
      lead="أعضاء مجلس الإدارة وفق التقرير السنوي 2025، وتُراجع الأسماء والصفات مع أحدث كشف معتمد قبل الإطلاق.">
      <div className="grid gap-x-4 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {BOARD.map((m, i) => (
          m.photo
            ? <PhotoMemberCard key={m.name} name={m.name} role={m.role} photo={m.photo} delay={0.05 * i} />
            : <MemberCard key={m.name} name={m.name} role={m.role} delay={0.05 * i} />
        ))}
      </div>
    </GovShell>
  )
}

/* ═══════════ 3) الإدارة التنفيذية — كلمة المدير التنفيذي ═══════════ */
/* كلمة المدير التنفيذي من content/people.json (execWord) */
const EXEC_WORD = people.execWord

function GovExecutive({ onOpenPage }) {
  return (
    <GovShell current="gov-executive" onOpenPage={onOpenPage}
      title="الإدارة التنفيذية"
      lead="تتولى الإدارة التنفيذية إدارة أعمال الجمعية اليومية وتنفيذ توجهات مجلس الإدارة وخططها المعتمدة.">
      <SectionTitle>كلمة المدير التنفيذي</SectionTitle>
      <div className="mt-14 grid items-start gap-10 lg:grid-cols-[300px_1fr]">
        {/* بطاقة المدير التنفيذي */}
        <div className="mx-auto w-full max-w-[300px] lg:sticky lg:top-28">
          {EXECUTIVE.photo
            ? <PhotoMemberCard name={EXECUTIVE.name} role={EXECUTIVE.role} photo={EXECUTIVE.photo} width={260} />
            : <MemberCard name={EXECUTIVE.name} role={EXECUTIVE.role} />}
        </div>

        {/* نص الكلمة */}
        <motion.div {...rise(0.08)} className="relative overflow-hidden"
          style={glass({ borderRadius: '30px', padding: 'clamp(28px, 4.5vw, 48px)' })}>
          <div aria-hidden="true" className="pointer-events-none absolute"
            style={{ top: '-30%', left: '-10%', width: '50%', height: '80%', borderRadius: '50%',
              background: 'radial-gradient(ellipse, rgba(239,145,34,0.14) 0%, transparent 65%)', filter: 'blur(50px)' }} />
          {/* علامة اقتباس كبيرة */}
          <span aria-hidden="true" className="pointer-events-none absolute select-none"
            style={{ top: '-30px', left: '10px', fontFamily: titleFont, fontSize: '170px', lineHeight: 1,
              color: 'rgba(239,145,34,0.1)', fontWeight: 700 }}>
            ”
          </span>
          <div className="relative">
            {EXEC_WORD.map((p, i) => (
              <p key={i} style={{ color: '#dcebf2', fontWeight: 300, fontSize: '15.5px', lineHeight: 2.15,
                margin: i === 0 ? '0 0 18px' : i === EXEC_WORD.length - 1 ? '0' : '0 0 18px' }}>
                {p}
              </p>
            ))}
            {/* التوقيع */}
            <div className="mt-9 flex flex-col items-start gap-1 border-t pt-6"
              style={{ borderColor: 'rgba(255,255,255,0.12)' }}>
              <span style={{ fontFamily: titleFont, color: 'white', fontWeight: 700, fontSize: '18px' }}>{EXECUTIVE.name}</span>
              <span style={{ color: ACCENT, fontWeight: 500, fontSize: '13px' }}>{EXECUTIVE.role} — جمعية رواسم لتنمية الطفل</span>
            </div>
          </div>
        </motion.div>
      </div>
    </GovShell>
  )
}

/* ═══════════ 4) الجمعية العمومية ═══════════ */
function GovAssembly({ onOpenPage }) {
  return (
    <GovShell current="gov-assembly" onOpenPage={onOpenPage}
      title="الجمعية العمومية"
      lead="الأعضاء المؤسسون الواردون في التقرير السنوي 2025.">
      <div className="grid gap-x-4 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {ASSEMBLY.map((m, i) => (
          m.photo
            ? <PhotoMemberCard key={m.name} name={m.name} role="عضو مؤسس" photo={m.photo} delay={0.05 * i} />
            : <MemberCard key={m.name} name={m.name} role="عضو مؤسس" delay={0.05 * i} accent="#7fb8d4" />
        ))}
      </div>
    </GovShell>
  )
}

/* ═══════════ 3) التقارير والقوائم المالية ═══════════ */
const REPORT_TYPES = ['التقارير السنوية', 'القوائم المالية']
const REPORT_FILES = docs.reports.map((d) => ({ ...d, file: d.file || null }))

function GovReports({ onOpenPage }) {
  return (
    <GovShell current="gov-reports" onOpenPage={onOpenPage}
      title="التقارير والقوائم المالية"
      lead="أرشيف التقارير السنوية للجمعية وقوائمها المالية، يُتاح وفق الوثائق المعتمدة والمتطلبات النظامية.">
      <FileCards files={REPORT_FILES} types={REPORT_TYPES}
        emptyNote="تُنشر النسخ المعتمدة للنشر هنا فور اعتمادها." />
    </GovShell>
  )
}

/* ═══════════ 4) اللوائح والسياسات والإفصاحات ═══════════ */
const POLICY_TYPES = ['اللوائح', 'السياسات', 'الإفصاحات']
const POLICY_FILES = docs.policies.map((d) => ({ ...d, file: d.file || null }))

function GovPolicies({ onOpenPage }) {
  return (
    <GovShell current="gov-policies" onOpenPage={onOpenPage}
      title="اللوائح والسياسات والإفصاحات"
      lead="مكتبة منظمة للوثائق المعتمدة فعلياً لدى الجمعية، تُضاف وثائقها تباعاً بعد اعتماد نسخها الرسمية.">
      <FileCards files={POLICY_FILES} types={POLICY_TYPES}
        emptyNote="تُنشر الوثائق المعتمدة هنا فور اعتماد نسخها الرسمية." />
    </GovShell>
  )
}

/* ═══════════ 5) الشكاوى والبلاغات ═══════════ */
function GovComplaints({ onOpenPage }) {
  return (
    <GovShell current="gov-complaints" onOpenPage={onOpenPage}
      title="الشكاوى والبلاغات"
      lead="قناة مستقلة عن نموذج التواصل العام، تستقبل الشكاوى والبلاغات وتعالجها وفق الآلية الرسمية المعتمدة.">
      <motion.div {...rise(0.05)} className="relative mx-auto max-w-3xl overflow-hidden text-center"
        style={glass({ borderRadius: '30px', padding: 'clamp(34px, 5vw, 54px)' })}>
        <div aria-hidden="true" className="pointer-events-none absolute"
          style={{ top: '-40%', right: '-10%', width: '45%', height: '110%', borderRadius: '50%',
            background: 'radial-gradient(ellipse, rgba(239,145,34,0.15) 0%, transparent 65%)', filter: 'blur(55px)' }} />
        <div className="relative mx-auto mb-6 flex h-[64px] w-[64px] items-center justify-center rounded-2xl"
          style={{ background: 'rgba(239,145,34,0.1)', border: '0.5px solid rgba(239,145,34,0.3)' }}>
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#f4a63f" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8z" />
            <line x1="12" y1="8.5" x2="12" y2="12" /><circle cx="12" cy="15" r="0.5" fill="#f4a63f" />
          </svg>
        </div>
        <p className="relative" style={{ color: '#dcebf2', fontWeight: 300, fontSize: '15.5px', lineHeight: 2.1, margin: 0 }}>
          تُعلن الآلية الرسمية المعتمدة لاستقبال الشكاوى والبلاغات ومعالجتها في هذه الصفحة فور اعتمادها.
          <br />
          حتى ذلك الحين، يمكنك إيصال ملاحظتك عبر قنوات التواصل الرسمية وسيوجهها الفريق للجهة المعنية.
        </p>
        <motion.button
          type="button" onClick={() => onOpenPage('inquiries')}
          whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
          className="relative mt-8 flex cursor-pointer items-center gap-2.5"
          style={{ margin: '32px auto 0', borderRadius: '999px', padding: '13px 28px', border: 'none',
            background: 'linear-gradient(135deg, #ef9122 0%, #c9760f 100%)',
            boxShadow: '0 10px 26px rgba(239,145,34,0.35)' }}>
          <span style={{ color: 'white', fontWeight: 600, fontSize: '14.5px' }}>تواصل معنا</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </motion.button>
      </motion.div>
    </GovShell>
  )
}

/* المدخل الموحد — يعرض صفحة الحوكمة المطلوبة حسب المفتاح */
export default function Governance({ section = 'gov-data', onOpenPage = () => {} }) {
  switch (section) {
    case 'gov-board': return <GovBoard onOpenPage={onOpenPage} />
    case 'gov-executive': return <GovExecutive onOpenPage={onOpenPage} />
    case 'gov-assembly': return <GovAssembly onOpenPage={onOpenPage} />
    case 'gov-reports': return <GovReports onOpenPage={onOpenPage} />
    case 'gov-policies': return <GovPolicies onOpenPage={onOpenPage} />
    case 'gov-complaints': return <GovComplaints onOpenPage={onOpenPage} />
    default: return <GovData onOpenPage={onOpenPage} />
  }
}
