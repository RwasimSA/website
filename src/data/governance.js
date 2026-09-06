/* وثائق الحوكمة — تُدار من لوحة التحكم وتُجلب من GET /governance/documents.
   كل وثيقة تحمل تصنيفها (category.slug) لتصفيتها حسب الصفحة. */

/** تحويل وثيقة من شكل الـ API إلى شكل بطاقة الوثيقة. */
export function mapApiDocs(list) {
  return (list || []).map((d) => ({
    id: d.id,
    title: d.title,
    description: d.description || '',
    year: d.document_year || null,
    file: d.file || null,                 // رابط PDF كامل أو null
    filename: d.original_filename || null,
    categorySlug: d.category?.slug || '',
  }))
}
