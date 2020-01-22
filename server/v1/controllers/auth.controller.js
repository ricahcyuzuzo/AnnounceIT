/* eslint-disable no-undef */
/* eslint-disable arrow-parens */
/* eslint-disable consistent-return */
/* eslint-disable comma-dangle */
import users from '../models/user.db';
import user from '../models/user.model';
import validate from '../helpers/user.validation';
import auth from '../helpers/authenticate';

class userController {
  static signUp(req, res) {
    const { error } = validate(user(req));

    if (error) {
      return res.status(400).json({
        status: 400,
        errorMessage: error.details[0].message.replace(/"/g, '')
      });
    }

    const exist = users.find(usr => usr.email === req.body.email);
    if (exist) {
      res.status(409).json({
        status: 409,
        error: 'This Email already exists'
      });
    } else {
      users.push(user(req));
      res.status(201).json({
        status: 201,
        message: 'User Created Successfully',
        data: {
          email: req.body.email,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          phoneNumber: req.body.phoneNumber,
          address: req.body.address,
          isAdmin: user(req).isAdmin
        },
        token: auth.generateToken(req.body.email, users.length)
      });
    }
  }
}

export default userController;
