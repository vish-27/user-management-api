// validators/user.js
const Joi = require('joi');

const createUserSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  role: Joi.string().valid('user', 'admin').required(),
});

const updateUserSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  role: Joi.string().valid('user', 'admin'),
}).min(1);

module.exports = {
  createUserSchema,
  updateUserSchema,
};
