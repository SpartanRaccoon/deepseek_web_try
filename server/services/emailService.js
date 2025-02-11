const nodemailer = require('nodemailer');

// 创建邮件传输器
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

const emailService = {
  // 发送重置密码邮件
  async sendResetPasswordEmail(email, token) {
    const resetUrl = `${process.env.CLIENT_URL}/reset-password?token=${token}`;
    
    const mailOptions = {
      from: process.env.SMTP_FROM,
      to: email,
      subject: '重置密码',
      html: `
        <h1>重置密码请求</h1>
        <p>您收到这封邮件是因为您（或其他人）请求重置密码。</p>
        <p>请点击下面的链接重置密码：</p>
        <a href="${resetUrl}">${resetUrl}</a>
        <p>如果您没有请求重置密码，请忽略此邮件。</p>
        <p>此链接将在1小时后失效。</p>
      `
    };

    await transporter.sendMail(mailOptions);
  },

  // 发送欢迎邮件
  async sendWelcomeEmail(email, name) {
    const mailOptions = {
      from: process.env.SMTP_FROM,
      to: email,
      subject: '欢迎加入 AI 个人解读',
      html: `
        <h1>欢迎 ${name}！</h1>
        <p>感谢您注册 AI 个人解读。</p>
        <p>我们为您提供专业的星座、紫微斗数、生辰八字和 MBTI 解读服务。</p>
        <p>立即开始您的解读之旅：</p>
        <a href="${process.env.CLIENT_URL}">${process.env.CLIENT_URL}</a>
      `
    };

    await transporter.sendMail(mailOptions);
  },

  // 发送解读完成通知
  async sendReadingCompletedEmail(email, readingType, readingId) {
    const readingUrl = `${process.env.CLIENT_URL}/reading/result/${readingId}`;
    
    const mailOptions = {
      from: process.env.SMTP_FROM,
      to: email,
      subject: '您的解读已完成',
      html: `
        <h1>解读完成通知</h1>
        <p>您的${readingType}解读已完成。</p>
        <p>点击下面的链接查看详细解读结果：</p>
        <a href="${readingUrl}">${readingUrl}</a>
      `
    };

    await transporter.sendMail(mailOptions);
  }
};

module.exports = emailService;
