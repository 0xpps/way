const config = {
  supportsResponseStreaming: true
};

const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

// 创建 Express 应用
const app = express();

// 定义要代理的目标地址
const targetUrl = 'https://chat.openai.com/backend-anon';

// 设置代理路径和目标
app.use('/api', createProxyMiddleware({
  target: targetUrl,
  changeOrigin: true,
  pathRewrite: {
    '^/api': '', // 重写请求路径，确保请求被正确代理到目标地址，去除/api前缀
  },
  onProxyReq: (proxyReq, req, res) => {
    // 可以在这里修改代理请求的头部等
  },
  onError: (err, req, res) => {
    console.log(err);
    res.status(500).send('代理过程中发生错误');
  }
}));
app.get('/', (req, res) => {
  res.send('80604648-c399-4a79-8f00-294df292503a');
});

// 代理服务器监听的端口
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`代理服务器运行在 http://localhost:${PORT}`);
});
