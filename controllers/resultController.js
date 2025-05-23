const Result = require("../models/Result");
const Quiz = require("../models/Quiz");

// Submit a quiz result
exports.submitResult = async (req, res) => {
  const { quizId, score } = req.body;

  try {
    // Check if the quiz exists
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    // Create a result entry for the user
    const result = await Result.create({
      user: req.user._id,  // Associate the result with the logged-in user
      quiz: quizId,
      score,
    });

    // Respond with the created result
    res.status(201).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all results for a specific user
exports.getUserResults = async (req, res) => {
  try {
    // Fetch results for the logged-in user and populate quiz details
    const results = await Result.find({ user: req.user._id }).populate("quiz");

    // Return the user's quiz results
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
