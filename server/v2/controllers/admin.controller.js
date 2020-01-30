/* eslint-disable consistent-return */
/* eslint-disable comma-dangle */
/* eslint-disable object-curly-newline */
import jwtDecode from 'jwt-decode';
import pool from '../config/config';
import announcementQueries from '../models/announcement.query';
import announcement from '../models/announcement.model';
import validate from '../helpers/announcement.validation';

class adminController {
  static async deleteAnnouncement(req, res) {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwtDecode(token);

    if (decoded.user.isadmin === true) {
      const exist = await pool.query(announcementQueries.getOneUpdate, [
        req.params.id
      ]);

      if (exist.rowCount === 0) {
        return res.status(404).json({
          status: 404,
          errorMessage: 'Announcement not found!'
        });
      }

      const deleted = await pool.query(announcementQueries.deleteAnnouncement, [
        req.params.id
      ]);

      if (deleted.rowCount > 0) {
        return res.status(202).json({
          status: 202,
          message: 'Announcement deleted'
        });
      }
    } else {
      res.status(401).json({
        status: 401,
        errorMessage: 'You are not allowed for this action!'
      });
    }
  }
}

export default adminController;
