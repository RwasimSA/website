/* إحصائيات «رواسم في أرقام» — تُدار من لوحة التحكم وتُجلب من GET /stats.
   التوهّجات (glow) عناصر بصرية للواجهة تُوزّع حسب الترتيب. */

const STAT_GLOWS = [
  { glow: 'rgba(60,200,210,0.16)',  iconGlow: 'rgba(60,200,210,0.55)' },
  { glow: 'rgba(70,170,205,0.16)', iconGlow: 'rgba(70,170,205,0.55)' },
  { glow: 'rgba(239,145,34,0.15)', iconGlow: 'rgba(239,145,34,0.55)' },
  { glow: 'rgba(244,166,63,0.15)', iconGlow: 'rgba(244,166,63,0.55)' },
]

/** تحويل عنصر إحصائية من شكل الـ API إلى شكل الواجهة. */
export function mapApiStats(list) {
  return (list || []).map((s, i) => ({
    value: Number(s.value) || 0,
    suffix: s.suffix || '',
    label: s.label || '',
    img: s.icon || undefined,   // بدون أيقونة إذا كانت null
    ...STAT_GLOWS[i % STAT_GLOWS.length],
  }))
}
