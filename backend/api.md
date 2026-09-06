# Alborhan Public API — `/api/v1`

All responses are JSON. List endpoints return an Eloquent API Resource collection.
Public website-content reads are open; write/admin endpoints require **Sanctum**
authentication **and** the matching `{entity}.{ability}` permission (enforced by
the `permission:` middleware — the same permission the entity policy maps to).
The seeded `superadmin` role bypasses every check.

### Error envelope

Every `/api/v1/*` failure returns a uniform JSON envelope (success responses keep
their Eloquent-resource shape and are never wrapped):

| Status | Body                                                        | When                                |
|--------|-------------------------------------------------------------|-------------------------------------|
| 401    | `{ "message": "غير مصرح لك بالوصول." }`                     | unauthenticated on a secured route  |
| 403    | `{ "message": "ليس لديك صلاحية لهذا الإجراء." }`            | missing permission / policy denial  |
| 404    | `{ "message": "العنصر غير موجود." }`                       | unknown model / route               |
| 422    | `{ "message": ..., "errors": { field: [ ... ] } }`          | validation (Laravel default)        |
| 429    | `{ "message": "عدد كبير من الطلبات. حاول لاحقًا." }`        | rate limit exceeded                 |
| 500    | `{ "message": "حدث خطأ غير متوقع." }`                       | server error (trace never leaked)   |

### Rate limiting

- **Public reads** (`GET` categories, projects, news, team, team-groups, stats,
  governance categories/documents): **60 requests/min per IP** (named limiter
  `api`). The 61st within the window returns `429` with the envelope above.
- **Secured reads/writes** (Sanctum group): **60 requests/min** keyed by the
  authenticated user (falling back to IP) — named limiter `api-auth`.
- **Survey submission** (`POST /api/v1/surveys/donor-satisfaction`): `6/min` per IP.

### CORS

Only `api/*` is CORS-enabled, for the pinned origins `https://alborhan.sa`,
`https://demo.alborhan.sa`, `http://localhost:5173`, `http://localhost:3000`.
Credentials are **not** supported (reads are public; writes use bearer tokens).

### Issuing a token

Secured endpoints accept a Sanctum bearer token. Mint one for an existing user:

```
php artisan api:issue-token consumer@alborhan.sa --name=api --abilities=*
```

The plaintext token is printed once. Send it as `Authorization: Bearer <token>`.

## Localization

Translatable fields (e.g. `name`) are returned as a **single localized string**
for the request locale. Locale precedence: `?locale=` query param →
`Accept-Language` header → `ar` (default). Only `ar` and `en` are supported;
anything else falls back to `ar`. A missing translation for the requested locale
falls back to the Arabic value.

## Categories (تصنيفات المشاريع)

| Method | Path                      | Auth     | Permission           | Success |
|--------|---------------------------|----------|----------------------|---------|
| GET    | `/api/v1/categories`      | public   | —                    | 200     |
| POST   | `/api/v1/categories`      | sanctum  | `categories.create`  | 201     |
| PUT    | `/api/v1/categories/{id}` | sanctum  | `categories.edit`    | 200     |
| DELETE | `/api/v1/categories/{id}` | sanctum  | `categories.delete`  | 204     |

- `GET` returns the full ordered list (by `sort_order`, then `id`) — used for the
  public site's project-filter labels. Not paginated (small, bounded set).
- `slug` is auto-derived from the Arabic name and never accepted from input.
- Write bodies: `name` is an object `{ "ar": string (required), "en": string (optional) }`,
  plus optional `sort_order` (int ≥ 0).

Resource shape: `{ "data": { "id": int, "slug": string, "name": string, "sort_order": int } }`
(`name` localized per the rules above).

## Projects (المشاريع)

