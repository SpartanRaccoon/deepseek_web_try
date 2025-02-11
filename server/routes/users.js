const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

// 所有路由都需要认证
router.use(auth);

// 获取用户档案
router.get('/profile', userController.getProfile);

// 更新用户档案
router.put('/profile', userController.updateProfile);

// 获取解读历史
router.get('/readings', userController.getReadingHistory);

// 删除账号
router.delete('/account', userController.deleteAccount);

// 更新语言设置
router.put('/language', userController.updateLanguage);

// 更新主题设置
router.put('/theme', userController.updateTheme);

module.exports = router;
