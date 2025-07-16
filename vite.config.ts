import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/platformM/',
  plugins: [react()],
  server: {
    proxy: {
      '/images': {
        target: 'https://cinemaguide.skillbox.cc',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/images/, ''), // Убираем '/images' из пути
      },
    },
  },
});