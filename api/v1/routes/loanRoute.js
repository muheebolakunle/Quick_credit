import express from 'express';
import loanController from '../controllers/loancontroller';
import LoanValidation from '../middleware/loanvalidation';
import { auth, adminAuth } from '../middleware/authentication';

const {
  validateLoan, validateQuery, validateStatus, validateLoanRepayment,
  validateRepaymentId
} = LoanValidation;
const {
  createLoan, getAllLoans, getLoanById, updateLoan, createLoanRepayment,
  getLoanRepaymentHistory
} = loanController;

const router = express.Router();

router.post('/', auth, validateLoan, createLoan);
router.get('/', auth, adminAuth, validateQuery, getAllLoans);
router.get('/:id', auth, adminAuth, getLoanById);
router.patch('/:id', auth, adminAuth, validateStatus, updateLoan);
router.post('/:id/repayment', auth, adminAuth, validateLoanRepayment, createLoanRepayment);
router.get('/:id/repayment', auth, validateRepaymentId, getLoanRepaymentHistory);


export default router;
