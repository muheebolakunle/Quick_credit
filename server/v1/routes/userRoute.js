import express from 'express';
import userController from '../controllers/userController';
import { auth, adminAuth } from '../middleware/authentication';
import UserValidation from '../middleware/validateuser';

const { getAllUsers, getUser, verifyUser } = userController;
const { validateEmailParam } = UserValidation;

const router = express.Router();

router.get('/', auth, adminAuth, getAllUsers);
router.get('/:email', auth, validateEmailParam, getUser);
router.patch('/:email/verify', auth, adminAuth, validateEmailParam, verifyUser);


export default router;
