// controllers/userController.js
const User = require('../models/User');

exports.createUser = async (req, res, next) => {
  try {
    const { name, email, role } = req.body;

    // This endpoint creates a user without a provided password.
    // In a production scenario, you might want to generate a random password or enforce a workflow.
    const user = new User({ name, email, password: 'defaultpassword', role });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    // Exclude the password field from the result
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    next(err);
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    next(err);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const { name, email, role } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, role },
      { new: true }
    );
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    next(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    next(err);
  }
};
