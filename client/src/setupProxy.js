const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  console.log(`Will proxy to ${process.env.SERVER}`);
  app.use(
    "/api",
    createProxyMiddleware({
      target: process.env.SERVER,
      changeOrigin: true,
    })
  );
};
