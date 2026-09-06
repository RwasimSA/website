import DocsGrid from '../components/DocsGrid'

// ملاحظة: لا يوجد تصنيف مقابل في لوحة التحكم بعد لـ«تقارير البرامج».
// أنشئ تصنيفاً له من اللوحة وأبلغني بالـ slug لأربطه؛ حتى ذلك الحين يظهر فارغاً.
export default function ProgramReports() {
  return <DocsGrid eyebrow="الحوكمة" title="تقارير البرامج والأنشطة" subtitle="تقارير أعمال المشاريع ومؤشرات أدائها." categories="program-reports" />
}
