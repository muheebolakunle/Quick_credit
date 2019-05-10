import express from 'express';
import loanController from '../controllers/loancontroller';
import LoanValidation from '../middleware/loanvalidation';
import { auth } from '../middleware/authentication';

const { validateLoan } = LoanValidation;
const { createLoan } = loanController;

const router = express.Router();

router.post('/', auth, validateLoan, createLoan);


export default router;
