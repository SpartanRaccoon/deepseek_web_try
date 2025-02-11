# 命理综合解读系统

一个基于 AI 的命理综合解读系统，结合八字、紫微斗数和西方占星的智能解读服务。使用 DeepSeek API 提供准确、个性化的解读结果。

## 特点

- 🔮 综合解读：结合中国传统命理（八字、紫微斗数）和西方占星
- 🎯 个性化分析：融合 MBTI 性格维度，提供更准确的个人特质解读
- ⚡ 实时响应：流式输出解读结果，提供即时反馈
- 🎨 优雅界面：金色云纹设计，富有东方韵味的现代界面

## 技术栈

### 后端
- Node.js
- Express
- DeepSeek API

### 前端
- React
- Tailwind CSS
- Vite

## 快速开始

### 环境要求
- Node.js 16+
- npm 7+

### 安装步骤

1. 克隆仓库
```bash
git clone https://github.com/yourusername/ai-personal-reading.git
cd ai-personal-reading
```

2. 安装依赖
```bash
# 安装后端依赖
cd server
npm install

# 安装前端依赖
cd ../client
npm install
```

3. 环境配置
```bash
# 在 server 目录下创建 .env 文件
DEEPSEEK_API_KEY=your_api_key_here
PORT=3000
```

4. 启动服务
```bash
# 启动后端服务（在 server 目录下）
npm start

# 启动前端开发服务器（在 client 目录下）
npm run dev
```

5. 访问应用
打开浏览器访问 http://localhost:5173

## 项目结构

```
ai-personal-reading/
├── client/                 # 前端项目
│   ├── public/            # 静态资源
│   ├── src/
│   │   ├── components/    # React 组件
│   │   ├── services/      # API 服务
│   │   └── App.jsx        # 主应用组件
│   ├── index.html
│   └── package.json
├── server/                 # 后端项目
│   ├── controllers/       # 控制器
│   ├── routes/           # 路由
│   ├── app.js            # Express 应用
│   └── package.json
└── README.md
```

## API 文档

### POST /api/readings
创建新的命理解读

请求体：
```json
{
  "data": {
    "name": "姓名",
    "gender": "male|female",
    "birthDate": "YYYY-MM-DD",
    "birthTime": "HH:mm",
    "birthLocation": "出生地点",
    "mbtiScores": [50, 50, 50, 50]
  }
}
```

响应：
- 使用 Server-Sent Events (SSE) 流式返回解读结果
- 每个事件包含解读内容的一部分
- 最后发送 [DONE] 标记表示结束

## 贡献指南

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 许可证

MIT License - 查看 [LICENSE](LICENSE) 文件了解详情

## 致谢

- [DeepSeek](https://deepseek.com) - AI 模型支持
- [React](https://reactjs.org/) - 前端框架
- [Tailwind CSS](https://tailwindcss.com/) - CSS 框架
