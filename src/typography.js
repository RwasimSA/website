/**
 * نظام التايبوغرافي — جمعية رواسم
 * المصدر الوحيد لكل أنماط النصوص في الموقع. استورد منه `text` واستخدم النمط الجاهز:
 *
 *   import { text } from '../typography'
 *   <h2 style={text.sectionTitle}>...</h2>
 *   <p  style={text.body}>...</p>
 *
 * قاعدة ثابتة: كل ألوان النصوص صلبة ومعتمة 100% — لا شفافية على النص أبداً.
 */
import { color } from './theme'

/* العائلة والأوزان (المحمّلة فعلياً في index.html) */
export const fontFamily = "'IBM Plex Sans Arabic', system-ui, sans-serif"
export const weight = {
  extralight: 200, // "خفيف جداً" — أخفت درجة للنص
  light: 300,      // "خفيف" — نص ثانوي
  regular: 400,    // افتراضي
  medium: 500,     // تسميات/أزرار
  semibold: 600,   // عناوين
  bold: 700,
}

/* قاعدة اللون: كل النصوص بيضاء افتراضياً. للتفتيح/التغميق غيّر الوزن لا اللون.
 * الاستثناءات الوحيدة ألوان التمييز (النحاسي للروابط، الذهبي للوسوم). */

/* سُلّم الأحجام (px) — موحّد */
export const size = {
  badge: 12,       // الوسم/التسمية فوق عنوان البطاقة
  label: 12,       // التسمية الصغيرة فوق العناوين
  bodySm: 14,      // فقرات البطاقات (موحّدة)
  body: 14,        // فقرات البطاقات
  action: 14,      // نصوص الأزرار والروابط
  eyebrow: 18,     // العنوان الصغير فوق عنوان القسم
  titleSm: 18,     // كل عناوين البطاقات h3 موحّدة على 18
  title: 18,
  titleLg: 18,
  lead: 16,        // فقرة الهيرو
  sectionTitle: 'clamp(30px, 3.4vw, 44px)', // عنوان القسم الكبير h2
  sectionTitleLg: 'clamp(30px, 3.4vw, 44px)',
}

/* أحجام مرنة (للهيرو فقط) */
export const fluid = {
  lead: 'clamp(0.9375rem, 0.85rem + 0.45vw, 1.0625rem)', // 15 → 17
}

export const leading = { heading: 1.3, title: 1.4, body: 1.7, none: 1 }
export const tracking = { eyebrow: '0.20em', wide: '0.14em', label: '0.12em' }

/**
 * أدوار النصوص — كل دور كائن نمط جاهز (style object) كامل.
 * مرتّبة من الأكبر هرمياً إلى الأصغر.
 */
export const text = {
  /* عنوان القسم التمهيدي (eyebrow / kicker) — نحاسي ونحيف */
  eyebrow: {
    fontFamily, fontSize: size.eyebrow, fontWeight: weight.light,
    letterSpacing: tracking.eyebrow, color: color.copper,
  },
  /* عنوان القسم الرئيسي h2 — بخط عام الحِرف اليدوية */
  sectionTitle: {
    fontFamily: "'TheYearofHandicrafts', " + fontFamily,
    fontSize: size.sectionTitle, fontWeight: weight.bold,
    lineHeight: leading.heading, color: color.textPrimary,
  },
  /* فقرة الهيرو التمهيدية — أبيض خفيف */
  lead: {
    fontFamily, fontSize: fluid.lead, fontWeight: weight.light,
    lineHeight: leading.body, color: color.textPrimary,
  },
  /* عناوين البطاقات (هرمية ثلاثية) — أبيض */
  cardTitleLg: {
    fontFamily, fontSize: size.titleLg, fontWeight: weight.semibold,
    lineHeight: 1.35, color: color.textPrimary,
  },
  cardTitle: {
    fontFamily, fontSize: size.title, fontWeight: weight.semibold,
    lineHeight: leading.title, color: color.textPrimary,
  },
  cardTitleSm: {
    fontFamily, fontSize: size.titleSm, fontWeight: weight.semibold,
    lineHeight: leading.title, color: color.textPrimary,
  },
  /* تسمية overline داخل البطاقة — أبيض خفيف */
  label: {
    fontFamily, fontSize: size.label, fontWeight: weight.light,
    letterSpacing: tracking.label, lineHeight: leading.title, color: color.textPrimary,
  },
  /* وسم تصنيف (pill) — لون تمييز ذهبي (استثناء) */
  badge: {
    fontFamily, fontSize: size.badge, fontWeight: weight.medium,
    lineHeight: leading.none, color: color.gold,
  },
  /* نص الفقرات — أقل وضوحاً من الأبيض، خفيف */
  body: {
    fontFamily, fontSize: size.body, fontWeight: weight.light,
    lineHeight: leading.body, color: color.textBody,
  },
  bodySm: {
    fontFamily, fontSize: size.bodySm, fontWeight: weight.light,
    lineHeight: 1.6, color: color.textBody,
  },
  /* نص ثانوي ليّن (أسئلة/تلميحات) — أقل وضوحاً من الأبيض، خفيف */
  soft: {
    fontFamily, fontSize: size.body, fontWeight: weight.light,
    lineHeight: leading.body, color: color.textBody,
  },
  /* الأزرار والروابط النصّية — أبيض */
  action: {
    fontFamily, fontSize: size.action, fontWeight: weight.medium, color: color.textPrimary,
  },
  /* رابط نحاسي (قراءة المزيد) — لون تمييز (استثناء) */
  link: {
    fontFamily, fontSize: size.body, fontWeight: weight.medium, color: color.copper,
  },
  /* روابط شريط التنقّل — أبيض خفيف */
  navLink: {
    fontFamily, fontSize: size.action, fontWeight: weight.light, color: color.textPrimary,
  },
}

export default text
