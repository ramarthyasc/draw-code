import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      '/proPic': 'http://localhost:5000',
      '/draw-login': 'http://localhost:5000',
      '/draw-secure': 'http://localhost:5000',
      '/draw-question': 'http://localhost:5000',
      '/api/draw-submit': 'http://localhost:5000',
      '/api/refresh-auth': 'http://localhost:5000',
    },

  }

})

