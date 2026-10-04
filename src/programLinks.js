/* ─────────────────────────────────────────────────────────────
   صفحة البرنامج الداخلية لبطاقات البرامج (الرئيسية وصفحة برامجنا).
   الأولوية: الصفحة المختارة من لوحة التحكم (page) ← ثم الرابط
   الخارجي (link) ← ثم الاستنتاج من المفتاح أو اسم البرنامج، لأن
   بيانات اللوحة القديمة قد تخلو من المفتاح. القيمة 'none' في اللوحة
   تعني «بطاقة عرض فقط».
   ───────────────────────────────────────────────────────────── */
export const PROGRAM_PAGES = ['barie', 'ashbal', 'saif']

const fromName = (name = '') => {
  const n = String(name)
  if (n.includes('بارع')) return 'barie'
  if (n.includes('أشبال') || n.includes('اشبال')) return 'ashbal'
  if (n.includes('صيف')) return 'saif'
  return null
}

/* مفتاح الصفحة المستنتج — يُستعمل أيضاً لألوان البرنامج وزخارفه */
export const inferProgramPage = (p = {}) =>
  (PROGRAM_PAGES.includes(p.page) && p.page) || (PROGRAM_PAGES.includes(p.key) && p.key) || fromName(p.name)

/* ما يحدث عند الضغط على البطاقة: صفحة داخلية، أو رابط خارجي، أو لا شيء */
export const programTarget = (p = {}) => {
  if (p.page === 'none') return p.link ? { link: p.link } : null
  if (PROGRAM_PAGES.includes(p.page)) return { page: p.page }
  if (p.link) return { link: p.link }
  const inferred = inferProgramPage(p)
  return inferred ? { page: inferred } : null
}

export const openProgram = (p, onOpen) => {
  const t = programTarget(p)
  if (!t) return
  if (t.link) window.open(t.link, '_blank', 'noopener')
  else onOpen(t.page)
}
