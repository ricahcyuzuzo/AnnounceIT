import Router from 'express';
import userController from '../controllers/auth.controller';
import verifyLogin from '../middlewares/verifyLogin';

const routes = Router();

routes.post('/auth/signup', userController.signUp);
routes.post('/auth/signin', userController.signIn);
routes.post('/auth/admin', verifyLogin, userController.adminRegister);

export default routes;
