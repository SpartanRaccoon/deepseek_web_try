const { User } = require('../models/User');

const userController = {
  // 获取用户档案
  async getProfile(req, res) {
    try {
      const userId = req.user.id;
      const user = await User.findById(userId).select('-password');
      
      if (!user) {
        return res.status(404).json({ message: '用户不存在' });
      }

      res.json(user);
    } catch (error) {
      console.error('Get profile error:', error);
      res.status(500).json({ message: '获取用户档案失败' });
    }
  },

  // 更新用户档案
  async updateProfile(req, res) {
    try {
      const userId = req.user.id;
      const { name, birthData, preferences } = req.body;

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: '用户不存在' });
      }

      // 更新用户信息
      if (name) user.name = name;
      if (birthData) user.birthData = birthData;
      if (preferences) user.preferences = preferences;

      await user.save();

      res.json(user);
    } catch (error) {
      console.error('Update profile error:', error);
      res.status(500).json({ message: '更新用户档案失败' });
    }
  },

  // 获取用户解读历史
  async getReadingHistory(req, res) {
    try {
      const userId = req.user.id;
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;

      const readings = await Reading.find({ userId })
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .populate('type');

      const total = await Reading.countDocuments({ userId });
      const totalPages = Math.ceil(total / limit);

      res.json({
        readings,
        currentPage: page,
        totalPages,
        totalReadings: total
      });
    } catch (error) {
      console.error('Get reading history error:', error);
      res.status(500).json({ message: '获取解读历史失败' });
    }
  },

  // 删除用户账号
  async deleteAccount(req, res) {
    try {
      const userId = req.user.id;
      const { password } = req.body;

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: '用户不存在' });
      }

      // 验证密码
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: '密码错误' });
      }

      // 删除用户相关的所有数据
      await Reading.deleteMany({ userId });
      await User.findByIdAndDelete(userId);

      res.json({ message: '账号已删除' });
    } catch (error) {
      console.error('Delete account error:', error);
      res.status(500).json({ message: '删除账号失败' });
    }
  },

  // 更新用户语言偏好
  async updateLanguage(req, res) {
    try {
      const userId = req.user.id;
      const { language } = req.body;

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: '用户不存在' });
      }

      user.preferences.language = language;
      await user.save();

      res.json({ message: '语言设置已更新' });
    } catch (error) {
      console.error('Update language error:', error);
      res.status(500).json({ message: '更新语言设置失败' });
    }
  },

  // 更新主题设置
  async updateTheme(req, res) {
    try {
      const userId = req.user.id;
      const { theme } = req.body;

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: '用户不存在' });
      }

      user.preferences.theme = theme;
      await user.save();

      res.json({ message: '主题设置已更新' });
    } catch (error) {
      console.error('Update theme error:', error);
      res.status(500).json({ message: '更新主题设置失败' });
    }
  }
};

module.exports = userController;
