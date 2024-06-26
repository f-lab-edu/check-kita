const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (req, res) => {
  const proxy = createProxyMiddleware({
    target: 'https://openapi.naver.com',
    changeOrigin: true,
    pathRewrite: {
      '^/api/search-book-by-isbn': '/v1/search/book_adv.xml',
    },
  });
  return proxy(req, res);
};
