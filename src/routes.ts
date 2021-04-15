import { Router } from 'express';
import UserController from './controllers/UserController';
import AuthController from './controllers/AuthController';
import AuthMiddleware from './middlewares/AuthMiddleware';

const routes = Router();

routes.get('/users', AuthMiddleware.authMiddleware, UserController.index);
routes.post('/users', UserController.create);

routes.post('/auth', AuthController.authenticate);

export default routes;
