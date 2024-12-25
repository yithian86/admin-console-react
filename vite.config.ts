import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,  // Change this to any other port number if needed
    proxy: {
      '/api': {
        target: 'http://localhost:3100',  // The address of your mock server
        changeOrigin: true,
        secure: false  // If you're using http instead of https
      }
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler' // or "modern"
      }
    }
  }
})
