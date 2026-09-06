/* صندوق صورة العضو — مربّع/مستطيل (غير دائري). يعرض الصورة إن وُجدت، وإلا صورة بديلة أنيقة.
   تُحقن الصور الفعلية لاحقاً عبر لوحة التحكم. */
export default function MemberPhoto({ name = '', src, lead = false, radius = '16px', className = '', style = {} }) {
  return (
    <div className={className}
      style={{
        position: 'relative', overflow: 'hidden', borderRadius: radius,
        background: lead
          ? 'linear-gradient(150deg, rgba(239,145,34,0.32) 0%, rgba(201,118,15,0.16) 100%)'
          : 'linear-gradient(150deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.035) 100%)',
        border: '0.5px solid rgba(255,255,255,0.14)',
        ...style,
      }}>
      {src ? (
        <img src={src} alt={name} loading="lazy"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
      ) : (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg viewBox="0 0 24 24" fill="none" stroke={lead ? '#f5c17b' : 'rgba(255,255,255,0.34)'} strokeWidth="1.3"
            style={{ width: '46%', height: '46%' }} strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="8.5" r="4" />
            <path d="M4.5 21c0-4.2 3.4-7 7.5-7s7.5 2.8 7.5 7" />
          </svg>
        </div>
      )}
    </div>
  )
}
