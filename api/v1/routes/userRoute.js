import express from 'express';
import userController from '../controllers/usercontroller';
import UserValidation from '../middleware/validateuser';

const { registerUser, loginUser } = userController;
const { validateSignup, validateLogin } = UserValidation;

const router = express.Router();

router.post('/signup', validateSignup, registerUser);
router.post('/signin', validateLogin, loginUser);


export default router;
