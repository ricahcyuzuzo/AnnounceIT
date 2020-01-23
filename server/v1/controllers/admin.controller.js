/* eslint-disable radix */
/* eslint-disable arrow-parens */
/* eslint-disable consistent-return */
/* eslint-disable comma-dangle */
import announcements from '../models/announcement.db';
import announcement from '../models/announcement.model';
import users from '../models/user.db';
import validate from '../helpers/announcement.validation';

class adminController {
  static viewAllAnnouncement(req, res) {
    res.status(200).json({
      status: 200,
      message: 'View all announcements',
      data: announcements
    });
  }
}

export default adminController;
