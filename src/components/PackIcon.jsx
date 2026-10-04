import { useState, useEffect } from 'react'
import { useThemeMode } from '../themeMode'

/* ─────────────────────────────────────────────────────────────
   أيقونة من حزمة الأيقونات (ملف SVG أبيض/أزرق فاتح مع تفصيلة برتقالية).
   على الخلفيات الفاتحة تختفي الأجزاء البيضاء، لذا نجلب ملف الأيقونة
   ونضمّنه داخل الصفحة مع تحويل الأبيض والأزرق الفاتح إلى كحلي الهوية —
   نفس قاعدة أيقونات «أثرنا بالأرقام». البرتقالي يبقى كما هو.
   ───────────────────────────────────────────────────────────── */

const cache = {}

function useSvgMarkup(src) {
  const [markup, setMarkup] = useState(cache[src] ?? null)
  useEffect(() => {
    if (!src || cache[src] !== undefined) { setMarkup(cache[src] ?? null); return }
    let alive = true
    fetch(src)
      .then((r) => (r.ok ? r.text() : Promise.reject()))
      .then((t) => {
        if (!t.trim().startsWith('<svg') && !t.includes('<svg')) return
        cache[src] = t
        if (alive) setMarkup(t)
      })
      .catch(() => { cache[src] = null })
    return () => { alive = false }
  }, [src])
  return markup
}

/* طبقة الظل الداخلي في أيقونات الحزمة (الأزرق الفاتح #cee1f2 على أحد جانبي
   الأيقونة) تُرسم شبه شفافة بلون الأيقونة نفسها حتى تُقرأ ظلاً لا جزءاً مصمتاً */
export const SHADE = /#cee1f2|#c2d9ef/i
export const shadeTone = (light) => (light
  ? { color: '#0E4156', opacity: 0.22 }
  : { color: '#ffffff', opacity: 0.32 })

const toShade = (svg, light) => {
  const { color, opacity } = shadeTone(light)
  return svg
    .replace(/fill="(#cee1f2|#c2d9ef)"/gi, `fill="${color}" fill-opacity="${opacity}"`)
    .replace(/fill:\s*(#cee1f2|#c2d9ef)/gi, `fill:${color};fill-opacity:${opacity}`)
}

const toInk = (svg) => svg
  .replace(/#ffffff|#fff\b|"white"/gi, (m) => (m.toLowerCase() === '"white"' ? '"#0E4156"' : '#0E4156'))

export default function PackIcon({ src, size = 40, className = '', style }) {
  const light = useThemeMode() === 'light'
  const markup = useSvgMarkup(src)
  const box = { width: size, height: size, display: 'inline-flex', flexShrink: 0, ...style }

  /* قبل وصول الملف (أو إن تعذّر جلبه) نعرض الصورة كما هي في الداكن،
     وفراغاً بنفس المقاس في الفاتح حتى لا يظهر شكل أبيض غير مقروء */
  if (!markup) {
    return light
      ? <span className={className} style={box} aria-hidden="true" />
      : <img src={src} alt="" aria-hidden="true" draggable="false" className={className} style={box} />
  }
  return (
    <span
      className={`pack-icon ${className}`}
      style={box}
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: light ? toInk(toShade(markup, true)) : toShade(markup, false) }}
    />
  )
}
