import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/search-books': {
        target: 'https://openapi.naver.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/search-books/, '/v1/search/book.json'),

        secure: false,
        ws: true,
      },
      '/api/search-book-count': {
        target: 'https://openapi.naver.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/search-book-count/, '/v1/search/book.json'),
        secure: false,
        ws: true,
      },
      '/api/search-book-by-isbn': {
        target: 'https://openapi.naver.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/search-book-by-isbn/, '/v1/search/book_adv.xml'),
        secure: false,
        ws: true,
      },
    },
  },
});
