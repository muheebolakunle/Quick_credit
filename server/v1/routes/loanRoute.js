import express from 'express';
import loanController from '../controllers/loanController';
import LoanValidation from '../middleware/loanvalidation';
import { auth, adminAuth } from '../middleware/authentication';

const {
  validateLoan, validateQuery, validateStatus, validateLoanRepayment,
  validateLoanId
} = LoanValidation;
const {
  createLoan, getAllLoans, getLoanById, updateLoan, createLoanRepayment,
  getLoanRepaymentHistory
} = loanController;

const router = express.Router();

router.post('/', auth, validateLoan, createLoan);
router.get('/', auth, adminAuth, validateQuery, getAllLoans);
router.get('/:id', auth, adminAuth, validateLoanId, getLoanById);
// router.patch('/:id', auth, adminAuth, validateLoanId, validateStatus, updateLoan);
// router.post('/:id/repayment', auth, adminAuth, validateLoanId, validateLoanRepayment, createLoanRepayment);
// router.get('/:id/repayments', auth, validateLoanId, getLoanRepaymentHistory);


export default router;
