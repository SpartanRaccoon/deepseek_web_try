const express = require('express');
const router = express.Router();
const readingController = require('../controllers/readingController');

// 创建新的解读
router.post('/', readingController.createReading);

// 获取特定解读
router.get('/:id', readingController.getReading);

// 获取历史解读
router.get('/', readingController.getUserReadings);

module.exports = router;
