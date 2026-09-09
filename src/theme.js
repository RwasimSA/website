/**
 * نظام تصميم جمعية رواسم — المصدر الموحّد لكل القيم البصرية.
 * استند إلى هذا الملف في كل قسم/مكوّن جديد لضمان اتساق الموقع.
 *
 * قاعدة ثابتة: جميع النصوص معتمة 100% — لا تُستخدم شفافية على النص أبداً،
 * بل تُتدرّج الدرجة عبر لون صلب. (ألوان النص أدناه كلها صلبة.)
 */

/* ───────────── الألوان ───────────── */
export const color = {
  // النحاسي — لون التمييز والدعوة للفعل (CTA)
  copper:      '#ef9122',
  copperHover: '#f4a63f',
  copperDeep:  '#c9760f',
  gold:        '#d8c8a4', // وسوم التصنيف

  // التدرّج البنفسجي — الخلفيات والتوهّجات
  purple100: '#2fa7cc',
  purple300: '#1a7fa1',
  purple500: '#14607f',
  purple700: '#0e4156',
  purple900: '#071f2b',
  purpleAccent: '#12719a',

  // النصوص — جميعها معتمة 100%
  textPrimary: '#ffffff', // عناوين ونصوص أساسية
  textLead:    '#d2e9f2', // فقرة الهيرو التمهيدية
  textSoft:    '#a2becf', // نص ثانوي ليّن (أسئلة/تلميحات)
  textMuted:   '#8fa6b0', // تسميات صغيرة / overline داخل البطاقات
  textBody:    '#b6ccd6', // فقرات البطاقات — أقل وضوحاً من الأبيض (معتم 100%)
  textNav:     '#bcd9e6', // روابط شريط التنقّل
}

/* ───────────── تدرّجات جاهزة ───────────── */
export const gradients = {
  hero:     'radial-gradient(ellipse 80% 70% at 50% 42%, #2fa7cc 0%, #1a7fa1 30%, #14607f 58%, #0e4156 80%, #071f2b 100%)',
  about:    'radial-gradient(ellipse 90% 120% at 90% 50%, #2fa7cc 0%, #1a7fa1 30%, #14607f 58%, #0e4156 80%, #071f2b 100%)',
  projects: 'radial-gradient(ellipse 90% 120% at 10% 50%, #2fa7cc 0%, #1a7fa1 30%, #14607f 58%, #0e4156 80%, #071f2b 100%)',
  copperButton: 'linear-gradient(135deg, #ef9122 0%, #c9760f 100%)',
}

/* ───────────── الخطوط ─────────────
 * نظام التايبوغرافي الكامل (الأحجام/الأوزان/الأدوار) في ملف منفصل: typography.js
 * استورد منه: import { text } from './typography' */

/* ───────────── الزوايا والتمويه ───────────── */
export const radius = { sm: 14, md: 18, pill: 999 }
export const blur = { glass: 20 }

/* ───────────── الزجاج: النمط الموحّد للأسطح ─────────────
 * ملاحظة: بلا ظلال صندوقية — الاعتماد على الحدود الزجاجية الرفيعة فقط. */
export const glass = (extra = {}) => ({
  background: 'linear-gradient(145deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)',
  border: '0.5px solid rgba(255,255,255,0.12)',
  borderTop: '0.5px solid rgba(255,255,255,0.20)',
  backdropFilter: 'var(--glass, blur(20px))',
  WebkitBackdropFilter: 'var(--glass, blur(20px))',
  borderRadius: radius.md,
  ...extra,
})

/* ───────────── الحركة ───────────── */
export const ease = [0.22, 1, 0.36, 1]

export const motion = {
  ease,
  // ظهور تدريجي للعناصر مع تأخير اختياري
  fade: (delay = 0) => ({
    // whileInView بدل animate: تبدأ الحركة عند ظهور العنصر فعلاً،
    // فلا يعلق عنصر شفافاً إذا حُمّلت الصفحة والقسم خارج الشاشة
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-40px' },
    transition: { duration: 0.6, ease, delay },
  }),
  // رفع البطاقة عند المرور
  hoverLift: { whileHover: { y: -4, transition: { duration: 0.25, ease: 'easeOut' } } },
  // مدد قياسية (ثوانٍ)
  duration: { section: 0.6, fade: 0.6, hover: 0.25, glow: 6, lights: 24, bgShift: 1.2 },
}
