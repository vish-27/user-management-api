// routes/users.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth'); // Ensure no () here
const { validateBody } = require('../middleware/validate');
const { createUserSchema, updateUserSchema } = require('../validators/user');
const {
  createUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser
} = require('../controllers/userController');

// Apply JWT middleware to all routes in this file
router.use(authMiddleware);

router.post('/', validateBody(createUserSchema), createUser);
router.get('/', getAllUsers);
router.get('/:id', getUser);
router.put('/:id', validateBody(updateUserSchema), updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
