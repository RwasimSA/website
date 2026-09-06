import { useState } from 'react'
import { motion } from 'framer-motion'
import { glass, color } from '../theme'
import { text } from '../typography'

const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay },
})

const questions = [
  { key: 'donation', label: 'قيّم تجربتك في عملية التبرع' },
  { key: 'clarity', label: 'وضوح أوجه صرف التبرعات' },
  { key: 'comm', label: 'رضاك العام عن التواصل' },
]

const scale = [1, 2, 3, 4, 5]
const ar = (n) => String(n)

const labelStyle = { display: 'block', color: '#c4b8d8', fontSize: '13px', fontWeight: 300, marginBottom: '8px' }
const inputStyle = {
  width: '100%', padding: '11px 16px', borderRadius: '12px',
  background: 'rgba(255,255,255,0.05)', border: '0.5px solid rgba(255,255,255,0.14)',
  color: 'white', fontSize: '14px', fontWeight: 300, outline: 'none',
}

function Field({ label, children }) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      {children}
    </div>
  )
}

function Rating({ label, value, onChange }) {
  return (
    <div>
      <p style={{ color: '#e6ddf2', fontSize: '14.5px', fontWeight: 300, marginBottom: '12px' }}>{label}</p>
      <div className="flex flex-row-reverse justify-end gap-2.5">
        {scale.map((n) => {
          const active = value === n
          return (
            <button key={n} type="button" onClick={() => onChange(n)}
              style={{
                width: '44px', height: '44px', borderRadius: '50%', fontSize: '15px', fontWeight: 600, cursor: 'pointer',
                color: active ? 'white' : '#cdbce6',
                background: active ? 'linear-gradient(135deg, #cc744e 0%, #a85535 100%)' : 'rgba(255,255,255,0.05)',
                border: active ? '0.5px solid rgba(255,255,255,0.25)' : '0.5px solid rgba(255,255,255,0.14)',
                boxShadow: active ? '0 4px 14px rgba(204,116,78,0.35)' : 'none', transition: 'color 0.15s',
              }}>
              {ar(n)}
            </button>
          )
        })}
      </div>
    </div>
  )
}

// Backend survey endpoint. Set VITE_API_BASE_URL to the admin/API host
// (e.g. https://admin.alborhan.sa) at build time; falls back to that host.
const API_BASE = import.meta.env.VITE_API_BASE_URL || 'https://admin.alborhan.sa'
const SURVEY_ENDPOINT = `${API_BASE.replace(/\/$/, '')}/api/v1/surveys/donor-satisfaction`

const emptyForm = { entity_type: '', entity_name: '', phone: '', email: '' }

