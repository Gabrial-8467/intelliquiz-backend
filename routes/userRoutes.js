const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authMiddleware');
const User = require('../models/User');
const QuizResult = require('../models/result'); // Fixed casing to match actual file

// Secure route using JWT middleware
router.get('/profile', authenticate, async (req, res) => {
  try {
    // Fix: use _id from token payload
    const user = await User.findById(req.user._id).select('-password');
    if (!user) return res.status(404).json({ error: 'User not found' });

    const quizHistory = await QuizResult.find({ userId: user._id });

    res.json({ user, quizHistory });
  } catch (err) {
    console.error('Profile fetch error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
