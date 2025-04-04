import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/cpaysearch/', // <-- 這裡請記得改成你的 GitHub repository 名稱
})
