import { motion } from 'framer-motion'
import { glass, color } from '../theme'
import { text } from '../typography'
import { mapApiNews } from '../data/news'
import { useApiData } from '../lib/useApiData'
import Skeleton from '../components/Skeleton'

const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay },
})

const Meta = ({ tag, date }) => (
  <div className="mb-3 flex items-center gap-3" style={{ fontSize: '12px', fontWeight: 500 }}>
    <span style={{ color: '#d8c8a4', padding: '3px 12px', borderRadius: '999px', background: 'rgba(239,145,34,0.16)', border: '0.5px solid rgba(239,145,34,0.3)' }}>{tag}</span>
    <span style={{ color: '#8fa6b0', fontWeight: 300 }}>{date}</span>
  </div>
)

export default function LatestNews({ onOpen = () => {} }) {
  const { data: news, loading } = useApiData('/news', { map: mapApiNews, fallback: [], all: true })

  if (loading && news.length === 0) {
    return (
      <div dir="rtl" className="relative mx-auto w-full max-w-6xl px-6 pb-28 pt-36 md:px-10">
        <Skeleton style={{ height: '260px', borderRadius: '22px', marginBottom: '24px' }} />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} style={{ height: '230px', borderRadius: '18px' }} />)}
        </div>
      </div>
    )
  }
  if (news.length === 0) {
    return <div dir="rtl" className="mx-auto w-full max-w-6xl px-6 pt-40 text-center" style={{ color: '#b6ccd6', fontWeight: 300 }}>لا توجد أخبار منشورة حالياً.</div>
  }

  const featured = news[0]
  const items = news.slice(1)

  return (
    <div dir="rtl" className="relative mx-auto w-full max-w-6xl px-6 pb-28 pt-36 md:px-10">
      <div className="mb-12 text-center">
        <motion.p style={{ color: color.copper, fontSize: '14px', fontWeight: 300, letterSpacing: '0.22em', marginBottom: '14px' }} {...rise(0)}>المركز الإعلامي</motion.p>
        <motion.h1 style={{ ...text.sectionTitle, fontSize: '34px' }} className="mb-4" {...rise(0.07)}>آخر الأخبار</motion.h1>
        <motion.p style={{ color: '#b6ccd6', fontWeight: 300, fontSize: '15px' }} {...rise(0.14)}>أحدث أخبار جمعية رواسم ومستجدّات مشاريعها.</motion.p>
      </div>

      {/* الخبر الرئيسي */}
      <motion.button onClick={() => onOpen(featured.slug)} {...rise(0.16)}
        className="news-card group mb-6 grid w-full overflow-hidden text-right md:grid-cols-2"
        style={glass({ padding: 0, borderRadius: '22px', cursor: 'pointer' })}>
        <div className="relative" style={{ minHeight: '260px' }}>
          <img src={featured.img} alt="" className="h-full w-full object-cover" style={{ position: 'absolute', inset: 0 }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to left, rgba(7,31,43,0.6) 0%, transparent 55%)' }} />
        </div>
        <div className="flex flex-col justify-center" style={{ padding: '36px 32px' }}>
          <Meta tag={featured.tag} date={featured.date} />
          <h2 style={{ color: 'white', fontWeight: 600, fontSize: '22px', lineHeight: 1.6, marginBottom: '14px' }}>{featured.title}</h2>
          <p style={{ color: '#b6ccd6', fontWeight: 300, fontSize: '14.5px', lineHeight: 1.85, marginBottom: '22px' }}>{featured.excerpt}</p>
          <span className="flex items-center gap-2 text-sm font-medium" style={{ color: 'white' }}>
            اقرأ المزيد
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>
          </span>
        </div>
      </motion.button>

      {/* شبكة الأخبار */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((n, i) => (
          <motion.button key={n.slug} onClick={() => onOpen(n.slug)} {...rise(0.05 * i)} whileHover={{ y: -4, transition: { duration: 0.25 } }}
            className="news-card group flex flex-col overflow-hidden text-right" style={glass({ padding: 0, cursor: 'pointer' })}>
            <div className="overflow-hidden" style={{ height: '150px', position: 'relative' }}>
              <img src={n.img} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
            <div className="flex flex-1 flex-col" style={{ padding: '20px 18px' }}>
              <Meta tag={n.tag} date={n.date} />
              <h3 style={{ color: 'white', fontWeight: 600, fontSize: '15px', lineHeight: 1.65 }}>{n.title}</h3>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  )
}
