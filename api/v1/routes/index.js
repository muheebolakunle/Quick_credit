import { Router } from 'express';
import appRoute from './approute';
import userRoute from './userRoute';

const router = new Router();

router.use('/auth', userRoute);
router.use('/', appRoute);


export default router;
