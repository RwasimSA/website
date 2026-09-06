/* الأخبار — تُدار بالكامل من لوحة التحكم وتُجلب من الـ API (GET /news, /news/{slug}).
   التوجيه بالـ slug، والمتن body عبارة عن HTML منقّى من الخادم. */

/** تحويل عنصر خبر من شكل الـ API إلى شكل الواجهة. */
export function mapApiArticle(a) {
  if (!a) return null
  return {
    id: a.slug,
    slug: a.slug,
    tag: a.tag,
    date: a.date,
    img: a.cover_image || undefined,
    title: a.title,
    excerpt: a.excerpt,
    body: a.body,               // HTML من الـ API
    featured: a.is_featured,
  }
}

// ترتيب العرض: الخبر المميّز أولاً، ثم الأحدث تاريخاً (date) فالأقدم.
export const mapApiNews = (list) => (list || [])
  .map(mapApiArticle)
  .sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1
    return String(b.date || '').localeCompare(String(a.date || ''))
  })
