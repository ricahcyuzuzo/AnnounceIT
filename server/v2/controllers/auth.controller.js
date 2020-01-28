/* eslint-disable consistent-return */
/* eslint-disable no-trailing-spaces */
/* eslint-disable comma-dangle */
import userQueries from '../models/user.query';
import user from '../models/user.model';
import validate from '../helpers/user.validation';
import auth from '../helpers/authenticate';
import pool from '../config/config';

class userController {
  static async signUp(req, res) {
    const { error } = validate.validation(user(req));

    if (error) {
      return res.status(400).json({
        status: 400,
        errorMessage: error.details[0].message.replace(/"/g, '')
      });
    }

    const exist = await pool.query(userQueries.getOne, [req.body.email]);
    if (exist.rows[0]) {
      res.status(409).json({
        status: 409,
        errorMessage: 'Email already exist!'
      });
    } else {
      // eslint-disable-next-line object-curly-newline
      const { id, email, firstName, lastName, phoneNumber, address } = req.body;
      const password = auth.hashPassword(req.body.password);
      const isAdmin = 'false';

      const added = await pool.query(userQueries.signupQuery, [
        id,
        email,
        firstName,
        lastName,
        password,
        phoneNumber,
        address,
        isAdmin
      ]);

      if (added.rowCount === 1) {
        const exi = await pool.query(userQueries.getOne, [req.body.email]);
        return res.status(201).json({
          status: 201,
          message: 'User created successfully!',
          data: exi.rows[0],
          token: auth.generateToken(exi.rows[0].email, exi.rows[0].id)
        });
      }
    }
  }
}

export default userController;