| Method | Path                    | Auth     | Permission         | Success |
|--------|-------------------------|----------|--------------------|---------|
| GET    | `/api/v1/projects`      | public   | —                  | 200     |
| GET    | `/api/v1/projects/{id}` | public   | —                  | 200     |
| POST   | `/api/v1/projects`      | sanctum  | `projects.create`  | 201     |
| PUT    | `/api/v1/projects/{id}` | sanctum  | `projects.edit`    | 200     |
| DELETE | `/api/v1/projects/{id}` | sanctum  | `projects.delete`  | 204     |

- `GET` returns the full list ordered by `sort_order` (the manual public display
  order set by the admin drag-reorder UI), newest first for ties. Not paginated.
- `title` and `description` are localized strings (per the rules above); the
  embedded `category` carries its own localized `name` + `slug`.
- `image` (device/cover render) and `project_logo` (brand mark) are each a full
  public URL (served from the `public` disk via `storage:link`) or `null`. They
  are independent: replacing one never affects the other.
- `project_link` and `donation_link` are plain external URLs or `null` — the
  project's public site/app and a donation destination, respectively.
- **Write bodies are `multipart/form-data`** (they carry image uploads). Fields:
  - `title[ar]` (required), `title[en]` (optional)
  - `description[ar]` (required), `description[en]` (optional)
  - `category_id` (required, must exist in `categories`)
  - `project_link` (optional, valid URL, ≤ 2048 chars)
  - `donation_link` (optional, valid URL, ≤ 2048 chars)
  - `image` (required on create, optional on update; `jpg`/`jpeg`/`png`/`webp`, ≤ 4 MB)
  - `project_logo` (optional on create and update; `jpg`/`jpeg`/`png`/`webp`, ≤ 4 MB)
  - `sort_order` (optional, int ≥ 0)
  - On update, send `_method=PUT` over a POST (multipart cannot ride a real PUT body).
    Supplying a new `image`/`project_logo` replaces and deletes that old file;
    omitting it keeps the current one. The two uploads are handled independently.

Resource shape:
```json
{ "data": {
  "id": 1,
  "title": "string",
  "description": "string",
  "category": { "id": 1, "name": "string", "slug": "string" },
  "image": "https://… or null",
  "project_logo": "https://… or null",
  "project_link": "https://… or null",
  "donation_link": "https://… or null",
  "sort_order": 0
} }
```

## News (الأخبار)

| Method | Path                    | Auth     | Permission     | Success |
|--------|-------------------------|----------|----------------|---------|
| GET    | `/api/v1/news`          | public   | —              | 200     |
| GET    | `/api/v1/news/{slug}`   | public   | —              | 200     |
| POST   | `/api/v1/news`          | sanctum  | `news.create`  | 201     |
| PUT    | `/api/v1/news/{id}`     | sanctum  | `news.edit`    | 200     |
| DELETE | `/api/v1/news/{id}`     | sanctum  | `news.delete`  | 204     |

- **Published only.** Both reads expose ONLY articles with `status = published`
  **and** `published_at <= now()`. Drafts and future-dated posts never appear in
  the list and return **404** from the detail endpoint. The internal `status`
  field is never serialised.
- `GET /api/v1/news` is **paginated** (12/page; standard Laravel `links` + `meta`)
  and ordered **featured first, then newest `published_at` first**.
- `GET /api/v1/news/{slug}` resolves by the article **slug** (not id).
- `title`, `excerpt`, `body` and the SEO `meta_*` fields are localized strings
  (per the localization rules above). `body` is **sanitised rich HTML** (a tight
  allowlist: `p, br, strong, em, u, a[href], h2–h4, ul, ol, li, blockquote`);
  scripts, event handlers and `javascript:` URLs are stripped server-side.
