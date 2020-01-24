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

  static deleteAnnouncement(req, res) {
    const exist = announcements.find(ann => ann.id === parseInt(req.params.id));
    if (!exist) {
      return res.status(404).json({
        status: 404,
        message: 'Not announcement found!'
      });
    }
    announcements.splice(announcements.indexOf(exist), 1);
    res.status(202).json({
      status: 202,
      message: 'Deleted'
    });
  }
}

export default adminController;
