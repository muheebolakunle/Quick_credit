import bcrypt from 'bcrypt';
import { userStore } from '../datastore';
import Users from '../models/user';
import Jwt from '../utils/jwt';

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

    const { id, email, isAdmin } = user;
    const token = await Jwt.generateToken({ id, email, isAdmin });
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

  loginUser: async (req, res) => {
    const user = userStore.find(signedUser => signedUser.email === req.body.email);
    if (!user) {
      return res.status(400).json({
        status: 400,
        error: 'Invalid email or password'
      });
    }
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        status: 400,
        error: 'Invalid email or password'
      });
    }

    const { id, email, isAdmin } = user;
    const token = await Jwt.generateToken({ id, email, isAdmin });
    return res.header('x-auth-token', token).status(200).json({
      status: 200,
      data: {
        token,
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  },

  getAllUsers: async (req, res) => {
    const response = res.status(200).json({
      status: 200,
      data: userStore
    });
    return response;
  }
};
