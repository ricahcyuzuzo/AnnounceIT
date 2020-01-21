/* eslint-disable no-shadow */
/* eslint-disable comma-dangle */
/* eslint-disable arrow-parens */
import users from './user.db';
import auth from '../helpers/authenticate';

const user = (req) => {
  const user = {
    id: users.length + 1,
    email: req.body.email,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    password: auth.hashPassword(req.body.password),
    phoneNumber: req.body.phoneNumber,
    address: req.body.address,
    is_admin: 'true',
  };
  return user;
};

export default user;
