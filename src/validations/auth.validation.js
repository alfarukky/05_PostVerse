import Joi from 'joi';

export const registerSchema = Joi.object({
  name: Joi.string().min(3).max(255).required(),
  email: Joi.string().min(3).max(255).required().email(),
  password: Joi.string().min(3).max(255).required(),
  confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
});
export const loginSchema = Joi.object({
  email: Joi.string().min(3).max(255).required().email(),
  password: Joi.string().min(3).max(255).required(),
});

export const postSchema = Joi.object({
  title: Joi.string().min(3).max(50).required(),
  content: Joi.string().required(),
});
