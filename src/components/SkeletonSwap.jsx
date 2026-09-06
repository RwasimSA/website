import { AnimatePresence, motion } from 'framer-motion'

/* يبدّل بين الهيكل (Skeleton) والمحتوى بتلاشٍ متقاطع سلس (دخول وخروج).
   className/style تُطبّق على الحاوية (مثل شبكة grid). */
export default function SkeletonSwap({ loading, skeleton, children, className = '', style }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={loading ? 'skeleton' : 'content'}
        className={className}
        style={style}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        {loading ? skeleton : children}
      </motion.div>
    </AnimatePresence>
  )
}
