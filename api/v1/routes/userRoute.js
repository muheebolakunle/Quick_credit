import express from 'express';
import userController from '../controllers/usercontroller';
import { auth, adminAuth } from '../middleware/authentication';

const { getAllUsers } = userController;

const router = express.Router();

router.get('/', auth, adminAuth, getAllUsers);

export default router;
