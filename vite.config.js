import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { copyFileSync } from 'fs'

const copyExtensionFiles = () => ({
  name: 'copy-extension-files',
  closeBundle() {
    copyFileSync('manifest.json', 'dist/manifest.json')
    copyFileSync('background.js', 'dist/background.js')
    copyFileSync('content.js', 'dist/content.js')
  }
})

export default defineConfig({
  plugins: [react(), copyExtensionFiles()],
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