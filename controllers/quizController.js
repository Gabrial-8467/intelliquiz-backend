const Quiz = require("../models/quiz");

// Create a new quiz
exports.createQuiz = async (req, res) => {
  const { topic, questions } = req.body;

  try {
    const quiz = await Quiz.create({
      topic,
      questions,
      createdBy: req.user._id,
    });

    res.status(201).json(quiz);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Save a quiz from frontend using UUID
exports.saveQuizWithUUID = async (req, res) => {
  const { uuid, topic, questions } = req.body;

  if (!uuid || !topic || !questions || !Array.isArray(questions)) {
    return res.status(400).json({ message: "Invalid quiz data" });
  }

  try {
    // Prevent duplicate saves
    const existing = await Quiz.findOne({ uuid });
    if (existing) {
      return res.status(200).json({ message: "Quiz already exists", quiz: existing });
    }

    const quiz = await Quiz.create({ uuid, topic, questions });
    res.status(201).json({ message: "Quiz saved successfully", quiz });
  } catch (err) {
    console.error("Error saving quiz:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all quizzes
exports.getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.json(quizzes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get quizzes created by the logged-in user
exports.getUserQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find({ createdBy: req.user._id });
    res.json(quizzes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get a quiz by its UUID
exports.getQuizByUUID = async (req, res) => {
  const { uuid } = req.params;

  try {
    const quiz = await Quiz.findOne({ uuid });

    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    res.json(quiz);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
