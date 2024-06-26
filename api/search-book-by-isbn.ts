const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (req, res) => {
  const proxy = createProxyMiddleware({
    target: 'https://openapi.naver.com',
    changeOrigin: true,
    pathRewrite: {
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
    },
  });
  return proxy(req, res);
};
