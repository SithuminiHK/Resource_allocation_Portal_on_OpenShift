import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    tailwindcss(),
  ],
  server: {
    host: '0.0.0.0', // ← important!
    port: 3000,
  },
  build: {
    outDir: 'dist', // Ensure this is set
    emptyOutDir: true // Clears the dist folder before build
  }
})
