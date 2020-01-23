/* eslint-disable radix */
/* eslint-disable arrow-parens */
/* eslint-disable consistent-return */
/* eslint-disable comma-dangle */
import announcements from '../models/announcement.db';
import announcement from '../models/announcement.model';
import users from '../models/user.db';
import validate from '../helpers/announcement.validation';

class advertiserController {
  static createAnnouncement(req, res) {
    const { error } = validate(announcement(req));
    if (error) {
      return res.status(400).json({
        status: 400,
        errorMessage: error.details[0].message.replace(/"/g, '')
      });
    }

    const exist = users.find(usr => usr.id === req.body.owner);
    if (!exist) {
      res.status(404).json({
        status: 404,
        errorMessage: 'Owner Not found!'
      });
    } else {
      announcements.push(announcement(req));
      res.status(201).json({
        status: 201,
        message: 'Announcement created successfully',
        data: {
          owner: req.body.owner,
          status: req.body.status,
          text: req.body.text,
          startDate: req.body.startDate,
          endDate: req.body.endDate
        }
      });
    }
  }

  static updateAnnouncement(req, res) {
    const { error } = validate(announcement(req));
    if (error) {
      return res.status(400).json({
        status: 400,
        errorMessage: error.details[0].message.replace(/"/g, '')
      });
    }

    const exist = announcements.find(ann => ann.id === parseInt(req.params.id));
    if (!exist) {
      return res.status(404).json({
        status: 404,
        errorMessage: 'Announcement Not Found!'
      });
    }

    announcements.text = req.body.text;
    announcements.owner = req.body.owner;
    announcements.startDate = req.body.startDate;
    announcements.endDate = req.body.endDate;

    return res.status(200).json({
      status: 200,
      message: 'Announcement Updated!',
      data: {
        owner: req.body.owner,
        status: announcement(req).status,
        text: req.body.text,
        startDate: req.body.startDate,
        endDate: req.body.endDate
      }
    });
  }
}
export default advertiserController;
