import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class Authentication {
  static generateToken(email, id) {
    return jwt.sign({ email, id }, 'secretKey', { expiresIn: '120s' });
  }

  static hashPassword(password) {
    return bcrypt.hashSync(password, 10);
  }

  static checkPassword(plainPassword, hashedPassword) {
    return bcrypt.compareSync(plainPassword, hashedPassword);
  }
}

export default Authentication;
