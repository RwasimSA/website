import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GOV_PAGES, MEDIA_PAGES } from '../pages/navPages'
import { useThemeMode } from '../themeMode'
import ThemeSwitch from './ThemeSwitch'

/* تبويبات الهيدر — مسطحة، وتبويبا المركز الإعلامي والحوكمة قائمتان منسدلتان بصفحاتهما. */
const nav = [
  { label: 'الرئيسية', page: null },
  { label: 'عن رواسم', page: 'about-us' },
  { label: 'برامجنا', page: 'programs' },
  { label: 'أثرنا', page: 'impact' },
  { label: 'الشراكات', page: 'partners' },
  { label: 'المركز الإعلامي', children: MEDIA_PAGES },
  { label: 'الحوكمة', children: GOV_PAGES },
  { label: 'تواصل معنا', page: 'inquiries' },
]

const Chevron = ({ open }) => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
    style={{ transition: 'transform 0.25s ease', transform: open ? 'rotate(180deg)' : 'none' }}>
    <path d="M6 9l6 6 6-6" />
  </svg>
)

const glass = {
  background: 'var(--glass-b)',
  backdropFilter: 'var(--glass, blur(20px))',
  WebkitBackdropFilter: 'var(--glass, blur(20px))',
  border: '0.5px solid var(--line)',
}

