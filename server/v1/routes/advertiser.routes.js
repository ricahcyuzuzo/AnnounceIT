/* eslint-disable comma-dangle */
import Router from 'express';
import advertiserController from '../controllers/advertiser.controller';

const routes = Router();

routes.post(
  '/user/createAnnouncement',
  advertiserController.createAnnouncement
);
routes.patch(
  '/user/updateAnnouncement',
  advertiserController.updateAnnouncement
);

export default routes;
