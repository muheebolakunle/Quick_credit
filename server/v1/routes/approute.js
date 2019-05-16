import express from 'express';
import appController from '../controllers/appcontroller';

const { home } = appController;

const router = express.Router();

router.get('/', home);

export default router;
