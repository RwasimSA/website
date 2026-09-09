import { motion } from 'framer-motion'

/* زر أقسام الرئيسية — بنمط زر الهيرو الرئيسي:
   حبّة زجاجية داكنة، النص يمينًا وشارة برتقالية دائرية بسهم يسارًا. */
export default function SectionCta({ label, onClick = () => {}, className = '', delay = 0.5 }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      initial={{ y: 24 }} animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.98 }}
      className={`flex items-center gap-3.5 ${className}`}
      style={{
        borderRadius: '999px', padding: '8px 26px 8px 8px',
        background: 'linear-gradient(135deg, rgba(13,58,77,0.6) 0%, rgba(8,38,51,0.6) 100%)',
        backdropFilter: 'var(--glass, blur(20px))', WebkitBackdropFilter: 'var(--glass, blur(20px))',
        border: '0.5px solid rgba(255,255,255,0.16)', cursor: 'pointer',
      }}
    >
      <span style={{ color: 'white', fontWeight: 500, fontSize: '15px' }}>{label}</span>
      <span style={{ width: '46px', height: '46px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'linear-gradient(135deg, #ef9122 0%, #c9760f 100%)', boxShadow: '0 0 18px rgba(239,145,34,0.55)' }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 5 12 12 19" />
        </svg>
      </span>
    </motion.button>
  )
}
