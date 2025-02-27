// routes/auth.js
const express = require('express');
const router = express.Router();
const { signup, loginUser } = require('../controllers/authController');
const { validateBody } = require('../middleware/validate');
const { signupSchema, loginSchema } = require('../validators/auth');

router.post('/signup', validateBody(signupSchema), signup);
router.post('/login', validateBody(loginSchema), loginUser);

module.exports = router;
