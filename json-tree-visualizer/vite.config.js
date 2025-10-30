import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  define: {
    'process.env': {}
  },
  optimizeDeps: {
    include: ['dom-to-image'],
    esbuildOptions: {
      // Enable esbuild's CommonJS support
      target: 'es2020',
      supported: { 
        bigint: true 
      },
    },
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
})