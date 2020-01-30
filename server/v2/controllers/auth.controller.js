/* eslint-disable consistent-return */
/* eslint-disable no-trailing-spaces */
/* eslint-disable comma-dangle */
import jwtDecode from 'jwt-decode';
import userQueries from '../models/user.query';
import user from '../models/user.model';
import validate from '../helpers/user.validation';
import auth from '../helpers/authenticate';
import pool from '../config/config';
import passwordValidate from '../middlewares/passwordValidator';

class userController {
  static async signUp(req, res) {
    const { email } = req.body;
    const lemail = email.toLowerCase();
    const { error } = validate.validation(user.user(req));

    if (error) {
      return res.status(400).json({
        status: 400,
        errorMessage: error.details[0].message.replace(/"/g, '')
      });
    }
    if (passwordValidate(req.body.password) === true) {
      const exist = await pool.query(userQueries.getOne, [lemail]);
      if (exist.rows[0]) {
        res.status(409).json({
          status: 409,
          errorMessage: 'Email already exist!'
        });
      } else {
        // eslint-disable-next-line object-curly-newline
        const { firstName, lastName, phoneNumber, address } = req.body;

        const isAdmin = 'false';
        const password = auth.hashPassword(req.body.password);
        const added = await pool.query(userQueries.signupQuery, [
          lemail,
          firstName,
          lastName,
          password,
          phoneNumber,
          address,
          isAdmin
        ]);

        if (added.rowCount === 1) {
          const exists = await pool.query(userQueries.getOne, [lemail]);
          return res.status(201).json({
            status: 201,
            message: 'User created successfully!',
            data: exists.rows[0],
            token: auth.generateToken(exists.rows[0])
          });
        }
      }
    } else {
      res.status(400).json({
        status: 400,
        errorMessage:
          'Password must not be empty, it has to be at least 8 characters long,  it has to be at least 1 lowercase letter,  it has to be at least 1 uppercase letter,  it has to be at least one digit and it has to be at least one special character'
      });
    }
  }

  static async signIn(req, res) {
    const { error } = validate.validateSignin(user.userLogin(req));

    if (error) {
      return res.status(400).json({
        status: 400,
        errorMessage: error.details[0].message.replace(/"/g, '')
      });
    }

    const { email, password } = req.body;
    const lemail = email.toLowerCase();
    const account = await pool.query(userQueries.getOneLogin, [lemail]);

    if (account.rowCount > 0) {
      const compare = auth.checkPassword(password, account.rows[0].password);

      if (compare) {
        res.status(200).json({
          status: 200,
          message: `${account.rows[0].email} is signed in Successfully!`,
          token: auth.generateToken(account.rows[0])
        });
      } else {
        res.status(401).json({
          status: 401,
          errorMessage: 'Wrong email or password'
        });
      }
    } else {
      res.status(404).json({
        status: 404,
        errorMessage: 'Wrong email or password'
      });
    }
  }

  static async adminRegister(req, res) {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwtDecode(token);

    if (decoded.user.isadmin === true) {
      const { email } = req.body;
      const lemail = email.toLowerCase();
      const { error } = validate.validation(user.user(req));

      if (error) {
        return res.status(400).json({
          status: 400,
          errorMessage: error.details[0].message.replace(/"/g, '')
        });
      }
      if (passwordValidate(req.body.password) === true) {
        const exist = await pool.query(userQueries.getOne, [lemail]);
        if (exist.rows[0]) {
          res.status(409).json({
            status: 409,
            errorMessage: 'Email already exist!'
          });
        } else {
          // eslint-disable-next-line object-curly-newline
          const { firstName, lastName, phoneNumber, address } = req.body;

          const isAdmin = 'true';
          const password = auth.hashPassword(req.body.password);
          const added = await pool.query(userQueries.signupQuery, [
            lemail,
            firstName,
            lastName,
            password,
            phoneNumber,
            address,
            isAdmin
          ]);
          if (added.rowCount === 1) {
            const exists = await pool.query(userQueries.getOne, [lemail]);
            return res.status(201).json({
              status: 201,
              message: 'User admin created successfully!',
              data: exists.rows[0],
              token: auth.generateToken(exists.rows[0])
            });
          }
        }
      } else {
        res.status(400).json({
          status: 400,
          errorMessage:
            'Password must not be empty, it has to be at least 8 characters long,  it has to be at least 1 lowercase letter,  it has to be at least 1 uppercase letter,  it has to be at least one digit and it has to be at least one special character'
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

export default userController;
