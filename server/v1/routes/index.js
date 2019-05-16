import { Router } from 'express';
import appRoute from './approute';
import authRoute from './authRoute';
import userRoute from './userRoute';
import loanRoute from './loanRoute';


const router = new Router();

router.use('/auth', authRoute);
router.use('/', appRoute);
router.use('/users', userRoute);
router.use('/loans', loanRoute);


export default router;
