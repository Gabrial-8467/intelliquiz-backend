const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  question: String,
  correct_answer: String,
  options: [String],
});

const quizSchema = new mongoose.Schema({
  uuid: { type: String, unique: true, required: false },
  topic: { type: String, required: true },
  questions: [questionSchema],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
});

module.exports = mongoose.model("Quiz", quizSchema);
