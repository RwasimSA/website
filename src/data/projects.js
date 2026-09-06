/* المشاريع — تُدار بالكامل من لوحة التحكم وتُجلب من الـ API (GET /projects, /categories).
   لا توجد بيانات ثابتة هنا؛ فقط توهّجات بصرية ومُحوّلات الشكل. */

export const GLOWS = [
  'rgba(100,160,255,0.16)', 'rgba(80,180,215,0.16)', 'rgba(255,200,100,0.14)',
  'rgba(100,220,160,0.14)', 'rgba(244,166,63,0.14)',
]

/** تحويل عنصر مشروع من شكل الـ API إلى الشكل الذي تتوقعه بطاقة المشروع. */
export function mapApiProjects(list) {
  return (list || []).map((p, i) => ({
    id: p.id,
    title: p.title,
    desc: p.description,
    category: p.category?.name || '',
    device: p.image || undefined,        // البطاقة تستخدم الموكاب الافتراضي عند الغياب
    logo: p.project_logo || undefined,   // الشعار إن وُجد، وإلا يظهر الاسم نصّاً
    donationLink: p.donation_link || null,
    projectLink: p.project_link || null,
    glow: GLOWS[i % GLOWS.length],
  }))
}

/** تحويل تصنيفات الـ API إلى قائمة فلاتر (مع «الكل» في المقدمة). */
export function mapApiFilters(list) {
  const names = (list || []).map((c) => c.name).filter(Boolean)
  return ['الكل', ...names]
}
