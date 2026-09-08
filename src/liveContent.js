// المحتوى الحي: يجلب /api/content من قاعدة D1 (تحرره لوحة ديوان)
// ويحل محل القيم المدمجة قبل تحميل أي مكوّن. عند تعذر الجلب يبقى
// المحتوى المدمج في content/*.json كما هو (وضع التطوير، أو قبل النشر).
import stats from '../content/stats.json'
import people from '../content/people.json'
import documents from '../content/documents.json'
import media from '../content/media.json'
import partners from '../content/partners.json'
import site from '../content/site.json'
import programs from '../content/programs.json'
import official from '../content/official.json'

const TARGETS = { stats, people, documents, media, partners, site, programs, official }

export async function hydrateContent() {
  try {
    const ctrl = new AbortController()
    const timer = setTimeout(() => ctrl.abort(), 3000)
    const res = await fetch('/api/content', { signal: ctrl.signal })
    clearTimeout(timer)
    if (!res.ok) return
    const live = await res.json()
    for (const key of Object.keys(TARGETS)) {
      const fresh = live[key]
      if (!fresh || typeof fresh !== 'object') continue
      const target = TARGETS[key]
      for (const k of Object.keys(target)) delete target[k]
      Object.assign(target, fresh)
    }
  } catch {
    /* يبقى المحتوى المدمج */
  }
}
