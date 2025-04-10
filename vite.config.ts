import { defineConfig } from 'vite';

export default defineConfig({
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