import { Router } from 'express';
import * as userController from '../controllers/user.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { generateMiddleWare } from '../middleware/route.middleware.js';
import { postSchema } from '../validations/auth.validation.js';

const userRoute = Router();
userRoute.post(
  '/create',
  authMiddleware,
  generateMiddleWare(postSchema),
  userController.createPost
);
userRoute.put(
  '/:postId/update',
  authMiddleware,
  generateMiddleWare(postSchema),
  userController.updatePost
);
userRoute.get('/', authMiddleware, userController.getAllPosts);
userRoute.get('/:postId', authMiddleware, userController.getOnePost);
userRoute.delete('/:postId/delete', authMiddleware, userController.deletePost);

export default userRoute;
