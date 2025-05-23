const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  quizId: {
    type: String,
    required: false,
  },
  topic: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  totalQuestions: {
    type: Number,
    required: true,
  },
  answers: {
    type: Object,
    default: {},
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// ✅ Check if model already exists before creating it
const Result = mongoose.models.Result || mongoose.model('Result', resultSchema);

module.exports = Result;
