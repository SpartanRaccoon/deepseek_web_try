const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');

// 注册
router.post('/register', authController.register);

// 登录
router.post('/login', authController.login);

// 忘记密码
router.post('/forgot-password', authController.forgotPassword);

// 重置密码
router.post('/reset-password', authController.resetPassword);

// 修改密码（需要认证）
router.put('/change-password', auth, authController.changePassword);

module.exports = router;
