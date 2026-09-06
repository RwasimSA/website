# Alborhan Admin — Data Model Spec

Approved at CHECKPOINT 2. Source of truth for Phase 3 entity slices. Cross-checked against the live front (`/Users/wabualela/Sites/alborhan.sa`, `demo.alborhan.sa`).

## Conventions
- RTL Arabic-first. Translatable fields carry **ar + en** via `spatie/laravel-translatable` (JSON columns).
- News body edited with a WYSIWYG editor (Tiptap); stored as HTML per locale.
- Single images on the `public` disk. Admin lists paginate.
- Each entity self-registers `{entity}.view|create|edit|delete` into `PermissionRegistry` (5 new roles-matrix rows).
- Build order: **Categories → Projects → News → Team → Stats** (Categories first; Projects depends on it).

## Entities

### categories — تصنيفات المشاريع
- `slug` string unique (auto from name) · `name` **ar/en**
- Seeded: تطوير منتجات ذكية · التمكين والتدريب · المعايير والجودة · نماذج الأعمال
- `hasMany` projects · Public API: yes (filter labels) · List: simple

### projects — المشاريع
- `title` **ar/en** (searchable) · `description` **ar/en** · `category_id` FK→categories (filterable) · `image` upload · `project_logo` upload nullable (brand mark, separate from `image`, handled independently) · `project_link` url nullable · `donation_link` url nullable · `sort_order` int (manual drag)
- `belongsTo` category · Public API: all fields · No draft state (all public)
- Admin list: search title, filter category, drag-reorder (drives public order), default newest-first

### news — الأخبار
- `slug` string unique (auto from title, editable) · `title`/`excerpt`/`body` **ar/en** (body = rich HTML) · `tag` enum (الأحدث·مشاريع·شراكات) · `date` date · `cover_image` upload · `status` enum draft/published + `published_at` · `is_featured` bool · `meta_title`/`meta_description` **ar/en** · `share_image` upload
- Public API: published only, full content
- Admin list: search title, filter tag+status, sort date-desc, featured pick

### team_groups — مجموعات الفريق
- `slug` string unique (auto from name) · `name` **ar/en** · `sort_order` int
- Seeded: مجلس الإدارة · الإدارة التنفيذية · الجمعية العمومية · مدراء الفروع
- `hasMany` team_members (`restrictOnDelete` — delete guarded with graceful 409) · Public API: yes · Nested under الفريق menu
- Replaced the old hardcoded board/executive enum: groups are now a dynamic CRUD entity.

### team_members — الفريق
- `name`/`role` **ar/en** · `photo` upload · `team_group_id` FK→team_groups (filterable) · `is_lead` bool · `email` nullable · `sort_order` int
- `belongsTo` team_group · Public API: flat list, each member carries its `group` object; `?group={slug|id}` filter · Admin list: filter by dynamic group, drag-order

### stats — الأرقام
- `value` int · `suffix` **ar/en** (e.g. مليون) · `label` **ar/en** · `icon` upload · `sort_order` int
- Public API: all

### donor_survey_submissions — استبيانات المانحين
- `entity_type` enum (`فرد`/`مؤسسة`, indexed) · `entity_name` string · `phone` nullable (Saudi `^05\d{8}$`) · `email` nullable · `donation`/`clarity`/`comm` tinyint 1–5 · `created_at` indexed (= submission time, exposed as `submitted_at`)
- **Not translatable** — public-created, single-locale, user-entered. `average_rating` = mean of the 3 ratings, rounded 1 decimal (**computed, not stored**).
- Public **POST** `/api/v1/surveys/donor-satisfaction` (`throttle:6,1` + hidden `website` honeypot → silent bot drop; at least one of phone/email required). Secured **GET** (paginated 15, filters `entity_type`/`date_from`/`date_to`/`min_avg`) + **DELETE**, gated `donor-surveys.view`/`donor-surveys.delete`.
- Admin: read-only — filtered list + permission-gated delete + CSV export (UTF-8 BOM). No create/edit screens.

## API surface
`GET /api/v1/{categories,projects,news,team,team-groups,stats}` — public reads (news = published only). `team` accepts `?group={slug|id}`.
Writes (`POST/PUT/DELETE`) behind Sanctum + per-entity policy (registry-driven).
