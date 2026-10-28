import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // GitHub Pages serves this repository under /Pagina-proyecto-Leerse/.
  base: '/Pagina-proyecto-Leerse/',
  plugins: [react()],
})
