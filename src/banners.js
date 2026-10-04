import site from '../content/site.json'

/* ─────────────────────────────────────────────────────────────
   بنرات رؤوس الصفحات — لكل صفحة صورتها المستقلة تُرفع من لوحة
   التحكم (site.banners[المفتاح]). إن لم تُرفع يُستعمل البديل الذي
   كانت الصفحة تعرضه سابقاً، فلا تظهر صفحة بلا بنر.
   المفاتيح: programs, barie, ashbal, saif, impact, partners,
   volunteer, contact, governance, media
   ───────────────────────────────────────────────────────────── */
export const bannerFor = (key, fallback = '') =>
  (site.banners && typeof site.banners[key] === 'string' && site.banners[key]) || fallback
