/* eslint-disable arrow-parens */
/* eslint-disable consistent-return */
/* eslint-disable prefer-const */
/* eslint-disable comma-dangle */
import users from '../models/user.db';
import user from '../models/user.model';
import validate from '../helpers/user.validation';
import auth from '../helpers/authenticate';

class userController {
  static signUp(req, res) {
    let { error } = validate(user(req));

    if (error) {
      return res.status(400).json({
        status: 'error',
        error: error.details[0].message.replace(/"/g, ''),
      });
    }

    const exist = users.find((usr) => usr.email === req.body.email);
    if (exist) {
      res.status(409).json({
        status: 'error',
        error: 'This Email already exists',
      });
    } else {
      users.push(user(req));
      res.status(201).json({
        status: 'success',
        data: {
          email: req.body.email,
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          phoneNumber: req.body.phoneNumber,
          address: req.body.address,
        },
        token: auth.generateToken(req.body.email, users.length),
      });
    }
  }
}

export default userController;
