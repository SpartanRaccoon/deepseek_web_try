const mongoose = require('mongoose');

const readingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['astrology', 'purpleStar', 'bazi', 'mbti'],
    required: true
  },
  inputData: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  calculatedData: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  result: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'completed', 'failed'],
    default: 'pending'
  },
  shareToken: {
    type: String,
    unique: true,
    sparse: true
  }
}, {
  timestamps: true
});

// 创建索引
readingSchema.index({ userId: 1, createdAt: -1 });
readingSchema.index({ shareToken: 1 });

const Reading = mongoose.model('Reading', readingSchema);

module.exports = { Reading };
