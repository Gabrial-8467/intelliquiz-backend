const User = require('../models/User'); // Adjust the path if necessary
const jwt = require('jsonwebtoken');


const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = new User({ name, email, password });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to register user' });
  }
};

const loginUser = async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    if (user.password != password) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    const jwtToken = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    res.status(200).json({ message: 'Login successful', user, token: jwtToken });
  } catch (error) {
    res.status(500).json({ error: 'Failed to login user' });
  }
};

module.exports = { registerUser,loginUser };