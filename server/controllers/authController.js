const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models/User');
const { sendResetPasswordEmail } = require('../services/emailService');

const authController = {
  // 用户注册
  async register(req, res) {
    try {
      const { name, email, password, birthDate, birthTime, birthLocation } = req.body;

      // 检查邮箱是否已存在
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: '该邮箱已被注册' });
      }

      // 加密密码
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // 创建新用户
      const user = new User({
        name,
        email,
        password: hashedPassword,
        birthData: {
          date: birthDate,
          time: birthTime,
          location: birthLocation
        }
      });

      await user.save();

      res.status(201).json({ message: '注册成功' });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ message: '注册失败，请稍后重试' });
    }
  },

  // 用户登录
  async login(req, res) {
    try {
      const { email, password } = req.body;

      // 查找用户
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: '邮箱或密码错误' });
      }

      // 验证密码
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: '邮箱或密码错误' });
      }

      // 生成 JWT token
      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );

      // 返回用户信息和token
      res.json({
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          birthData: user.birthData,
          preferences: user.preferences
        }
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: '登录失败，请稍后重试' });
    }
  },

  // 发送重置密码邮件
  async forgotPassword(req, res) {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({ message: '未找到该邮箱对应的用户' });
      }

      // 生成重置token
      const resetToken = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      // 保存重置token
      user.resetPasswordToken = resetToken;
      user.resetPasswordExpires = Date.now() + 3600000; // 1小时后过期
      await user.save();

      // 发送重置密码邮件
      await sendResetPasswordEmail(user.email, resetToken);

      res.json({ message: '重置密码链接已发送到您的邮箱' });
    } catch (error) {
      console.error('Forgot password error:', error);
      res.status(500).json({ message: '发送重置密码邮件失败，请稍后重试' });
    }
  },

  // 重置密码
  async resetPassword(req, res) {
    try {
      const { token, newPassword } = req.body;

      // 验证token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findOne({
        _id: decoded.userId,
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() }
      });

      if (!user) {
        return res.status(400).json({ message: '重置密码链接无效或已过期' });
      }

      // 更新密码
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      await user.save();

      res.json({ message: '密码重置成功' });
    } catch (error) {
      console.error('Reset password error:', error);
      res.status(500).json({ message: '重置密码失败，请稍后重试' });
    }
  },

  // 修改密码
  async changePassword(req, res) {
    try {
      const { currentPassword, newPassword } = req.body;
      const userId = req.user.id;

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: '用户不存在' });
      }

      // 验证当前密码
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: '当前密码错误' });
      }

      // 更新密码
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
      await user.save();

      res.json({ message: '密码修改成功' });
    } catch (error) {
      console.error('Change password error:', error);
      res.status(500).json({ message: '修改密码失败，请稍后重试' });
    }
  }
};

module.exports = authController;
