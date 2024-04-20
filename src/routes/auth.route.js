import { Router } from 'express';
import * as authController from '../controllers/auth.controller.js';
import { generateMiddleWare } from '../middleware/route.middleware.js';
import { registerSchema, loginSchema } from '../validations/auth.validation.js';
const authRoute = Router();

authRoute.post(
  '/register',
  generateMiddleWare(registerSchema),
  authController.register
);
authRoute.post('/login', generateMiddleWare(loginSchema), authController.login);

export default authRoute;
