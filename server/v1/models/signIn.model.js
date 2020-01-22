/* eslint-disable comma-dangle */
/* eslint-disable arrow-parens */
import auth from '../helpers/authenticate';

const userLogin = req => {
  const user = {
    email: req.body.email,
    password: auth.hashPassword(req.body.password)
  };

  return user;
};

export default userLogin;
