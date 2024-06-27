import { createProxyMiddleware } from 'http-proxy-middleware';

export default async function handler(req, res) {
  const proxy = createProxyMiddleware({
    target: 'https://openapi.naver.com',
    changeOrigin: true,
    pathRewrite: {
      '^/api/search-books': '/v1/search/book.json',
      '^/api/search-book-by-isbn': '/v1/search/book_adv.xml',
    },
    onProxyReq: (proxyReq, req, res) => {
      proxyReq.setHeader(
        'X-Naver-Client-Id',
        process.env.VITE_APP_NAVER_CLIENT_ID
      );
      proxyReq.setHeader(
        'X-Naver-Client-Secret',
        process.env.VITE_APP_NAVER_CLIENT_SECRET
      );

      console.log('Headers added:', {
        'X-Naver-Client-Id': process.env.VITE_APP_NAVER_CLIENT_ID,
        'X-Naver-Client-Secret': process.env.VITE_APP_NAVER_CLIENT_SECRET,
      });
    },
    onError: (err, req, res) => {
      console.error('Proxy error:', err);
      res.status(500).json({ message: 'Proxy error', error: err.message });
    },
  });

  await proxy(req, res);
}
