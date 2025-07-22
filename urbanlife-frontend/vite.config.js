import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import dotenv from 'dotenv'
import { visualizer } from 'rollup-plugin-visualizer';


dotenv.config()

export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
          dashboard: ["lucide-react"],
          landing: ["react-hot-toast"],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
  server: {
     port: parseInt(process.env.PORT) // Port for the development server
  },
  plugins: [
    tailwindcss(),
    react(),
    visualizer({
      filename: 'dist/stats.html',
      open: true, // Akan otomatis buka di browser
      gzipSize: true,
      brotliSize: true,
    }),
  ],
})
