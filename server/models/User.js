const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  birthData: {
    date: Date,
    time: String,
    location: String
  },
  preferences: {
    language: {
      type: String,
      enum: ['zh', 'en'],
      default: 'zh'
    },
    theme: {
      type: String,
      enum: ['light', 'dark'],
      default: 'dark'
    }
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = { User };
