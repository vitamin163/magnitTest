const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    'https://codeforces.com/api/user.status',
    createProxyMiddleware({
      target: 'https://codeforces.com',
      changeOrigin: true,
    }),
  );
};
