import Router from 'express';
import userController from '../controllers/auth.controller';

const routes = Router();

routes.post('/auth/signup', userController.signUp);

export default routes;
