import { useState } from 'react'
import { motion } from 'framer-motion'
import { glass } from '../theme'
import site from '../../content/site.json'

/* ─────────────────────────────────────────────────────────────
   صفحة «تواصل معنا» — وفق خطة المحتوى المعتمدة:
   الافتتاحية | قنوات التواصل (البيانات الرسمية الحالية) |
   أرسل لنا رسالة (الاسم/وسيلة التواصل/الموضوع/الرسالة — تُرسل
   عبر واتساب أو البريد من جهاز الزائر، حتى يُعتمد نموذج خلفي)
   | توجيه المسارات المتخصصة (شراكات/شكاوى/تسجيل) | الوصول إلينا
   (المقر إداري — يكفي العنوان ضمن البيانات).
   قاعدة الخطة: نموذج التواصل العام ليس صندوقاً واحداً لكل الطلبات.
   ───────────────────────────────────────────────────────────── */

const titleFont = "'TheYearofHandicrafts', 'IBM Plex Sans Arabic', sans-serif"
const ACCENT = '#ef9122'

const PHONE_DISPLAY = '0501663298'
const PHONE_INTL = '966501663298'
const EMAIL = 'info@Rwasim.sa'

const CHANNELS = [
  {
    k: 'البريد الإلكتروني الرسمي', v: EMAIL, href: `mailto:${EMAIL}`, ltr: true,
    icon: <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zm18 2l-10 7L2 6" />,
  },
  {
    k: 'الهاتف الرسمي', v: PHONE_DISPLAY, href: `tel:+${PHONE_INTL}`, ltr: true,
    icon: <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />,
  },
  {
    k: 'واتساب', v: PHONE_DISPLAY, href: `https://wa.me/${PHONE_INTL}`, ltr: true,
    icon: <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8z" />,
  },
  {
    k: 'المقر', v: 'الرياض — حي الشفا', ltr: false,
    icon: <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></>,
  },
]

const SOCIALS = [
  { label: 'إكس', href: 'https://x.com/RwasimSA' },
  { label: 'إنستجرام', href: 'https://www.instagram.com/RwasimSA' },
  { label: 'يوتيوب', href: 'https://www.youtube.com/@RwasimSA' },
  { label: 'سناب شات', href: 'https://www.snapchat.com/add/RwasimSA' },
]

/* المسارات المتخصصة — كل طلب لقناته (قاعدة الخطة) */
const ROUTES = [
  { title: 'طلبات الشراكة', desc: 'عبر صفحة الشراكات — اقترح شراكة.', page: 'partners', label: 'صفحة الشراكات' },
  { title: 'الشكاوى والبلاغات', desc: 'عبر القناة الرسمية في الحوكمة.', page: 'gov-complaints', label: 'الشكاوى والبلاغات' },
  { title: 'التسجيل والمشاركة', desc: 'عبر صفحة البرنامج أو الفرصة الحالية.', page: 'programs', label: 'صفحة برامجنا' },
]

const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
})

const SectionTitle = ({ children, delay = 0 }) => (
  <motion.div {...rise(delay)} className="mb-4 flex flex-col items-center">
    <h2 className="text-center text-white"
      style={{ fontFamily: titleFont, fontWeight: 700, fontSize: 'clamp(26px, 3vw, 38px)', lineHeight: 1.4, margin: 0 }}>
      {children}
    </h2>
    <span aria-hidden="true" className="mt-3 block h-[3px] w-14 rounded-full"
      style={{ background: `linear-gradient(90deg, transparent, ${ACCENT}, transparent)`, boxShadow: `0 0 14px ${ACCENT}66` }} />
  </motion.div>
)

const inputStyle = {
  width: '100%', borderRadius: '16px', padding: '14px 18px',
  background: 'rgba(255,255,255,0.06)', border: '0.5px solid rgba(255,255,255,0.18)',
  color: 'white', fontWeight: 300, fontSize: '14.5px', outline: 'none',
  fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif",
}