export default function Navbar({ collapsed = false, progress = 0, onOpenPage = () => {} }) {
  const [hovered, setHovered] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dropOpen, setDropOpen] = useState(null)       // اسم التبويب المفتوح منسدلته (سطح المكتب)
  const [mobileBranch, setMobileBranch] = useState(null) // اسم الفرع المفتوح في قائمة الجوال
  const theme = useThemeMode()
  const logo = theme === 'light' ? '/images/rawasim-logo-dark.svg' : '/images/rawasim-logo-white.svg'
  const expanded = !collapsed || hovered
  const go = (page) => { onOpenPage(page); setMobileOpen(false); setHovered(false); setDropOpen(null); setMobileBranch(null) }

  return (
    <header className="pointer-events-none fixed left-0 right-0 z-50 flex justify-center px-4" style={{ top: '16px' }}>
      <div
        className="pointer-events-auto"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <AnimatePresence mode="wait" initial={false}>
          {expanded ? (
            <motion.div
              key="full"
              initial={{ opacity: 0, scale: 0.96, y: -6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -6 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              {/* الشريط */}
              <nav
                className="flex w-[min(60rem,calc(100vw-2rem))] items-center justify-between gap-6 rounded-full px-6 py-4"
                style={{ ...glass, boxShadow: 'var(--nav-shadow), inset 0 1px 0 var(--glass-a)' }}
              >
                <img src={logo} alt="جمعية رواسم" className="h-8 w-auto cursor-pointer object-contain"
                  onClick={() => go(null)} />

                <ul className="hidden items-center gap-6 md:flex">
                  {nav.map((tab) => (
                    <li key={tab.label} className="relative"
                      onMouseEnter={tab.children ? () => setDropOpen(tab.label) : undefined}
                      onMouseLeave={tab.children ? () => setDropOpen(null) : undefined}>
                      {tab.children ? (
                        <>
                          <a href="#" className="nav-flat-link flex items-center gap-1.5 whitespace-nowrap text-[15px] transition-colors"
                            style={{ color: dropOpen === tab.label ? '#ffffff' : 'var(--ink-3)', fontWeight: 400 }}
                            onClick={(e) => { e.preventDefault(); setDropOpen((o) => (o === tab.label ? null : tab.label)) }}>
                            {tab.label}
                            <Chevron open={dropOpen === tab.label} />
                          </a>
                          {/* القائمة المنسدلة — صفحات التبويب */}
                          <AnimatePresence>
                            {dropOpen === tab.label && (
                              <motion.div
                                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}
                                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                                style={{
                                  position: 'absolute', top: '100%', insetInlineStart: '50%', transform: 'translateX(50%)',
                                  paddingTop: '14px', zIndex: 70,
                                }}>
                                <div style={{
                                  minWidth: '250px', borderRadius: '20px', padding: '10px',
                                  background: 'var(--panel)',
                                  backdropFilter: 'var(--glass, blur(24px))', WebkitBackdropFilter: 'var(--glass, blur(24px))',
                                  border: '0.5px solid var(--line)', boxShadow: '0 22px 60px rgba(0,0,0,0.55)',
                                }}>
                                  {tab.children.map((c) => (
                                    <a key={c.key} href="#"
                                      className="nav-box block whitespace-nowrap text-right"
                                      style={{ display: 'block', color: 'var(--ink-3)', fontWeight: 400, fontSize: '13.5px',
                                        padding: '11px 16px', borderRadius: '13px', textDecoration: 'none',
                                        border: '0.5px solid transparent', transition: 'all 0.2s ease' }}
                                      onClick={(e) => { e.preventDefault(); go(c.key) }}>
                                      {c.label}
                                    </a>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </>
                      ) : (
                        <a href="#" className="nav-flat-link block whitespace-nowrap text-[15px] transition-colors"
                          style={{ color: 'var(--ink-3)', fontWeight: 400 }}
                          onClick={(e) => { e.preventDefault(); go(tab.page) }}>
                          {tab.label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>

                {/* أدوات الشريط: مفتاح تبديل الوضع + زر قائمة الجوال */}
                <div className="flex items-center gap-3">
                  <ThemeSwitch />
                  <button type="button" onClick={() => setMobileOpen((o) => !o)} aria-label="القائمة"
                    className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full md:hidden"
                    style={{ background: 'var(--glass-a)', border: '0.5px solid var(--line)', cursor: 'pointer' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                      {mobileOpen
                        ? <><line x1="6" y1="6" x2="18" y2="18" /><line x1="6" y1="18" x2="18" y2="6" /></>
                        : <><line x1="4" y1="7" x2="20" y2="7" /><line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="17" x2="20" y2="17" /></>}
                    </svg>
                  </button>
                </div>
              </nav>

              {/* قائمة الجوال — روابط مسطحة */}
              <AnimatePresence>
                {mobileOpen && (
                  <motion.div
                    className="md:hidden"
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      position: 'absolute', top: '100%', insetInline: 0, marginTop: '10px', zIndex: 60,
                      maxHeight: '70vh', overflowY: 'auto', borderRadius: '22px', padding: '16px 22px',
                      background: 'var(--panel)',
                      backdropFilter: 'var(--glass, blur(24px))', WebkitBackdropFilter: 'var(--glass, blur(24px))',
                      border: '0.5px solid var(--line)', boxShadow: '0 22px 60px rgba(0,0,0,0.6)',
                      textAlign: 'right',
                    }}
                  >
                    {nav.map((tab, i) => (
                      tab.children ? (
                        <div key={tab.label}
                          style={{ borderBottom: i < nav.length - 1 ? '0.5px solid var(--glass-a)' : 'none' }}>
                          <button onClick={() => setMobileBranch((o) => (o === tab.label ? null : tab.label))}
                            className="flex w-full items-center justify-between text-right"
                            style={{ color: 'var(--ink)', fontWeight: 500, fontSize: '15px', padding: '12px 0', cursor: 'pointer',
                              background: 'transparent', border: 'none' }}>
                            {tab.label}
                            <span style={{ color: 'var(--accent-text)' }}><Chevron open={mobileBranch === tab.label} /></span>
                          </button>
                          <AnimatePresence>
                            {mobileBranch === tab.label && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                                style={{ overflow: 'hidden' }}>
                                {tab.children.map((c) => (
                                  <button key={c.key} onClick={() => go(c.key)}
                                    className="block w-full text-right"
                                    style={{ color: 'var(--ink-3)', fontWeight: 400, fontSize: '13.5px', padding: '9px 18px 9px 0',
                                      cursor: 'pointer', background: 'transparent', border: 'none' }}>
                                    {c.label}
                                  </button>
                                ))}
                                <div style={{ height: '8px' }} />
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <button key={tab.label} onClick={() => go(tab.page)}
                          className="block w-full text-right"
                          style={{ color: 'var(--ink)', fontWeight: 500, fontSize: '15px', padding: '12px 0', cursor: 'pointer',
                            background: 'transparent', border: 'none',
                            borderBottom: i < nav.length - 1 ? '0.5px solid var(--glass-a)' : 'none' }}>
                          {tab.label}
                        </button>
                      )
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              key="indicator"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center justify-center gap-4"
              style={{ padding: '12px 20px' }}
            >
              {/* مفتاح الوضع يبقى في متناول اليد حتى والشريط منكمش */}
              <ThemeSwitch />
              <button type="button" onClick={() => setHovered(true)} aria-label="إظهار شريط التنقّل"
                className="flex cursor-pointer items-center justify-center"
                style={{ padding: '8px 4px', background: 'transparent', border: 'none' }}>
              <span style={{ position: 'relative', display: 'block', overflow: 'hidden', width: '140px', height: '6px', borderRadius: '999px', background: 'var(--line)' }}>
                <motion.span
                  style={{ position: 'absolute', insetInlineStart: 0, top: 0, bottom: 0, borderRadius: '999px',
                    background: 'linear-gradient(90deg, #1c81a4 0%, #2fa7cc 45%, #ef9122 100%)', boxShadow: '0 0 10px rgba(239,145,34,0.5)' }}
                  initial={false}
                  animate={{ width: `${Math.max(progress * 100, 8)}%` }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                />
              </span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}
