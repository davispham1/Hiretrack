import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    rollupOptions: {
      input: {
        popup: resolve(process.cwd(), 'index.html'),
        dashboard: resolve(process.cwd(), 'dashboard.html')
      }
    }
  }
})