export default function SatisfactionSurvey() {
  const [form, setForm] = useState(emptyForm)
  const [ratings, setRatings] = useState({})
  const [website, setWebsite] = useState('') // honeypot — must stay empty
  const [sent, setSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const setR = (k, v) => setRatings((p) => ({ ...p, [k]: v }))
  const setF = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    // Light client-side checks; the server is the source of truth.
    if (!form.entity_type) return setError('يرجى اختيار نوع الجهة.')
    if (!form.entity_name.trim()) return setError('يرجى إدخال اسم الجهة.')
    if (!form.phone.trim() && !form.email.trim()) return setError('يرجى إدخال الجوال أو البريد الإلكتروني.')
    if (questions.some((q) => !ratings[q.key])) return setError('يرجى تقييم جميع الأسئلة.')

    setSubmitting(true)
    try {
      const res = await fetch(SURVEY_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json', 'Accept-Language': 'ar' },
        body: JSON.stringify({
          entity_type: form.entity_type,
          entity_name: form.entity_name.trim(),
          phone: form.phone.trim() || null,
          email: form.email.trim() || null,
          donation: ratings.donation,
          clarity: ratings.clarity,
          comm: ratings.comm,
          website, // honeypot
        }),
      })

      if (res.ok) {
        setSent(true)
        window.scrollTo({ top: 0, behavior: 'smooth' })
        return
      }

      if (res.status === 422) {
        const data = await res.json().catch(() => ({}))
        const first = data.errors && Object.values(data.errors)[0]
        setError((first && first[0]) || data.message || 'تعذّر إرسال الاستبيان. تحقّق من البيانات.')
      } else if (res.status === 429) {
        setError('عدد كبير من المحاولات. يرجى المحاولة بعد قليل.')
      } else {
        setError('حدث خطأ غير متوقع. يرجى المحاولة لاحقًا.')
      }
    } catch {
      setError('تعذّر الاتصال بالخادم. تحقّق من اتصالك وحاول مرة أخرى.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div dir="rtl" className="relative mx-auto w-full max-w-2xl px-6 pb-28 pt-36 md:px-10">
      <div className="mb-12 text-center">
        <motion.p style={{ color: color.copper, fontSize: '14px', fontWeight: 300, letterSpacing: '0.22em', marginBottom: '14px' }} {...rise(0)}>قياس الرضا</motion.p>
        <motion.h1 style={{ ...text.sectionTitle, fontSize: '32px' }} className="mb-4" {...rise(0.07)}>استبيان قياس رضا المانحين</motion.h1>
        <motion.p style={{ color: '#c4b8d8', fontWeight: 300, fontSize: '15px' }} {...rise(0.14)}>رأيكم يعيننا على تطوير تجربة العطاء.</motion.p>
      </div>

      {sent ? (
        <motion.div {...rise(0)} className="flex flex-col items-center gap-4 text-center" style={glass({ padding: '52px 28px', borderRadius: '20px' })}>
          <div className="flex h-16 w-16 items-center justify-center rounded-full" style={{ background: 'linear-gradient(135deg, #cc744e 0%, #a85535 100%)' }}>
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
          </div>
          <h3 style={{ color: 'white', fontWeight: 600, fontSize: '19px' }}>شكراً لمشاركتك</h3>
          <p style={{ color: '#c4b8d8', fontWeight: 300, fontSize: '15px' }}>تم استلام تقييمك، ويسعدنا أن رأيك يسهم في تطوير تجربة العطاء.</p>
        </motion.div>
      ) : (
        <motion.form {...rise(0.1)} onSubmit={handleSubmit} noValidate
          style={glass({ padding: '34px 30px', borderRadius: '22px' })}>
          {/* بيانات المانح */}
          <div style={{ color: color.copper, fontSize: '12px', fontWeight: 500, letterSpacing: '0.14em', marginBottom: '20px', paddingBottom: '12px', borderBottom: '0.5px solid rgba(255,255,255,0.1)' }}>بيانات المانح</div>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="نوع الجهة">
              <select value={form.entity_type} onChange={setF('entity_type')} style={{ ...inputStyle, appearance: 'none', cursor: 'pointer' }}>
                <option value="" disabled style={{ color: '#180838' }}>اختر نوع الجهة</option>
                <option value="فرد" style={{ color: '#180838' }}>فرد</option>
                <option value="مؤسسة" style={{ color: '#180838' }}>مؤسسة</option>
              </select>
            </Field>
            <Field label="اسم الجهة">
              <input type="text" value={form.entity_name} onChange={setF('entity_name')} placeholder="الإسم" style={inputStyle} />
            </Field>
            <Field label="الجوال">
              <input type="tel" dir="ltr" value={form.phone} onChange={setF('phone')} placeholder="05XXXXXXXX" style={{ ...inputStyle, textAlign: 'right' }} />
            </Field>
            <Field label="البريد">
              <input type="email" dir="ltr" value={form.email} onChange={setF('email')} placeholder="name@example.com" style={{ ...inputStyle, textAlign: 'right' }} />
            </Field>
          </div>

          {/* honeypot — hidden from humans, catches bots */}
          <input
            type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true"
            value={website} onChange={(e) => setWebsite(e.target.value)}
            style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', opacity: 0 }}
          />

          {/* أسئلة التقييم */}
          <div className="mt-9 flex flex-col gap-7" style={{ paddingTop: '26px', borderTop: '0.5px solid rgba(255,255,255,0.1)' }}>
            {questions.map((q) => (
              <Rating key={q.key} label={q.label} value={ratings[q.key]} onChange={(v) => setR(q.key, v)} />
            ))}
          </div>

          {error && (
            <p role="alert" style={{ marginTop: '20px', color: '#f0a78d', fontSize: '14px', fontWeight: 300 }}>{error}</p>
          )}

          <button type="submit" disabled={submitting} className="mt-9 w-full" style={{
            padding: '14px 0', borderRadius: '999px', fontSize: '15px', fontWeight: 600, color: 'white',
            cursor: submitting ? 'not-allowed' : 'pointer', opacity: submitting ? 0.7 : 1,
            background: 'linear-gradient(135deg, #cc744e 0%, #a85535 100%)', boxShadow: '0 6px 20px rgba(204,116,78,0.35)', border: 'none',
          }}>
            {submitting ? 'جارٍ الإرسال…' : 'إرسال الاستبيان'}
          </button>
        </motion.form>
      )}
    </div>
  )
}
