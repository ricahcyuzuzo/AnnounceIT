/* eslint-disable consistent-return */
/* eslint-disable comma-dangle */
/* eslint-disable object-curly-newline */
import jwtDecode from 'jwt-decode';
import pool from '../config/config';
import announcementQueries from '../models/announcement.query';
import announcement from '../models/announcement.model';
import validate from '../helpers/announcement.validation';

class advertiserController {
  static async createAnnouncement(req, res) {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwtDecode(token);
    const { error } = validate(announcement(req));

    if (error) {
      return res.status(400).json({
        status: 400,
        errorMessage: error.details[0].message.replace(/"/g, '')
      });
    }

    const ownerId = decoded.user.id;
    const status = 'pending';
    const { text, startDate, endDate } = req.body;
    const added = await pool.query(announcementQueries.createAnnouncement, [
      ownerId,
      status,
      text,
      startDate,
      endDate
    ]);

    if (added.rowCount === 1) {
      const exists = await pool.query(announcementQueries.getOne, [text]);
      const exist = exists.rows[0];
      res.status(201).json({
        status: 201,
        message: 'Announcement created successfully',
        data: exist
      });
    }
  }
}

export default advertiserController;
