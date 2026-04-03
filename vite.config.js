import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'esnext',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-router')) return 'vendor';
            if (id.includes('gsap')) return 'gsap';
            if (id.includes('framer-motion')) return 'framer';
            if (id.includes('i18next') || id.includes('react-i18next')) return 'i18n';
            if (id.includes('jspdf')) return 'pdf';
          }
        },
      },
    },
  },
});
