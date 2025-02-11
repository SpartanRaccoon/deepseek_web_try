const express = require('express');
const cors = require('cors');
const readingRoutes = require('../routes/readings');

const app = express();

// 中间件
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cache-Control', 'Pragma', 'Accept', 'Accept-Language', 'Connection', 'Origin', 'Referer', 'Sec-Fetch-Dest', 'Sec-Fetch-Mode', 'Sec-Fetch-Site', 'User-Agent'],
  credentials: true,
  maxAge: 86400 // 预检请求缓存24小时
}));

// 设置响应头
app.use((req, res, next) => {
  res.set({
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0',
    'Surrogate-Control': 'no-store'
  });
  next();
});

// 配置 express
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// 处理 JSON 响应的中间件
app.use((req, res, next) => {
  const originalJson = res.json;
  res.json = function(obj) {
    return originalJson.call(this, obj);
  };
  next();
});

// 路由
app.use('/api/readings', readingRoutes);

// 错误处理中间件
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: '服务器内部错误' });
});

// 启动服务器
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
