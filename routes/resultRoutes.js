const express = require('express');
const router = express.Router();
const Result = require('../models/result');
const authenticate = require('../middleware/authMiddleware'); // JWT auth middleware

// Get all results for a user
router.get('/user', authenticate, async (req, res) => {
  try {
    const results = await Result.find({ user: req.user._id })
      .sort({ createdAt: -1 });
    res.json(results);
  } catch (error) {
    console.error('Error fetching user results:', error);
    res.status(500).json({ error: 'Failed to fetch results' });
  }
});

// Save quiz result
router.post('/', authenticate, async (req, res) => {
  try {
    const { topic, score, totalQuestions, answers } = req.body;

    const result = new Result({
      userId: req.user._id,
      topic,
      score,
      totalQuestions,
      answers
    });

    await result.save();
    res.status(201).json({ message: 'Result saved successfully', result });
  } catch (error) {
    console.error('Error saving result:', error);
    res.status(500).json({ error: 'Failed to save result' });
  }
});

// Get results for a specific quiz
router.get('/quiz/:quizId', authenticate, async (req, res) => {
  try {
    const results = await Result.find({ quizId: req.params.quizId })
      .sort({ createdAt: -1 });
    res.json(results);
  } catch (error) {
    console.error('Error fetching quiz results:', error);
    res.status(500).json({ error: 'Failed to fetch quiz results' });
  }
});

module.exports = router;
