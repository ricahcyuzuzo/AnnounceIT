/* eslint-disable no-else-return */
/* eslint-disable no-undef */
/* eslint-disable arrow-parens */
/* eslint-disable consistent-return */
/* eslint-disable comma-dangle */
import users from '../models/user.db';
import user from '../models/user.model';
import userLogin from '../models/signIn.model';
import validate from '../helpers/user.validation';
import auth from '../helpers/authenticate';

class userController {
  static signUp(req, res) {
    const { error } = validate.validation(user(req));
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

  static signIn(req, res) {
    const { error } = validate.validateSignin(userLogin(req));
    if (error) {
      return res.status(400).json({
        status: 400,
        errorMessage: error.details[0].message.replace(/"/g, '')
      });
    }
    const userAccount = users.find(usr => usr.email === req.body.email);
    if (!userAccount) {
      return res.status(403).json({
        status: 403,
        message: "Oops, You don't have an account yet, Please sign up"
      });
    }
    const verifyPassword = auth.checkPassword(
      req.body.password,
      userAccount.password
    );
    if (verifyPassword) {
      return res.status(200).json({
        status: 200,
        message: 'You are signed in successfully',
        token: auth.generateToken(userAccount.email, userAccount.id)
      });
    } else {
      return res.status(401).json({
        status: 401,
        message: 'SignIn Failed'
      });
    }
  }
}
export default userController;
