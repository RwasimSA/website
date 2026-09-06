import { motion } from 'framer-motion'
import { glass, color } from '../theme'
import { text } from '../typography'

const navLinks = [
  { label: 'عن رواسم', page: 'about-us' },
  { label: 'برامجنا', page: 'programs' },
  { label: 'أثرنا', page: 'impact' },
  { label: 'الشراكات', page: 'partners' },
  { label: 'المركز الإعلامي', page: 'news' },
  { label: 'تواصل معنا', page: 'inquiries' },
]
const bottomLinks = [
  { label: 'اللوائح والسياسات', page: 'gov-policies' },
  { label: 'الشكاوى والبلاغات', page: 'gov-complaints' },
  { label: 'التقارير', page: 'gov-reports' },
]

/* بيانات التواصل الرسمية */
const CONTACT = {
  phone: '0501663298',
  whatsapp: 'https://wa.me/966501663298',
  email: 'info@Rwasim.sa',
  website: 'www.Rwasim.sa',
  location: 'الرياض — حي الشفا',
  store: 'https://rwasim-stor.com/',
}

/* أيقونات */
const PinIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
  </svg>
)
const PhoneIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
)
const MailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 5L2 7" />
  </svg>
)
const GlobeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
)

/* حسابات التواصل — المعرّف الموحّد RwasimSA */
const socials = [
  { label: 'يوتيوب', href: 'https://www.youtube.com/@RwasimSA', icon: <><rect x="2" y="5" width="20" height="14" rx="4" /><path d="m10 9 5 3-5 3z" fill="currentColor" stroke="none" /></> },
  { label: 'إنستجرام', href: 'https://www.instagram.com/RwasimSA', icon: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></> },
  { label: 'سناب شات', href: 'https://www.snapchat.com/add/RwasimSA', icon: <path d="M12 2.5c2.9 0 4.9 2.1 4.9 5v2.4c.7 1 1.8 1.5 2.9 1.7-.3 1-1.2 1.6-2.3 1.8.2.9 1 1.5 2.3 1.8-.5 1.2-1.9 1.9-3.5 2-.6 1.3-2.2 2.3-4.3 2.3s-3.7-1-4.3-2.3c-1.6-.1-3-.8-3.5-2 1.3-.3 2.1-.9 2.3-1.8-1.1-.2-2-.8-2.3-1.8 1.1-.2 2.2-.7 2.9-1.7V7.5c0-2.9 2-5 4.9-5z" /> },
  { label: 'إكس', href: 'https://x.com/RwasimSA', icon: <path d="M4 4l16 16M20 4 4 20" /> },
]

const ColTitle = ({ children }) => (
  <h3 style={{ ...text.cardTitle, fontSize: '16px', marginBottom: '22px', position: 'relative', paddingBottom: '12px' }}>
    {children}
    <span style={{ position: 'absolute', bottom: 0, right: 0, width: '30px', height: '2px', borderRadius: '2px', background: 'linear-gradient(90deg, #ef9122, transparent)' }} />
  </h3>
)


