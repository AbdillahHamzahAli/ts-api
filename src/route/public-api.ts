import express from "express";
import { UserController } from "../controller/user-controller";
import { PostController } from "../controller/post-controller";


export const publicRouter = express.Router();

publicRouter.post('/register', UserController.register);
publicRouter.post('/login', UserController.login);

// Post API
publicRouter.get('/posts',PostController.search);
publicRouter.get('/posts/:slug',PostController.get);