import Router from 'express';
import userController from '../controllers/auth.controller';

const routes = Router();

routes.post('/auth/signup', userController.signUp);
routes.post('/auth/signin', userController.signIn);

export default routes;