- `cover_image` / `seo.share_image` are full public URLs (or `null`).
- **Write bodies are `multipart/form-data`** (cover/share image uploads). Fields:
  - `title[ar]` (required), `title[en]` (optional)
  - `excerpt[ar]` (required), `excerpt[en]` (optional)
  - `body[ar]` (required, HTML), `body[en]` (optional, HTML)
  - `tag` (required; one of `الأحدث` · `مشاريع` · `شراكات`)
  - `date` (required, `YYYY-MM-DD`)
  - `status` (required; `draft` | `published`)
  - `is_featured` (optional, boolean)
  - `slug` (optional; auto-derived from `title[ar]` if blank, unique)
  - `cover_image` (required on create, optional on update; `jpg`/`jpeg`/`png`/`webp`, ≤ 4 MB)
  - `share_image` (optional; same constraints)
  - `meta_title[ar|en]`, `meta_description[ar|en]` (optional, SEO)
  - On update, send `_method=PUT` over a POST. Supplying a new image replaces and
    deletes the old file; omitting it keeps the current one. Publishing a draft
    stamps `published_at` automatically.

Resource shape:
```json
{ "data": {
  "id": 1,
  "slug": "academy-relaunch",
  "title": "string",
  "excerpt": "string",
  "body": "<p>sanitised html…</p>",
  "tag": "الأحدث",
  "date": "2025-06-24",
  "cover_image": "https://… or null",
  "is_featured": true,
  "published_at": "2025-06-24T09:00:00+00:00",
  "seo": {
    "meta_title": "string or null",
    "meta_description": "string or null",
    "share_image": "https://… or null"
  }
} }
```

## Team (الفريق)

| Method | Path                  | Auth     | Permission     | Success |
|--------|-----------------------|----------|----------------|---------|
| GET    | `/api/v1/team`        | public   | —              | 200     |
| GET    | `/api/v1/team/{id}`   | public   | —              | 200     |
| POST   | `/api/v1/team`        | sanctum  | `team.create`  | 201     |
| PUT    | `/api/v1/team/{id}`   | sanctum  | `team.edit`    | 200     |
| DELETE | `/api/v1/team/{id}`   | sanctum  | `team.delete`  | 204     |

- `GET /api/v1/team` returns a **flat, ordered array** of members, each carrying
  its `group` object. Members are ordered by their group's `sort_order`, then the
  member's own `sort_order` (id as tiebreaker). The list is small and **not paginated**.
- **Filter by group:** `GET /api/v1/team?group={slug|id}` — matches a group by its
  numeric id OR its slug (e.g. `?group=board-of-directors`). An unknown group yields
  an empty `data` array with **200** (not 404), so the front can render an empty
  group page without special-casing errors.
- `GET /api/v1/team/{id}` returns a single member (same flat resource shape).
- `name` and `role` are localized strings (per the rules above). `photo` is a full
  public URL or `null` (the front renders an initials avatar when `null`). `email`
  is the member's public contact or `null`. `is_lead` flags the group's lead.
  `group` is `{ id, slug, name }` with a localized `name`.
- **Write bodies are `multipart/form-data`** (they may carry a photo upload). Fields:
  - `name[ar]` (required), `name[en]` (optional)
  - `role[ar]` (required), `role[en]` (optional) — the job title
  - `team_group_id` (required; integer; must exist in `team_groups`)
  - `is_lead` (optional, boolean; defaults false)
  - `email` (optional, valid email)
  - `photo` (optional on create and update; `jpg`/`jpeg`/`png`/`webp`, ≤ 4 MB)
  - `sort_order` (optional, int ≥ 0)
  - On update, send `_method=PUT` over a POST (multipart cannot ride a real PUT body).
    Supplying a new `photo` replaces and deletes the old file; omitting it keeps the
    current one.

List shape (`GET /api/v1/team`):
```json
{ "data": [
  { "id": 1, "name": "string", "role": "string",
    "group": { "id": 1, "slug": "board-of-directors", "name": "مجلس الإدارة" },
    "is_lead": true, "email": "string or null", "photo": "https://… or null",
    "sort_order": 0 }
] }
```

Detail shape (`GET /api/v1/team/{id}`) is a single member object of the same shape
wrapped in `{ "data": { … } }`.

