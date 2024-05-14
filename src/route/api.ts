import express from 'express';
import { authMiddleware } from '../middleware/auth-middleware';
import { UserController } from '../controller/user-controller';
import { PostController } from '../controller/post-controller';

export const apiRouter =  express();

apiRouter.use(authMiddleware);

// User API
apiRouter.get('/users/current', UserController.get);
apiRouter.patch('/users/current', UserController.update);
apiRouter.delete('/users/current', UserController.logout);

// Post API
apiRouter.post('/posts', PostController.create);
apiRouter.put('/posts/:slug', PostController.update);
apiRouter.delete('/posts/:slug', PostController.remove);
