import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'

/* ─────────────────────────────────────────────────────────────
   استبانتا «كن شريكاً» و«تطوع معنا» — نافذة منبثقة تُفتح من أي زر
   بـ openRequestForm('partner' | 'volunteer')، وتُحفظ الطلبات في
   قاعدة الموقع وتظهر في لوحة التحكم ← «الطلبات الواردة».
   ───────────────────────────────────────────────────────────── */

export const openRequestForm = (kind) =>
  window.dispatchEvent(new CustomEvent('rwasim:form', { detail: kind }))

const FORMS = {
  partner: {
    title: 'طلب شراكة',
    lead: 'نسعد بشراكتكم في صناعة الأثر. أكمل البيانات وسيتواصل معكم فريق رواسم.',
    done: 'وصل طلب الشراكة، وسيتواصل معكم فريق رواسم قريباً بإذن الله.',
    fields: [
      { k: 'org', label: 'اسم الجهة', req: true },
      { k: 'orgType', label: 'نوع الجهة', req: true, type: 'select',
        options: ['جهة حكومية', 'قطاع خاص', 'جهة غير ربحية', 'جهة مانحة', 'أخرى'] },
      { k: 'contactName', label: 'اسم المسؤول', req: true },
      { k: 'role', label: 'المسمى الوظيفي' },
      { k: 'phone', label: 'رقم الجوال', req: true, type: 'tel' },
      { k: 'email', label: 'البريد الإلكتروني', req: true, type: 'email' },
      { k: 'area', label: 'مجال الشراكة المقترح', req: true, type: 'select', wide: true,
        options: ['رعاية برنامج', 'دعم مالي', 'دعم عيني', 'شراكة تنفيذية', 'شراكة معرفية', 'أخرى'] },
      { k: 'details', label: 'نبذة عن فكرة الشراكة', req: true, type: 'textarea', wide: true },
    ],
  },
  volunteer: {
    title: 'طلب تطوع',
    lead: 'شاركنا اهتمامك بالتطوع، وسنتواصل معك عند توفر فرصة تناسبك.',
    done: 'وصل طلب التطوع، شكراً لمبادرتك — سنتواصل معك عند توفر فرصة تناسبك.',
    fields: [
      { k: 'name', label: 'الاسم الكامل', req: true },
      { k: 'gender', label: 'الجنس', req: true, type: 'select', options: ['ذكر', 'أنثى'] },
      { k: 'age', label: 'الفئة العمرية', req: true, type: 'select',
        options: ['أقل من 18', '18 – 24', '25 – 34', '35 – 44', '45 فأكثر'] },
      { k: 'city', label: 'المدينة', req: true },
      { k: 'phone', label: 'رقم الجوال', req: true, type: 'tel' },
      { k: 'email', label: 'البريد الإلكتروني', type: 'email' },
      { k: 'qualification', label: 'المؤهل والتخصص', wide: true },
      { k: 'areas', label: 'مجالات الاهتمام', req: true, type: 'multi', wide: true,
        options: ['تنفيذ البرامج والأنشطة', 'الإشراف التربوي', 'الإعلام والتصميم', 'التنظيم والفعاليات', 'التقنية', 'الإدارة والدعم', 'أخرى'] },
      { k: 'availability', label: 'الوقت المتاح', req: true, type: 'select', wide: true,
        options: ['أيام الأسبوع', 'نهاية الأسبوع', 'المواسم والإجازات', 'مرن'] },
      { k: 'experience', label: 'خبرات سابقة في التطوع (اختياري)', type: 'textarea', wide: true },
    ],
  },
}

const inputStyle = {
  width: '100%', borderRadius: '14px', padding: '12px 16px',
  background: 'var(--glass-a)', border: '0.5px solid var(--line)',
  color: 'var(--ink)', fontWeight: 300, fontSize: '14.5px', outline: 'none',
  fontFamily: "'IBM Plex Sans Arabic', system-ui, sans-serif",
}

const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
const isPhone = (v) => /^[+\d][\d\s-]{6,18}$/.test(v)

