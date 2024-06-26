import { createProxyMiddleware } from 'http-proxy-middleware';

module.exports = (req, res) => {
  console.log('Request received for /api/search-books');

  const proxy = createProxyMiddleware({
    target: 'https://openapi.naver.com',
    changeOrigin: true,
    pathRewrite: {
      '^/api/search-books': '/v1/search/book.json',
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
  return proxy(req, res);
};