export default function Contact({ onOpenPage = () => {} }) {
  const [form, setForm] = useState({ name: '', contact: '', subject: '', message: '' })
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))
  const filled = form.name.trim() && form.message.trim()

  const composed = () =>
    `رسالة من موقع رواسم:%0A%0Aالاسم: ${encodeURIComponent(form.name)}%0Aوسيلة التواصل: ${encodeURIComponent(form.contact || '-')}%0Aالموضوع: ${encodeURIComponent(form.subject || '-')}%0A%0A${encodeURIComponent(form.message)}`

  const sendWhatsapp = () => window.open(`https://wa.me/${PHONE_INTL}?text=${composed()}`, '_blank', 'noopener')
  const sendEmail = () =>
    (window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(form.subject || 'رسالة من موقع رواسم')}&body=${composed()}`)

  return (
    <div dir="rtl" className="relative w-full overflow-hidden pb-28">

      {/* ═══ افتتاحية التواصل ═══ */}
      <div className="relative overflow-hidden" style={{ paddingTop: '150px', paddingBottom: '80px' }}>
        <div className="pointer-events-none absolute inset-0">
          {site.heroImage && <img src={site.heroImage} alt="" aria-hidden="true" draggable="false"
            className="h-full w-full object-cover" />}
          <div style={{ position: 'absolute', inset: 0,
            background: 'linear-gradient(180deg, rgba(8,38,51,0.92) 0%, rgba(13,58,77,0.84) 45%, rgba(4,23,32,0.97) 100%)' }} />
        </div>
        <div className="relative mx-auto flex w-full max-w-4xl flex-col items-center px-6 text-center">
          <motion.h1 {...rise(0)} className="mb-6 text-white"
            style={{ fontFamily: titleFont, fontWeight: 700, fontSize: 'clamp(34px, 4.4vw, 56px)', lineHeight: 1.4 }}>
            تواصل معنا
          </motion.h1>
          <motion.span {...rise(0.05)} aria-hidden="true" className="mb-7 block h-[3px] w-16 rounded-full"
            style={{ background: `linear-gradient(90deg, transparent, ${ACCENT}, transparent)`, boxShadow: `0 0 14px ${ACCENT}66` }} />
          <motion.p {...rise(0.1)} className="max-w-3xl"
            style={{ color: '#dcebf2', fontWeight: 300, fontSize: '16px', lineHeight: 2.05, margin: 0 }}>
            نسعد بتواصلك، ويسعدنا توجيه رسالتك إلى الفريق المعني في رواسم. للاستفسارات العامة والملاحظات
            المتعلقة بالجمعية وبرامجها، يمكنك التواصل معنا عبر القنوات التالية.
          </motion.p>
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-6 pt-16 md:px-10 md:pt-24">

        {/* ═══ قنوات التواصل ═══ */}
        <SectionTitle>قنوات التواصل</SectionTitle>
        <div className="mb-8 mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CHANNELS.map((c, i) => (
            <motion.div key={c.k} {...rise(0.05 * i)}
              whileHover={{ y: -4, transition: { duration: 0.22 } }}
              className="flex flex-col items-center text-center"
              style={glass({ borderRadius: '24px', padding: '28px 20px' })}>
              <span className="mb-4 flex h-[54px] w-[54px] items-center justify-center rounded-full"
                style={{ background: 'rgba(239,145,34,0.12)', border: '0.5px solid rgba(239,145,34,0.35)' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f4a63f" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  {c.icon}
                </svg>
              </span>
              <span className="mb-1.5 block" style={{ color: '#a2becf', fontWeight: 400, fontSize: '12.5px' }}>{c.k}</span>
              {c.href ? (
                <a href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                  className="footer-link" dir={c.ltr ? 'ltr' : undefined}
                  style={{ color: 'white', fontWeight: 600, fontSize: '15.5px', textDecoration: 'none' }}>
                  {c.v}
                </a>
              ) : (
                <span style={{ color: 'white', fontWeight: 600, fontSize: '15.5px' }}>{c.v}</span>
              )}
            </motion.div>
          ))}
        </div>
        {/* الحسابات الرسمية */}
        <motion.div {...rise(0.1)} className="mb-24 flex flex-wrap items-center justify-center gap-3">
          <span style={{ color: '#a2becf', fontWeight: 300, fontSize: '13.5px' }}>حساباتنا الرسمية:</span>
          {SOCIALS.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
              style={{ ...glass({ borderRadius: '999px', padding: '8px 18px' }), color: 'white', fontWeight: 500, fontSize: '13px',
                textDecoration: 'none', border: '0.5px solid rgba(239,145,34,0.3)' }}>
              {s.label}
            </a>
          ))}
        </motion.div>

        {/* ═══ أرسل لنا رسالة ═══ */}
        <SectionTitle>أرسل لنا رسالة</SectionTitle>
        <motion.div {...rise(0.08)} className="relative mx-auto mb-10 max-w-3xl overflow-hidden"
          style={glass({ borderRadius: '30px', padding: 'clamp(28px, 4.5vw, 46px)' })}>
          <div aria-hidden="true" className="pointer-events-none absolute"
            style={{ top: '-40%', right: '-10%', width: '45%', height: '110%', borderRadius: '50%',
              background: 'radial-gradient(ellipse, rgba(239,145,34,0.13) 0%, transparent 65%)', filter: 'blur(55px)' }} />
          <div className="relative grid gap-4 sm:grid-cols-2">
            <input style={inputStyle} className="sub-input" placeholder="الاسم" value={form.name} onChange={set('name')} />
            <input style={inputStyle} className="sub-input" placeholder="وسيلة التواصل (جوال أو بريد)" value={form.contact} onChange={set('contact')} />
            <input style={{ ...inputStyle, gridColumn: '1 / -1' }} className="sub-input" placeholder="موضوع الرسالة" value={form.subject} onChange={set('subject')} />
            <textarea style={{ ...inputStyle, gridColumn: '1 / -1', minHeight: '140px', resize: 'vertical' }} className="sub-input"
              placeholder="اكتب رسالتك هنا…" value={form.message} onChange={set('message')} />
          </div>
          <div className="relative mt-6 flex flex-wrap items-center justify-center gap-3">
            <motion.button
              type="button" onClick={sendWhatsapp} disabled={!filled}
              whileHover={filled ? { scale: 1.04 } : {}} whileTap={filled ? { scale: 0.97 } : {}}
              className="flex items-center gap-2.5"
              style={{ borderRadius: '999px', padding: '13px 26px', border: 'none',
                cursor: filled ? 'pointer' : 'not-allowed', opacity: filled ? 1 : 0.45,
                background: 'linear-gradient(135deg, #ef9122 0%, #c9760f 100%)',
                boxShadow: filled ? '0 10px 26px rgba(239,145,34,0.35)' : 'none' }}>
              <span style={{ color: 'white', fontWeight: 600, fontSize: '14.5px' }}>أرسل عبر واتساب</span>
            </motion.button>
            <motion.button
              type="button" onClick={sendEmail} disabled={!filled}
              whileHover={filled ? { scale: 1.04 } : {}} whileTap={filled ? { scale: 0.97 } : {}}
              className="flex items-center gap-2.5"
              style={{ ...glass({ borderRadius: '999px', padding: '13px 26px' }),
                cursor: filled ? 'pointer' : 'not-allowed', opacity: filled ? 1 : 0.45 }}>
              <span style={{ color: 'white', fontWeight: 500, fontSize: '14.5px' }}>أو أرسل بريدًا إلكترونيًا</span>
            </motion.button>
          </div>
          <p className="relative mt-5 text-center" style={{ color: '#8fb0c1', fontWeight: 300, fontSize: '12px', margin: '18px 0 0' }}>
            تُرسل الرسالة من جهازك مباشرة عبر واتساب أو بريدك الإلكتروني.
          </p>
        </motion.div>

        {/* توجيه المسارات المتخصصة */}
        <div className="mb-24 grid gap-4 md:grid-cols-3">
          {ROUTES.map((r, i) => (
            <motion.button key={r.title} type="button" {...rise(0.05 * i)}
              onClick={() => onOpenPage(r.page)}
              whileHover={{ y: -4, transition: { duration: 0.22 } }}
              className="cursor-pointer border-none text-right"
              style={glass({ borderRadius: '22px', padding: '22px 24px' })}>
              <h3 style={{ fontFamily: titleFont, color: 'white', fontWeight: 700, fontSize: '17px', margin: '0 0 6px' }}>{r.title}</h3>
              <p style={{ color: '#c9dde8', fontWeight: 300, fontSize: '13px', lineHeight: 1.9, margin: '0 0 10px' }}>{r.desc}</p>
              <span className="flex items-center gap-1.5" style={{ color: '#f4a63f', fontWeight: 500, fontSize: '12.5px' }}>
                {r.label}
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#f4a63f" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  )
}
