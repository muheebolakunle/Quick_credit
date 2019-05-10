import express from 'express';
import loanController from '../controllers/loancontroller';
import LoanValidation from '../middleware/loanvalidation';
import { auth, adminAuth } from '../middleware/authentication';

const { validateLoan, validateQuery } = LoanValidation;
const { createLoan, getAllLoans } = loanController;

const router = express.Router();

router.post('/', auth, validateLoan, createLoan);
router.get('/', auth, adminAuth, validateQuery, getAllLoans);


export default router;
