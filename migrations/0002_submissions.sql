-- طلبات استبانتي «كن شريكاً» و«تطوع معنا» — تعرضها لوحة ديوان
--   npx wrangler d1 execute rwasim-content --remote --file migrations/0002_submissions.sql
CREATE TABLE IF NOT EXISTS submissions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  kind TEXT NOT NULL,                          -- partner | volunteer
  data TEXT NOT NULL,                          -- JSON بحقول الاستبانة
  status TEXT NOT NULL DEFAULT 'new',          -- new | progress | done
  ip_hash TEXT,                                -- بصمة مجزّأة يومياً للحدّ من الإغراق فقط
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_submissions_kind ON submissions(kind, created_at);
CREATE INDEX IF NOT EXISTS idx_submissions_ip ON submissions(ip_hash, created_at);
