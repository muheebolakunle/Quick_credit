import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const { jwtPrivateKey } = process.env;

export default class Jwt {
  static async generateToken(payload) {
    const token = await jwt.sign(payload, jwtPrivateKey, { expiresIn: '14d' });
    return token;
  }

  static async verifyToken(token) {
    const decoded = await jwt.verify(token, jwtPrivateKey);
    return decoded;
  }
}
