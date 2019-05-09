import express from 'express';
import userController from '../controllers/usercontroller';
import { auth, adminAuth } from '../middleware/authentication';

const { getAllUsers, getUser } = userController;

const router = express.Router();

router.get('/', auth, adminAuth, getAllUsers);
router.get('/:email', auth, adminAuth, getUser);


export default router;
