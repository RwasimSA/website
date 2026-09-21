import { useSyncExternalStore } from 'react'

/* ─────────────────────────────────────────────────────────────
   وضع الألوان (داكن/فاتح) — مصدر واحد للحقيقة:
   - القيمة على <html data-theme> (تُضبط مبكراً في index.html قبل أول رسم
     حتى لا يومض الوضع الخاطئ)، وتُحفظ في localStorage تحت 'theme'.
   - الافتراضي داكن (هوية الموقع)، والفاتح اختيار الزائر ويبقى بين الزيارات.
   - useThemeMode() يُعيد الوضع الحالي ويُحدّث المكوّنات عند تبديله.
   ───────────────────────────────────────────────────────────── */

const KEY = 'theme'
const listeners = new Set()

export const getTheme = () =>
  (typeof document !== 'undefined' && document.documentElement.dataset.theme === 'light') ? 'light' : 'dark'

export const setTheme = (mode) => {
  const next = mode === 'light' ? 'light' : 'dark'
  document.documentElement.dataset.theme = next
  try { localStorage.setItem(KEY, next) } catch { /* خاص/محجوب */ }
  listeners.forEach((fn) => fn())
}

export const toggleTheme = () => setTheme(getTheme() === 'light' ? 'dark' : 'light')

const subscribe = (fn) => { listeners.add(fn); return () => listeners.delete(fn) }

export const useThemeMode = () => useSyncExternalStore(subscribe, getTheme, () => 'dark')
