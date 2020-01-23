/* eslint-disable comma-dangle */
import Router from 'express';
import advertiserController from '../controllers/advertiser.controller';

const routes = Router();

routes.post('/user/announcement', advertiserController.createAnnouncement);
routes.patch('/user/announcement/:id', advertiserController.updateAnnouncement);

export default routes;
