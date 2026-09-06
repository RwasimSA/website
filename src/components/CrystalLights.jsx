import { motion } from 'framer-motion'

/* أضواء مميّزة (ألوان/أحجام مختلفة) عند الحواف — تدور حول المركز فيظهر جوبها للمحيط */
const orbs = [
  { color: 'rgba(77,179,212,0.20)', size: 520, top: '-12%', left: '42%' },   // بنفسجي ساطع — أعلى
  { color: 'rgba(240,150,45,0.16)', size: 440, top: '46%',  left: '116%' },  // نحاسي — يمين
  { color: 'rgba(53,163,200,0.18)', size: 500, top: '116%', left: '58%' },   // بنفسجي غامق — أسفل
  { color: 'rgba(240,155,50,0.13)', size: 420, top: '54%',  left: '-16%' },  // وردي — يسار
]

export default function CrystalLights() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" style={{ zIndex: 0 }}>
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
        style={{ transformOrigin: '50% 50%' }}
      >
        {orbs.map((orb, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: orb.size,
              height: orb.size,
              top: orb.top,
              left: orb.left,
              transform: 'translate(-50%, -50%)',
              borderRadius: '50%',
              background: `radial-gradient(circle, ${orb.color} 0%, transparent 65%)`,
              filter: 'blur(48px)',
            }}
          />
        ))}
      </motion.div>
    </div>
  )
}
