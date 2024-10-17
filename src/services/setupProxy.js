const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://vapi.vnappmob.com",
      changeOrigin: true,
      pathRewrite: {
        "^/api": "",
      },
      onProxyRes: function (proxyRes) {
        // Thêm Access-Control-Allow-Origin header
        proxyRes.headers["Access-Control-Allow-Origin"] = "*";
      },
    })
  );
};
