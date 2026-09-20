/* قوائم صفحات الحوكمة والمركز الإعلامي — في ملف مستقل خفيف
   حتى يستوردها الهيدر دون أن يجرّ معه شيفرة الصفحات نفسها،
   فتبقى تلك الصفحات قابلة للتحميل عند الطلب فقط. */

export const GOV_PAGES = [
  { key: 'gov-data', label: 'البيانات الرسمية' },
  { key: 'gov-board', label: 'مجلس الإدارة' },
  { key: 'gov-executive', label: 'الإدارة التنفيذية' },
  { key: 'gov-assembly', label: 'الجمعية العمومية' },
  { key: 'gov-committees', label: 'اللجان الدائمة' },
  { key: 'gov-reports', label: 'التقارير والقوائم المالية' },
  { key: 'gov-minutes', label: 'المحاضر' },
  { key: 'gov-policies', label: 'اللوائح والسياسات والإفصاحات' },
  { key: 'gov-complaints', label: 'الشكاوى والبلاغات' },
]

export const MEDIA_PAGES = [
  { key: 'media-news', label: 'آخر الأخبار' },
  { key: 'media-coverage', label: 'التغطيات' },
  { key: 'media-releases', label: 'المحتوى والإصدارات' },
  { key: 'media-progreports', label: 'تقارير البرامج والمشاريع' },
]
