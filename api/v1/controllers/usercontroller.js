import jwt from 'jsonwebtoken';
import env from 'dotenv';
import bcrypt from 'bcrypt';
import { userStore } from '../datastore';
import Users from '../models/user';

env.config();

export default {
  registerUser: async (req, res) => {
    const userLength = userStore.length;

    for (let i = 0; i < userLength; i += 1) {
      if (userStore[i].email === req.body.email) {
        return res.status(409).json({
          status: 409,
          error: 'This email is already registered.',
        });
      }
    }

    req.body.id = userLength > 0 ? userStore[userLength - 1].id + 1 : 1;

    const user = new Users(req.body);
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await userStore.push(user);

    const payload = { id: user.id, email: user.email };

    const token = jwt.sign(payload, process.env.jwtPrivateKey, { expiresIn: '10h' });
    return res.header('x-auth-token', token).status(201).json({
      status: 201,
      data: {
        token,
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  },
};
