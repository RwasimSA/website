# Handoff — Frontend ↔ API Integration

**Audience:** the agent/developer wiring the Alborhan marketing frontend (`/Users/wabualela/Sites/alborhan.sa`, a Vite + React SPA) to this backend's public API.
**Goal:** replace the front's hardcoded/static content with live data from `/api/v1`, so the team's admin edits appear on the site.
**Status:** the backend API is complete, tested, and documented. One front page — the **Donor Satisfaction Survey** — is already wired and is your reference implementation.

Read [`docs/api.md`](api.md) for the exact request/response of every endpoint. This file is the task list and conventions; `api.md` is the contract.

---

## 1. Setup (do this first)

- **API base URL:** configurable via Vite env. The survey already uses:
  ```js
  const API_BASE = import.meta.env.VITE_API_BASE_URL || 'https://admin.alborhan.sa'
  ```
  Set `VITE_API_BASE_URL` in the front's `.env` to the real admin/API host (see `.env.example`, already added).
- **CORS:** the API allows `alborhan.sa`, `demo.alborhan.sa`, and localhost dev ports. If you serve the front from another origin, add it to the admin's `config/cors.php`.
- **Build a tiny shared API client** (recommended) so every page doesn't repeat fetch boilerplate. Suggested `src/lib/api.js`:
  ```js
  const BASE = (import.meta.env.VITE_API_BASE_URL || 'https://admin.alborhan.sa').replace(/\/$/, '')
  export async function apiGet(path, { locale = 'ar', signal } = {}) {
    const res = await fetch(`${BASE}/api/v1${path}`, {
      headers: { Accept: 'application/json', 'Accept-Language': locale },
      signal,
    })
    if (!res.ok) throw new Error(`API ${res.status} on ${path}`)
    return res.json()
  }
  ```

## 2. Conventions (apply to every page)

- **Localization:** send `Accept-Language: ar` (or `?locale=ar|en`). Responses return single localized strings per the request locale, falling back to Arabic. If the site is Arabic-only today, always send `ar`.
- **Response shape:** list endpoints return `{ "data": [ … ] }`. Paginated endpoints (none of the public reads except the secured survey list) add `links`/`meta`. Detail endpoints return `{ "data": { … } }`.
- **Media URLs are absolute and ready to use** — image/photo/icon/file fields come back as full public URLs or `null`. Render an appropriate placeholder when `null` (e.g. initials avatar for team, no-logo fallback for projects).
- **Loading / empty / error states:** every data section needs all three. Use a pulsing skeleton while loading (match the glass/brand look), an empty state when `data` is `[]`, and a graceful fallback message on fetch error — never a blank screen or a crash.
- **Rate limit:** public reads are capped at **60 requests/min per IP**. Fetch each section once per view; don't poll. A 429 returns `{ "message": "عدد كبير من الطلبات. حاول لاحقًا." }`.
- **Errors:** the API uses a uniform envelope — `{ "message": "…", "errors"?: { field: [msgs] } }`. Surface `message` (already Arabic) to users where relevant.
- **Cancellation:** pass an `AbortController.signal` and abort on unmount to avoid state-update-after-unmount.

## 3. Page-by-page task list

Replace the static sources (`src/data/projects.js`, `src/data/news.js`, and hardcoded arrays in the listed pages) with live fetches. Delete the static data files once nothing imports them.

| Front page/component | Endpoint(s) | Notes |
|---|---|---|
| `OurProjects.jsx`, `Initiatives.jsx`, `Investments.jsx` (whatever renders `src/data/projects.js`) | `GET /projects`, `GET /categories` | Each project has `title`, `description`, `category`, `image`, `project_logo` (nullable), `project_link` (nullable), `donation_link` (nullable), `sort_order`. Order is already the admin's drag order. Use `categories` for filter labels. Render the donation button only when `donation_link` is set. |
| `LatestNews.jsx` | `GET /news` | Published news only, newest first. Fields: `slug`, `title`, `excerpt`, `tag`, `date`, `cover_image`, `is_featured`. Link each card to the single post by `slug`. |
| `SinglePost.jsx` | `GET /news/{slug}` | Full article incl. `body` (sanitized HTML — render with `dangerouslySetInnerHTML`, it's server-sanitized) and meta fields. Handle 404 → "not found" view. |
| `Board.jsx` | `GET /team?group=board-of-directors` | Team members for that group. Each carries `name`, `role`, `photo` (nullable), `is_lead`, `email`, `group{ id, slug, name }`. |
| `Executive.jsx` | `GET /team?group=executive-management` | Same shape. |
| `GeneralAssembly.jsx` | `GET /team?group=general-assembly` | Same. |
| `ManagersBranches.jsx` | `GET /team?group=branch-managers` | Same. |
| (optional team nav) | `GET /team-groups` | If you want to render the group list/labels dynamically instead of hardcoding the 4 slugs. |
| `ImpactDashboard.jsx` | `GET /stats` | Each stat: `value`, `suffix`, `label`, `icon`, `sort_order`. Drive the counters from this. |
| `Disclosure.jsx`, `PoliciesRegulations.jsx`, `FinancialReports.jsx`, `AssemblyMinutes.jsx`, `ProgramReports.jsx`, `RegistrationCertificate.jsx` (and `DocsGrid.jsx`) | `GET /governance/categories`, `GET /governance/documents?category={slug}` | Categories carry `documents_count`. Each document: `title`, `description`, `document_year`, `file` (full PDF URL or null), `original_filename`, `category{ id, slug, title }`. Map each governance page to its category slug and link/download the `file`. Slugs are set in the admin — confirm them via `GET /governance/categories`. |
| `SatisfactionSurvey.jsx` | `POST /surveys/donor-satisfaction` | **Already done** — use it as the reference for env, headers, error handling, and the honeypot. |

Pages with no dynamic content (e.g. `AboutUs`, `StrategicDirection`, `OrgStructure`, `Volunteer`, `ComingSoon`) stay static unless the team asks otherwise.

## 4. What NOT to do

- Do **not** call the secured/admin endpoints (writes, the survey **GET** review list, `DELETE`s) from the public front — those require a Sanctum token and are for the dashboard only.
- Do **not** hardcode the API host — always read `VITE_API_BASE_URL`.
- Do **not** re-sanitize or strip news `body` HTML — it's already sanitized server-side; just render it.

## 5. Acceptance criteria

- Every section above reads live data; the static `src/data/*.js` arrays are removed.
- Loading, empty, and error states exist for each data-driven section.
- An admin edit (e.g. adding a project or publishing a news item) is reflected on the front after refresh.
- `npm run build` passes; no console errors; no requests to a hardcoded host.
- Arabic content renders correctly (RTL, `Accept-Language: ar`).

## 6. Open questions to confirm with the team

- Final production API host (to set `VITE_API_BASE_URL` and the CORS allow-list).
- Governance category slugs (read them from `GET /governance/categories`; the seed uses `regulations`, `policies`, `reports`, `meeting-minutes`, but the team may add/rename).
- Whether any "static" page should actually be admin-managed (would need a new backend entity — out of scope for this integration pass).