## Team Groups (مجموعات الفريق)

| Method | Path                         | Auth     | Permission            | Success |
|--------|------------------------------|----------|-----------------------|---------|
| GET    | `/api/v1/team-groups`        | public   | —                     | 200     |
| GET    | `/api/v1/team-groups/{id}`   | public   | —                     | 200     |
| POST   | `/api/v1/team-groups`        | sanctum  | `team-groups.create`  | 201     |
| PUT    | `/api/v1/team-groups/{id}`   | sanctum  | `team-groups.edit`    | 200     |
| DELETE | `/api/v1/team-groups/{id}`   | sanctum  | `team-groups.delete`  | 204     |

- `GET /api/v1/team-groups` returns the ordered list of groups (by `sort_order`).
  Use the `slug` to filter the team endpoint (`/api/v1/team?group={slug}`). `name`
  is a localized string.
- Write bodies (JSON): `name[ar]` (required), `name[en]` (optional), `sort_order`
  (optional, int ≥ 0). `slug` is auto-derived from `name.ar` and never accepted from input.
- **Delete guard:** deleting a group that still has members returns **409**
  `{ "message": "لا يمكن حذف مجموعة مرتبطة بأعضاء." }` (the FK is `restrictOnDelete`).

Group shape:
```json
{ "data": [
  { "id": 1, "slug": "board-of-directors", "name": "مجلس الإدارة", "sort_order": 0 }
] }
```

## Stats (الأرقام)

| Method | Path                   | Auth     | Permission      | Success |
|--------|------------------------|----------|-----------------|---------|
| GET    | `/api/v1/stats`        | public   | —               | 200     |
| GET    | `/api/v1/stats/{id}`   | public   | —               | 200     |
| POST   | `/api/v1/stats`        | sanctum  | `stats.create`  | 201     |
| PUT    | `/api/v1/stats/{id}`   | sanctum  | `stats.edit`    | 200     |
| DELETE | `/api/v1/stats/{id}`   | sanctum  | `stats.delete`  | 204     |

- `GET /api/v1/stats` returns the **flat** list of site impact numbers ordered by
  `sort_order` ascending (id as tiebreaker). The set is small and fixed (the front
  renders all cards at once), so the list is **not paginated**.
- `value` is the bare integer the front animates with a count-up (no `+` sign —
  the front adds it). `suffix` and `label` are localized strings (per the rules
  above); `suffix` is the unit shown after the number (e.g. «مليون») and may be an
  **empty string** (most numbers carry no unit — an explicitly-empty translation
  stays empty rather than falling back to Arabic). `icon` is a full public URL or
  `null` (the front renders no icon when `null`).
- **Write bodies are `multipart/form-data`** (they may carry an icon upload). Fields:
  - `value` (required, integer ≥ 0)
  - `label[ar]` (required), `label[en]` (optional)
  - `suffix[ar]` (optional), `suffix[en]` (optional) — the unit; may be empty
  - `icon` (optional on create and update; `jpg`/`jpeg`/`png`/`webp`, ≤ 4 MB)
  - `sort_order` (optional, int ≥ 0)
  - On update, send `_method=PUT` over a POST (multipart cannot ride a real PUT body).
    Supplying a new `icon` replaces and deletes the old file; omitting it keeps the
    current one.

List shape:
```json
{ "data": [
  { "id": 1, "value": 5, "suffix": "مليون", "label": "string",
    "icon": "https://… or null", "sort_order": 0 },
  { "id": 2, "value": 180, "suffix": "", "label": "string",
    "icon": "https://… or null", "sort_order": 1 }
] }
```

Detail shape (`GET /api/v1/stats/{id}`):
```json
{ "data": {
  "id": 1,
  "value": 5,
  "suffix": "مليون",
  "label": "string",
  "icon": "https://… or null",
  "sort_order": 0
} }
```

