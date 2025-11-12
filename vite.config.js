import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/web_app_lebron/',
  build: {
    outDir: 'docs', // 👉 hace que el build se genere en la carpeta docs
  },
})