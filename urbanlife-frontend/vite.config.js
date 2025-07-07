import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import dotenv from 'dotenv'

dotenv.config()

export default defineConfig({
  server: {
     port: parseInt(process.env.PORT) // Port for the development server
  },
  plugins: [
    tailwindcss(),
    react()],
})
