/* عميل API مشترك للواجهة العامة — كل القراءات عامة (بلا توكن).
   يقرأ المضيف من VITE_API_BASE_URL. */

// لا يوجد باك إند لرواسم بعد — اترك القيمة فارغة لتعتمد الواجهة على البيانات المحلية (fallback)،
// وعند جاهزية الباك إند ضَع الرابط في VITE_API_BASE_URL.
const BASE = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '')

/** GET على /api/v1{path} ويُعيد الـ JSON كاملاً ({ data, ... }). */
export async function apiGet(path, { locale = 'ar', signal } = {}) {
  if (!BASE) throw new Error('API غير مفعّل — تُستخدم البيانات المحلية')
  const res = await fetch(`${BASE}/api/v1${path}`, {
    headers: { Accept: 'application/json', 'Accept-Language': locale },
    signal,
  })
  if (!res.ok) throw new Error(`API ${res.status} on ${path}`)
  return res.json()
}

/** يجلب كل الصفحات لنقطة مُقسّمة (paginated) ويدمج عناصرها في { data: [...] }. */
export async function apiGetAll(path, { locale = 'ar', signal } = {}) {
  const first = await apiGet(path, { locale, signal })
  let data = first.data || []
  const last = first.meta?.last_page || 1
  if (last > 1) {
    const sep = path.includes('?') ? '&' : '?'
    const rest = await Promise.all(
      Array.from({ length: last - 1 }, (_, i) =>
        apiGet(`${path}${sep}page=${i + 2}`, { locale, signal }).then((r) => r.data || [])
      )
    )
    data = data.concat(...rest)
  }
  return { data }
}