## Governance (الحوكمة)

Two related entities: governance **categories** (تصنيفات الحوكمة) each owning many
governance **documents** (وثائق الحوكمة). A document belongs to exactly one
category via a `restrictOnDelete` FK.

### Governance categories

| Method | Path                                      | Auth     | Permission                       | Success |
|--------|-------------------------------------------|----------|----------------------------------|---------|
| GET    | `/api/v1/governance/categories`           | public   | —                                | 200     |
| GET    | `/api/v1/governance/categories/{id}`      | public   | —                                | 200     |
| POST   | `/api/v1/governance/categories`           | sanctum  | `governance-categories.create`   | 201     |
| PUT    | `/api/v1/governance/categories/{id}`      | sanctum  | `governance-categories.edit`     | 200     |
| DELETE | `/api/v1/governance/categories/{id}`      | sanctum  | `governance-categories.delete`   | 204     |

- `GET /api/v1/governance/categories` returns the **flat**, ordered list of
  categories (`sort_order` asc, id tiebreaker). Each carries a `documents_count`.
  The set is small and **not paginated**.
- `title` is a localized string (per the rules above); `description` is a localized
  string **or `null`**. `slug` is the stable Arabic-derived key the front filters
  documents with.
- **Write bodies are JSON.** Fields: `title[ar]` (required), `title[en]` (optional),
  `description[ar]` / `description[en]` (optional), `sort_order` (optional, int ≥ 0).
  `slug` is never accepted — it is derived from `title.ar` and stable thereafter.
- `DELETE` returns **409** (not 500) with `{ "message": "لا يمكن حذف تصنيف مرتبط بوثائق." }`
  when the category still has documents.

List shape:
```json
{ "data": [
  { "id": 1, "slug": "regulations", "title": "string", "description": "string or null",
    "sort_order": 0, "documents_count": 4 }
] }
```

### Governance documents

| Method | Path                                      | Auth     | Permission                      | Success |
|--------|-------------------------------------------|----------|---------------------------------|---------|
| GET    | `/api/v1/governance/documents`            | public   | —                               | 200     |
| GET    | `/api/v1/governance/documents/{id}`       | public   | —                               | 200     |
| POST   | `/api/v1/governance/documents`            | sanctum  | `governance-documents.create`   | 201     |
| PUT    | `/api/v1/governance/documents/{id}`       | sanctum  | `governance-documents.edit`     | 200     |
| DELETE | `/api/v1/governance/documents/{id}`       | sanctum  | `governance-documents.delete`   | 204     |

- `GET /api/v1/governance/documents` returns a **flat**, ordered list — each
  document carrying its `category` object (`{ id, slug, title }`). Ordered by the
  category's `sort_order` then the document's `sort_order`. The set is small and
  **not paginated**.
- Accepts an optional `?category={slug|id}` filter (numeric → id, else slug). An
  unknown category yields an **empty `data` (200)**, not a 404.
- `title` is a localized string; `description` is a localized string **or `null`**.
  `file` is a full public URL to the PDF **or `null`** (a document may be
  catalogued before its PDF is attached). `original_filename` is the human-readable
  name of the uploaded PDF (e.g. `اللائحة الأساسية.pdf`) **or `null`** — the stored
  path itself is always hashed. `document_year` is the editable Gregorian year.
- **Write bodies are `multipart/form-data`** (they carry a PDF upload). Fields:
  - `title[ar]` (required), `title[en]` (optional)
  - `description[ar]` / `description[en]` (optional)
  - `governance_category_id` (required; existing category id)
  - `document_year` (required, int; `1980 … currentYear+1`)
  - `file` (**required on create**, optional on update; `pdf` only, ≤ 15 MB)
  - `sort_order` (optional, int ≥ 0)
  - On update, send `_method=PUT` over a POST (multipart cannot ride a real PUT body).
    Supplying a new `file` replaces and deletes the old PDF; omitting it keeps the
    current one. `slug` is never accepted — derived from `title.ar`, stable thereafter.

