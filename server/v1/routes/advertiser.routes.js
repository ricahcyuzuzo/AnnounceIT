/* eslint-disable comma-dangle */
import Router from 'express';
import advertiserController from '../controllers/advertiser.controller';

const routes = Router();

routes.post('/user/announcement', advertiserController.createAnnouncement);
routes.patch('/user/announcement/:id', advertiserController.updateAnnouncement);
routes.get(
  '/user/announcements/:ownerId',
  advertiserController.viewAnnouncements
);
routes.get(
  '/user/announcement/status/:status',
  advertiserController.viewbyspecificState
);
routes.get(
  '/user/announcement/:id',
  advertiserController.viewSpecificannouncement
);

export default routes;
