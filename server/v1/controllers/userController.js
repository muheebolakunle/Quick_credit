import bcrypt from 'bcrypt';
import User from '../models/Users';
import Jwt from '../utils/jwt';

export default {
  registerUser: async (req, res) => {
    const user = new User(req.body);

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    const userExists = await User.getUserByEmail(user.email);
    if (userExists) {
      return res.status(409).json({
        status: 409,
        error: 'This email is already registered.',
      });
    }

    const newUser = await user.signUp();
    const { id, email, isAdmin } = newUser;
    const token = await Jwt.generateToken({ id, email, isAdmin });
    return res.header('x-auth-token', token).status(201).json({
      status: 201,
      message: 'You have signed up successfully',
      token,
      data: newUser
    });
  },

  loginUser: async (req, res) => {
    try {
      const user = await User.getUserByEmail(req.body.email);
      if (!user) {
        return res.status(404).json({
          status: 404,
          error: 'User not found'
        });
      }

      const validPassword = await bcrypt.compare(req.body.password, user.password);
      if (!validPassword) {
        return res.status(400).json({
          status: 400,
          error: 'Invalid email or password'
        });
      }

      const {
        id,
        firstname,
        lastname,
        email,
        isadmin,
        address,
        status
      } = user;
      const token = await Jwt.generateToken({ id, email, isadmin });
      return res.header('x-auth-token', token).status(200).json({
        status: 200,
        message: 'You are logged in successfully',
        token,
        data: {
          id,
          firstname,
          lastname,
          email,
          isadmin,
          address,
          status
        }
      });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  },

  getAllUsers: async (req, res) => {
    const result = await User.getAllUsers();
    return res.status(200).json({
      status: 200,
      message: 'Record of all users retrieved successfully! ',
      data: result
    });
  },

  getUser: async (req, res) => {
    const user = await User.getUserByEmail(req.params.email);
    if (!user) {
      return res.status(404).json({
        status: 404,
        error: 'User not found!.'
      });
    }
    const { id, isadmin } = req.user;
    if (id === user.id || isadmin) {
      return res.status(200).json({
        status: 200,
        message: 'User record retrieved successfully!',
        data: user
      });
    }
    return res.status(403).json({
      status: 403,
      error: 'Unauthorized..'
    });
  },

  verifyUser: async (req, res) => {
    const user = await User.updateUserStatus(req.params.email);
    if (!user) {
      return res.status(404).json({
        status: 404,
        error: 'User not found!.'
      });
    }

    res.status(200).json({
      status: 200,
      message: 'User verification successful!',
      data: user
    });
  }
};