List shape:
```json
{ "data": [
  { "id": 1, "slug": "لائحة-الحوكمة", "title": "string", "description": "string or null",
    "category": { "id": 1, "slug": "regulations", "title": "string" },
    "document_year": 2022, "file": "https://… or null",
    "original_filename": "string or null", "sort_order": 0 }
] }
```

Detail shape (`GET /api/v1/governance/documents/{id}`):
```json
{ "data": {
  "id": 1,
  "slug": "لائحة-الحوكمة",
  "title": "string",
  "description": "string or null",
  "category": { "id": 1, "slug": "regulations", "title": "string" },
  "document_year": 2022,
  "file": "https://… or null",
  "original_filename": "string or null",
  "sort_order": 0
} }
```

## Donor Satisfaction Survey (استبيان قياس رضا المانحين)

| Method | Path                                          | Auth     | Permission             | Success |
|--------|-----------------------------------------------|----------|------------------------|---------|
| POST   | `/api/v1/surveys/donor-satisfaction`          | public   | — (throttled 6/min/IP) | 201     |
| GET    | `/api/v1/surveys/donor-satisfaction`          | sanctum  | `donor-surveys.view`   | 200     |
| DELETE | `/api/v1/surveys/donor-satisfaction/{id}`     | sanctum  | `donor-surveys.delete` | 204     |

Submissions are **public-created, single-locale** records (not translatable). The
front posts ratings here; staff review and prune them from the admin. `created_at`
is the submission time, surfaced as `submitted_at`. `average_rating` is the mean of
the three 1–5 ratings, rounded to one decimal — computed, never stored.

### POST — public submission

- **Rate limited** to `throttle:6,1` (6 requests/minute/IP); the 7th returns `429`.
- **Honeypot:** a hidden `website` field. If it is **non-empty** the request is
  treated as a bot — the endpoint returns `201` **without storing anything** and the
  honeypot is never persisted. A real submission leaves `website` empty.
- At least one contact is required (`phone` *or* `email`).
- Body (`application/json` or form): 
  - `entity_type` (required, one of `فرد` / `مؤسسة`)
  - `entity_name` (required, ≤ 255)
  - `phone` (`required_without:email`; Saudi mobile `^05\d{8}$`)
  - `email` (`required_without:phone`; valid email, ≤ 255)
  - `donation` / `clarity` / `comm` (each required int, `1..5`)
- Success returns a lean Arabic thank-you; donor PII is never echoed back:
```json
{ "message": "شكرًا لمشاركتك، تم استلام تقييمك بنجاح." }
```
- `422` on validation failure with Arabic messages.

Example request:
```json
{
  "entity_type": "مؤسسة",
  "entity_name": "مؤسسة نماء الخيرية",
  "phone": "0512345678",
  "email": "info@namaa.example",
  "donation": 5,
  "clarity": 4,
  "comm": 5
}
```

### GET — secured, paginated review list

- Sanctum + `donor-surveys.view`. Paginated (15/page), default sort `created_at` desc.
- Filters (all optional, guarded): `?entity_type=فرد|مؤسسة`, `?date_from=YYYY-MM-DD`,
  `?date_to=YYYY-MM-DD` (inclusive, on `created_at`), `?min_avg=` (1–5, minimum
  average rating). Arabic query values must be URL-encoded.

Resource shape:
```json
{ "data": [
  { "id": 1, "entity_type": "مؤسسة", "entity_name": "string",
    "phone": "0512345678 or null", "email": "info@… or null",
    "donation": 5, "clarity": 4, "comm": 5,
    "average_rating": 4.7, "submitted_at": "2026-06-29T12:00:00+00:00" }
], "links": { … }, "meta": { … } }
```

### DELETE — secured

- Sanctum + `donor-surveys.delete`. Returns `204` on success.
