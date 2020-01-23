/* eslint-disable comma-dangle */
import Router from 'express';
import adminController from '../controllers/admin.controller';

const routes = Router();

routes.get('/admin/announcement', adminController.viewAllAnnouncement);

export default routes;
