import site from '../content/site.json'

/* ─────────────────────────────────────────────────────────────
   حسابات التواصل الاجتماعي — مصدر واحد للفوتر وصفحة التواصل.
   الروابط تُحرَّر من لوحة التحكم (site.socials = {منصة: رابط})؛
   الحساب الفارغ لا يظهر. وإن لم تُحفظ القائمة بعد في اللوحة تُستعمل
   الحسابات المعتمدة الحالية (المعرّف الموحّد RwasimSA).
   ───────────────────────────────────────────────────────────── */

/* المنصات المدعومة بترتيب الظهور — مع أيقونة خطية لكل منصة */
export const PLATFORMS = [
  { key: 'x', label: 'إكس', icon: <path d="M4 4l16 16M20 4 4 20" /> },
  { key: 'instagram', label: 'إنستجرام', icon: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></> },
  { key: 'youtube', label: 'يوتيوب', icon: <><rect x="2" y="5" width="20" height="14" rx="4" /><path d="m10 9 5 3-5 3z" fill="currentColor" stroke="none" /></> },
  { key: 'snapchat', label: 'سناب شات', icon: <path d="M12 2.5c2.9 0 4.9 2.1 4.9 5v2.4c.7 1 1.8 1.5 2.9 1.7-.3 1-1.2 1.6-2.3 1.8.2.9 1 1.5 2.3 1.8-.5 1.2-1.9 1.9-3.5 2-.6 1.3-2.2 2.3-4.3 2.3s-3.7-1-4.3-2.3c-1.6-.1-3-.8-3.5-2 1.3-.3 2.1-.9 2.3-1.8-1.1-.2-2-.8-2.3-1.8 1.1-.2 2.2-.7 2.9-1.7V7.5c0-2.9 2-5 4.9-5z" /> },
  { key: 'linkedin', label: 'لينكدإن', icon: <><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7" /></> },
  { key: 'tiktok', label: 'تيك توك', icon: <path d="M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5M14 3c.4 2.6 2.2 4.4 5 4.6" /> },
  { key: 'facebook', label: 'فيسبوك', icon: <path d="M15 3h-2.5A3.5 3.5 0 0 0 9 6.5V10H6.5v3.5H9V21h3.5v-7.5H15l.5-3.5h-3V7a1 1 0 0 1 1-1H15z" /> },
  { key: 'telegram', label: 'تيليجرام', icon: <path d="M21 4 3 11l6 2 2 6 3-4 5 4 2-15zM9 13l9-7" /> },
  { key: 'whatsapp', label: 'واتساب', icon: <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8z" /> },
]

/* الحسابات المعتمدة الحالية — تُستعمل حتى تُحفظ القائمة من اللوحة */
const DEFAULTS = {
  x: 'https://x.com/RwasimSA',
  instagram: 'https://www.instagram.com/RwasimSA',
  youtube: 'https://www.youtube.com/@RwasimSA',
  snapchat: 'https://www.snapchat.com/add/RwasimSA',
}

/* الحسابات الظاهرة: ما له رابط فقط، بترتيب المنصات أعلاه */
export const activeSocials = () => {
  const saved = site.socials && typeof site.socials === 'object' ? site.socials : null
  const src = saved || DEFAULTS
  return PLATFORMS
    .map((p) => ({ ...p, href: typeof src[p.key] === 'string' ? src[p.key].trim() : '' }))
    .filter((p) => /^https?:\/\//i.test(p.href))
}

export const SocialIcon = ({ icon, size = 17 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{icon}</svg>
)
