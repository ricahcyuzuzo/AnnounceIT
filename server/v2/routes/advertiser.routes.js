/* eslint-disable comma-dangle */
import Router from 'express';
import advertiserController from '../controllers/advertiser.controller';
import verifyToken from '../middlewares/verifyLogin';

const routes = Router();

routes.post(
  '/announcement',
  verifyToken,
  advertiserController.createAnnouncement
);

export default routes;
