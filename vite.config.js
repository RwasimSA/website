import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true, // كشف الخادم على الشبكة المحلية للوصول من الهاتف
    port: 5173,
  },
})
