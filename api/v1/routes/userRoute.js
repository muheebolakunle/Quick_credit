import express from 'express';
import userController from '../controllers/usercontroller';
import { auth, adminAuth } from '../middleware/authentication';

const { getAllUsers, getUser, verifyUser } = userController;

const router = express.Router();

router.get('/', auth, adminAuth, getAllUsers);
router.get('/:email', auth, adminAuth, getUser);
router.patch('/:email/verify', auth, adminAuth, verifyUser);


export default router;
