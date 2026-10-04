-- الزيارات (جلسات) منفصلة عن مشاهدات الصفحات (hits)
-- يُطبَّق مرة واحدة على قاعدة الإنتاج قبل نشر الموقع:
--   npx wrangler d1 execute rwasim-content --remote --file migrations/0001_visits.sql
CREATE TABLE IF NOT EXISTS visits (
  day TEXT PRIMARY KEY,               -- YYYY-MM-DD
  count INTEGER NOT NULL DEFAULT 0
);
