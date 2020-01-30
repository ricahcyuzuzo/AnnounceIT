/* eslint-disable comma-dangle */
import jwt from 'jsonwebtoken';

const verifyLogin = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const verify = jwt.verify(token, 'secretKey');

    if (verify) {
      req.user = verify;
      next();
    } else {
      res.status(403).json({
        status: 403,
        errorMessage: 'Failed to Authenticate'
      });
    }
  } catch (error) {
    res.status(403).json({
      status: 403,
      errorMessage: 'Failed to Athenticate'
    });
  }
};

export default verifyLogin;
