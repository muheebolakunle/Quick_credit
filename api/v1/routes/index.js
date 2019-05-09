import { Router } from 'express';
import appRoute from './approute';
import authRoute from './authRoute';
import userRoute from './userRoute';

const router = new Router();

router.use('/auth', authRoute);
router.use('/', appRoute);
router.use('/users', userRoute);


export default router;
