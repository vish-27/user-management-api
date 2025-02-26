// routes/users.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const {
  createUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser
} = require('../controllers/userController');

// Apply JWT authentication middleware to all routes in this file
router.use(authMiddleware);

router.post('/', createUser);
router.get('/', getAllUsers);
router.get('/:id', getUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