export default function Footer({ onTop, onOpenPage = () => {} }) {
  return (
    <section className="relative flex min-h-screen flex-col justify-center px-6 py-16 md:px-16" dir="rtl">
      <div className="mx-auto w-full max-w-6xl">

        {/* الأعمدة */}
        <div className="grid grid-cols-2 items-stretch gap-x-10 gap-y-12 md:grid-cols-[1.4fr_1fr_1.3fr_1.1fr]">

          {/* العمود 1: العلامة */}
          <div className="col-span-2 flex h-full flex-col md:col-span-1">
            <div className="mb-5 flex items-center">
              <img src="/images/rawasim-logo-white.svg" alt="جمعية رواسم لتنمية الطفل" className="h-14 w-auto object-contain" />
            </div>
            <p style={{ color: 'white', fontWeight: 300, fontSize: '13px', lineHeight: 1.8, marginBottom: '22px' }}>
              جمعية رواسم لتنمية الطفل، جمعية مرخصة من المركز الوطني لتنمية القطاع غير الربحي برقم (5170)،
              نسعى لتنمية الطفل وتعزيز قدراته في الجوانب المعرفية والسلوكية.
            </p>
            <div className="mt-auto flex gap-3 pt-2">
              {socials.map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                  className="footer-social flex h-9 w-9 items-center justify-center"
                  style={{ ...glass(), borderRadius: '12px', color: 'white' }}>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">{s.icon}</svg>
                </a>
              ))}
            </div>
          </div>

          {/* العمود 2: روابط */}
          <div className="flex h-full flex-col">
            <ColTitle>روابط</ColTitle>
            <ul className="flex flex-col gap-3">
              {navLinks.map((l) => (
                <li key={l.label}>
                  <a href="#" className="footer-link inline-block" style={{ color: 'white', fontWeight: 300, fontSize: '14px' }}
                    onClick={(e) => { e.preventDefault(); onOpenPage(l.page) }}>{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* العمود 3: متجر رواسم */}
          <div className="flex h-full flex-col">
            <ColTitle>متجر رواسم</ColTitle>
            <a href={CONTACT.store} target="_blank" rel="noopener noreferrer"
              className="footer-bank group block"
              style={glass({ padding: '18px', textAlign: 'right', cursor: 'pointer' })}>
              <div className="mb-2 flex items-center justify-between">
                <span style={{ color: 'white', fontWeight: 500, fontSize: '14px' }}>تسوّق وادعم الأثر</span>
                <span className="transition-transform duration-300 group-hover:-translate-x-1" style={{
                  width: '34px', height: '34px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'linear-gradient(135deg, #ef9122 0%, #c9760f 100%)', boxShadow: '0 0 12px rgba(239,145,34,0.45)' }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 5 12 12 19" />
                  </svg>
                </span>
              </div>
              <div dir="ltr" style={{ color: '#bcd9e6', fontWeight: 300, fontSize: '13px', textAlign: 'right' }}>rwasim-stor.com</div>
            </a>
          </div>

          {/* العمود 4: تواصل معنا */}
          <div className="flex h-full flex-col">
            <ColTitle>تواصل معنا</ColTitle>
            <ul className="flex flex-col gap-4">
              {[
                { icon: <PinIcon />, text: CONTACT.location },
                { icon: <PhoneIcon />, text: CONTACT.phone, ltr: true, href: CONTACT.whatsapp },
                { icon: <MailIcon />, text: CONTACT.email, ltr: true, href: `mailto:${CONTACT.email}` },
                { icon: <GlobeIcon />, text: CONTACT.website, ltr: true, href: `https://${CONTACT.website}` },
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span style={{ color: color.copper, marginTop: '2px', flexShrink: 0 }}>{item.icon}</span>
                  {item.href ? (
                    <a href={item.href} target="_blank" rel="noopener noreferrer" dir={item.ltr ? 'ltr' : 'rtl'}
                      className="footer-link"
                      style={{ color: 'white', fontWeight: 300, fontSize: '13px', lineHeight: 1.7, textAlign: 'right' }}>{item.text}</a>
                  ) : (
                    <span dir={item.ltr ? 'ltr' : 'rtl'} style={{ color: 'white', fontWeight: 300, fontSize: '13px', lineHeight: 1.7, textAlign: 'right' }}>{item.text}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* فاصل */}
        <div style={{ height: '0.5px', background: 'rgba(255,255,255,0.12)', margin: '40px 0 24px' }} />

        {/* الشريط السفلي */}
        <div className="flex flex-col-reverse items-center gap-4 md:flex-row md:justify-between">
          <p style={{ color: 'white', fontWeight: 300, fontSize: '12px' }}>
            © جميع الحقوق محفوظة لجمعية رواسم لتنمية الطفل — 2026
          </p>
          <div className="flex items-center gap-6">
            {bottomLinks.map((l) => (
              <a key={l.label} href="#" className="footer-link inline-block" style={{ color: 'white', fontWeight: 300, fontSize: '13px' }}
                onClick={(e) => { e.preventDefault(); onOpenPage(l.page) }}>{l.label}</a>
            ))}
          </div>
        </div>
      </div>

      {/* زر العودة للأعلى */}
      <motion.button
        onClick={onTop} aria-label="العودة للأعلى"
        whileHover={{ y: -3, scale: 1.06 }} whileTap={{ scale: 0.94 }}
        className="absolute bottom-8 left-6 flex h-12 w-12 items-center justify-center rounded-full md:left-16"
        style={glass({ borderRadius: '50%', cursor: 'pointer' })}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="19" x2="12" y2="5" /><polyline points="6 11 12 5 18 11" />
        </svg>
      </motion.button>
    </section>
  )
}
