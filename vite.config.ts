import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import dotenv from 'dotenv'

dotenv.config()

const SERVER_URL = process.env.SERVER_URL || 'http://localhost'
const SERVER_PORT = process.env.SERVER_PORT || '3000'
const API = `${SERVER_URL}:${SERVER_PORT}`

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    proxy: {
      '/api': {
        target: API,
        changeOrigin: true
      }
    }
  }
})
