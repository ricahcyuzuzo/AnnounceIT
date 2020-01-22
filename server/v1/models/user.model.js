/* eslint-disable no-shadow */
/* eslint-disable comma-dangle */
/* eslint-disable arrow-parens */
import users from './user.db';
import auth from '../helpers/authenticate';

const user = req => {
  const user = {
    id: users.length + 1,
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: auth.hashPassword(req.body.password),
    phoneNumber: req.body.phoneNumber,
    address: req.body.address,
    isAdmin: false
  };
  return user;
};

export default user;
