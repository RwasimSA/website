import { motion } from 'framer-motion'
import { glass, color } from '../theme'
import { text } from '../typography'
import { mapApiArticle, mapApiNews } from '../data/news'
import { useApiData } from '../lib/useApiData'
import Skeleton from '../components/Skeleton'

const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay },
})

const BackButton = ({ onBack }) => (
  <motion.button onClick={onBack} {...rise(0)} whileHover={{ x: 4 }}
    className="mb-7 flex items-center gap-2" style={{ color: '#b6ccd6', fontWeight: 300, fontSize: '14px', background: 'transparent', cursor: 'pointer' }}>
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 6 15 12 9 18" /></svg>
    العودة إلى آخر الأخبار
  </motion.button>
)

export default function SinglePost({ id, onBack = () => {}, onOpen = () => {} }) {
  const { data: article, loading, error } = useApiData(`/news/${id}`, { map: mapApiArticle, fallback: null })
  const { data: all } = useApiData('/news', { map: mapApiNews, fallback: [], all: true })

  if (loading && !article) {
    return (
      <div dir="rtl" className="relative mx-auto w-full max-w-3xl px-6 pb-28 pt-32 md:px-10">
        <Skeleton style={{ height: '18px', width: '38%', borderRadius: '8px', marginBottom: '22px' }} />
        <Skeleton style={{ height: '38px', width: '82%', borderRadius: '10px', marginBottom: '24px' }} />
        <Skeleton style={{ height: '320px', borderRadius: '20px', marginBottom: '32px' }} />
        <Skeleton style={{ height: '14px', borderRadius: '6px', marginBottom: '12px' }} />
        <Skeleton style={{ height: '14px', borderRadius: '6px', marginBottom: '12px' }} />
        <Skeleton style={{ height: '14px', width: '70%', borderRadius: '6px' }} />
      </div>
    )
  }

  if ((error && !article) || !article) {
    return (
      <div dir="rtl" className="mx-auto w-full max-w-3xl px-6 pb-28 pt-36 text-center">
        <BackButton onBack={onBack} />
        <p style={{ color: '#b6ccd6', fontWeight: 300, fontSize: '16px', marginTop: '32px' }}>لم يتم العثور على هذا الخبر.</p>
      </div>
    )
  }

  const others = (all || []).filter((n) => n.slug !== article.slug).slice(0, 3)

  return (
    <div dir="rtl" className="relative mx-auto w-full max-w-3xl px-6 pb-28 pt-32 md:px-10">
      <BackButton onBack={onBack} />

      {/* الترويسة */}
      <motion.div className="mb-5 flex items-center gap-3" {...rise(0.05)} style={{ fontSize: '12.5px', fontWeight: 500 }}>
        <span style={{ color: '#d8c8a4', padding: '4px 13px', borderRadius: '999px', background: 'rgba(239,145,34,0.16)', border: '0.5px solid rgba(239,145,34,0.3)' }}>{article.tag}</span>
        <span style={{ color: '#8fa6b0', fontWeight: 300 }}>{article.date}</span>
      </motion.div>

      <motion.h1 {...rise(0.1)} style={{ ...text.sectionTitle, fontSize: '30px', lineHeight: 1.5, marginBottom: '24px' }}>{article.title}</motion.h1>

      {/* صورة الغلاف */}
      {article.img && (
        <motion.div {...rise(0.14)} className="mb-9 overflow-hidden" style={{ borderRadius: '20px', border: '0.5px solid rgba(255,255,255,0.12)' }}>
          <img src={article.img} alt={article.title} className="w-full object-cover" style={{ maxHeight: '380px' }} />
        </motion.div>
      )}

      {/* المتن — HTML من الـ API (منقّى من الخادم) أو فقرات في الاحتياط الثابت */}
      {typeof article.body === 'string' ? (
        <motion.div {...rise(0.18)} className="post-body"
          style={{ color: '#dcebf2', fontWeight: 300, fontSize: '16px', lineHeight: 2, textAlign: 'justify' }}
          dangerouslySetInnerHTML={{ __html: article.body }} />
      ) : (
        <motion.div {...rise(0.18)} className="flex flex-col gap-5">
          {(article.body || []).map((p, i) => (
            <p key={i} style={{ color: '#dcebf2', fontWeight: 300, fontSize: '16px', lineHeight: 2, textAlign: 'justify' }}>{p}</p>
          ))}
        </motion.div>
      )}

      {/* أخبار أخرى */}
      {others.length > 0 && (
        <div className="mt-16" style={{ borderTop: '0.5px solid rgba(255,255,255,0.1)', paddingTop: '32px' }}>
          <motion.h2 {...rise(0)} style={{ color: 'white', fontWeight: 600, fontSize: '19px', marginBottom: '20px' }}>أخبار أخرى</motion.h2>
          <div className="grid gap-5 sm:grid-cols-3">
            {others.map((n, i) => (
              <motion.button key={n.slug} onClick={() => { onOpen(n.slug); window.scrollTo({ top: 0 }) }} {...rise(0.05 * i)}
                whileHover={{ y: -4, transition: { duration: 0.25 } }}
                className="news-card group flex flex-col overflow-hidden text-right" style={glass({ padding: 0, cursor: 'pointer' })}>
                <div className="overflow-hidden" style={{ height: '120px', position: 'relative' }}>
                  <img src={n.img} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="flex flex-1 flex-col" style={{ padding: '16px 16px' }}>
                  <span style={{ color: '#8fa6b0', fontWeight: 300, fontSize: '11px', marginBottom: '6px' }}>{n.date}</span>
                  <h3 style={{ color: 'white', fontWeight: 600, fontSize: '13.5px', lineHeight: 1.6 }}>{n.title}</h3>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
