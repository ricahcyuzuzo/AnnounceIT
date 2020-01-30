/* eslint-disable comma-dangle */
import Router from 'express';
import verifyToken from '../middlewares/verifyLogin';
import adminController from '../controllers/admin.controller';

const routes = Router();

routes.delete(
  '/announcement/:id',
  verifyToken,
  adminController.deleteAnnouncement
);

export default routes;
