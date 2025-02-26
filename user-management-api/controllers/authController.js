// controllers/authController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('../config/jwt');

exports.signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Create and save new user
    const user = new User({ name, email, password });
    await user.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid email or password' });

    // Validate password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid email or password' });

    // Generate JWT token
    const payload = { id: user._id, email: user.email, role: user.role };
    const token = jwt.sign(payload, config.secret, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    next(err);
  }
};
