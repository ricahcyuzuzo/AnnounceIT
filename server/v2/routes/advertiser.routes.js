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

routes.patch(
  '/announcement/:id',
  verifyToken,
  advertiserController.updateAnnouncement
);

routes.get(
  '/announcement/:ownerId',
  verifyToken,
  advertiserController.viewAnnouncements
);

routes.get(
  '/announcement/',
  verifyToken,
  advertiserController.viewannouncementsbyState
);

routes.get(
  '/announcements/:announcementId',
  verifyToken,
  advertiserController.viewspecificAnnouncement
);

export default routes;
