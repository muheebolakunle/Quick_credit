import express from 'express';

import userController from '../controllers/usercontroller';
import validateUser from '../middleware/validateuser';

const { registerUser } = userController;

const router = express.Router();

router.post('/signup', validateUser, registerUser);

export default router;
