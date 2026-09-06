import { useState, useEffect, useRef } from 'react'
import { apiGet, apiGetAll } from './api'

/* خطّاف جلب بيانات موحّد.
   يجلب /api/v1{path}، ويُعيد { data, loading, error }.
   - map: يحوّل payload.data إلى الشكل الذي تتوقعه الواجهة.
   - fallback: قيمة احتياطية تُستخدم كبداية وعند فشل الطلب (حتى لا ينكسر الموقع إذا تعطّل الـ API). */
export function useApiData(path, { map = (d) => d, fallback = null, all = false } = {}) {
  const [data, setData] = useState(fallback)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const mapRef = useRef(map)
  mapRef.current = map

  useEffect(() => {
    const ctrl = new AbortController()
    let alive = true
    setLoading(true)
    setError(null)
    ;(all ? apiGetAll : apiGet)(path, { signal: ctrl.signal })
      .then((json) => {
        if (!alive) return
        setData(mapRef.current(json.data))
        setError(null)
      })
      .catch((e) => {
        if (!alive || e.name === 'AbortError') return
        setError(e)
        if (fallback != null) setData(fallback)
      })
      .finally(() => { if (alive) setLoading(false) })
    return () => { alive = false; ctrl.abort() }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path])

  return { data, loading, error }
}
