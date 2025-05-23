const express = require('express');
const router = express.Router();
const { registerUser,loginUser } = require('../controllers/authController'); // Ensure the path is correct

// Register route
router.post('/register', registerUser);
router.post('/login',loginUser)

module.exports = router;