function Field({ f, value, onChange, error }) {
  const label = (
    <span className="mb-1.5 block" style={{ color: 'var(--ink-3)', fontSize: '12.5px', fontWeight: 500 }}>
      {f.label}{f.req && <span style={{ color: '#ef9122' }}> *</span>}
    </span>
  )
  let control
  if (f.type === 'select') {
    control = (
      <select className="sub-input cursor-pointer" style={inputStyle} value={value || ''} onChange={(e) => onChange(e.target.value)}>
        <option value="" disabled>اختر…</option>
        {f.options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    )
  } else if (f.type === 'multi') {
    const set = new Set(value || [])
    control = (
      <div className="flex flex-wrap gap-2">
        {f.options.map((o) => {
          const on = set.has(o)
          return (
            <button key={o} type="button"
              onClick={() => { const n = new Set(set); on ? n.delete(o) : n.add(o); onChange([...n]) }}
              className="cursor-pointer"
              style={on
                ? { borderRadius: '999px', padding: '7px 14px', fontSize: '13px', fontWeight: 600, color: '#fff', border: 'none',
                    background: 'linear-gradient(135deg, #ef9122 0%, #c9760f 100%)' }
                : { borderRadius: '999px', padding: '7px 14px', fontSize: '13px', fontWeight: 400, color: 'var(--ink-2)',
                    background: 'var(--glass-a)', border: '0.5px solid var(--line)' }}>
              {o}
            </button>
          )
        })}
      </div>
    )
  } else if (f.type === 'textarea') {
    control = <textarea className="sub-input" style={{ ...inputStyle, minHeight: '110px', resize: 'vertical' }}
      value={value || ''} onChange={(e) => onChange(e.target.value)} maxLength={2000} />
  } else {
    control = <input className="sub-input" style={inputStyle} type={f.type || 'text'} value={value || ''}
      dir={f.type === 'tel' || f.type === 'email' ? 'ltr' : undefined}
      onChange={(e) => onChange(e.target.value)} maxLength={200} />
  }
  return (
    <label className={`block ${f.wide ? 'sm:col-span-2' : ''}`}>
      {label}
      {control}
      {error && <span className="mt-1 block" style={{ color: '#E95642', fontSize: '12px' }}>{error}</span>}
    </label>
  )
}

function FormModal({ kind, onClose }) {
  const cfg = FORMS[kind]
  const [data, setData] = useState({})
  const [errors, setErrors] = useState({})
  const [state, setState] = useState('idle') // idle | sending | done | error
  const [msg, setMsg] = useState('')
  const [hp, setHp] = useState('') // حقل مخفي لاصطياد البرامج الآلية
  const openedAt = useRef(Date.now())

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = prev }
  }, [onClose])

  const validate = () => {
    const e = {}
    for (const f of cfg.fields) {
      const v = data[f.k]
      const empty = Array.isArray(v) ? v.length === 0 : !String(v || '').trim()
      if (f.req && empty) e[f.k] = 'هذا الحقل مطلوب'
      else if (!empty && f.type === 'email' && !isEmail(String(v).trim())) e[f.k] = 'البريد الإلكتروني غير صحيح'
      else if (!empty && f.type === 'tel' && !isPhone(String(v).trim())) e[f.k] = 'رقم الجوال غير صحيح'
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const submit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setState('sending')
    try {
      const r = await fetch('/api/forms', {
        method: 'POST', headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ kind, fields: data, hp, t: Date.now() - openedAt.current }),
      })
      const j = await r.json().catch(() => ({}))
      if (!r.ok) throw new Error(j.error || 'تعذّر إرسال الطلب')
      setState('done')
    } catch (err) {
      setState('error'); setMsg(err.message || 'تعذّر إرسال الطلب — أعد المحاولة')
    }
  }

  return (
    <motion.div className="fixed inset-0 flex items-start justify-center overflow-y-auto p-4 sm:items-center sm:p-6"
      style={{ zIndex: 150 }} role="dialog" aria-modal="true" aria-label={cfg.title}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.22 }}>
      <div className="fixed inset-0" onClick={onClose}
        style={{ background: 'rgba(4,23,32,0.62)', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)' }} />
      <motion.div dir="rtl" className="relative my-6 w-full max-w-2xl"
        initial={{ y: 26, scale: 0.97 }} animate={{ y: 0, scale: 1 }} exit={{ y: 16, scale: 0.98 }}
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        style={{ borderRadius: '28px', padding: 'clamp(24px, 4vw, 36px)', background: 'var(--panel)',
          border: '1px solid var(--line)', boxShadow: '0 30px 80px rgba(3,15,21,0.45)' }}>
        <button type="button" onClick={onClose} aria-label="إغلاق"
          className="absolute flex h-9 w-9 cursor-pointer items-center justify-center rounded-full"
          style={{ top: '16px', left: '16px', background: 'var(--glass-a)', border: '1px solid var(--line)', color: 'var(--ink)' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12" /></svg>
        </button>

        <h2 style={{ fontFamily: "'TheYearofHandicrafts', 'IBM Plex Sans Arabic', sans-serif", color: 'var(--ink)', fontWeight: 700, fontSize: 'clamp(22px, 2.6vw, 28px)', margin: '0 0 8px' }}>
          {cfg.title}
        </h2>

        {state === 'done' ? (
          <div className="py-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full"
              style={{ background: 'linear-gradient(135deg, #ef9122 0%, #c9760f 100%)' }}>
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>
            </div>
            <p style={{ color: 'var(--ink)', fontWeight: 500, fontSize: '16px', lineHeight: 1.9, margin: '0 0 22px' }}>{cfg.done}</p>
            <button type="button" onClick={onClose} className="cursor-pointer"
              style={{ borderRadius: '999px', padding: '11px 30px', fontWeight: 600, fontSize: '14px', color: '#fff', border: 'none',
                background: 'linear-gradient(135deg, #ef9122 0%, #c9760f 100%)' }}>تم</button>
          </div>
        ) : (
          <form onSubmit={submit} noValidate>
            <p style={{ color: 'var(--ink-2)', fontWeight: 300, fontSize: '14px', lineHeight: 1.9, margin: '0 0 22px' }}>{cfg.lead}</p>
            {/* حقل مخفي عن البشر — تملؤه البرامج الآلية فيُتجاهل طلبها */}
            <input type="text" name="website" tabIndex={-1} autoComplete="off" value={hp} onChange={(e) => setHp(e.target.value)}
              aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }} />
            <div className="grid gap-4 sm:grid-cols-2">
              {cfg.fields.map((f) => (
                <Field key={f.k} f={f} value={data[f.k]} error={errors[f.k]}
                  onChange={(v) => { setData((d) => ({ ...d, [f.k]: v })); if (errors[f.k]) setErrors((x) => ({ ...x, [f.k]: '' })) }} />
              ))}
            </div>
            {state === 'error' && <p className="mt-4" style={{ color: '#E95642', fontSize: '13px' }}>{msg}</p>}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button type="submit" disabled={state === 'sending'} className="cursor-pointer"
                style={{ borderRadius: '999px', padding: '12px 32px', fontWeight: 600, fontSize: '14.5px', color: '#fff', border: 'none',
                  background: 'linear-gradient(135deg, #ef9122 0%, #c9760f 100%)', boxShadow: '0 8px 22px rgba(239,145,34,0.35)',
                  opacity: state === 'sending' ? 0.7 : 1 }}>
                {state === 'sending' ? 'جارٍ الإرسال…' : 'إرسال الطلب'}
              </button>
              <span style={{ color: 'var(--muted)', fontSize: '12px' }}>الحقول المعلّمة بـ * مطلوبة</span>
            </div>
          </form>
        )}
      </motion.div>
    </motion.div>
  )
}

/* المضيف — يُثبَّت مرة واحدة في التطبيق ويستمع لطلبات فتح الاستبانة */
export default function RequestFormHost() {
  const [kind, setKind] = useState(null)
  useEffect(() => {
    const on = (e) => { if (FORMS[e.detail]) setKind(e.detail) }
    window.addEventListener('rwasim:form', on)
    return () => window.removeEventListener('rwasim:form', on)
  }, [])
  return createPortal(
    <AnimatePresence>
      {kind && <FormModal key={kind} kind={kind} onClose={() => setKind(null)} />}
    </AnimatePresence>,
    document.body,
  )
}
