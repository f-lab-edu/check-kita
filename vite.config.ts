import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/naver/get-user': {
        target: 'https://openapi.naver.com/v1/nid/me',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/naver\/get-user/, ''),
        secure: false,
        ws: true,
      },
      '/naver/token': {
        target: 'https://nid.naver.com/oauth2.0/token	',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/naver\/token/, ''),
        secure: false,
        ws: true,
      },
      '/kakao/get-user': {
        target: 'https://kapi.kakao.com/v2/user/me',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/kakao\/get-user/, ''),
        secure: false,
        ws: true,
      },
      '/kakao/token': {
        target: 'https://kauth.kakao.com/oauth/token',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/kakao\/token/, ''),
        secure: false,
        ws: true,
      },
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
