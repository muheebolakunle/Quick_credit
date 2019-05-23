import Loan from '../models/Loans';
import User from '../models/Users';
import Repayment from '../models/Repayments';

export default {
  createLoan: async (req, res) => {
    const { email } = req.user;
    const user = await User.getUserByEmail(email);

    if (user.status === 'unverified') {
      return res.status(401).json({
        status: 401,
        error: 'You are not yet a verified user.'
      });
    }

    const outstandingLoan = await Loan.findOutstandingLoan(email);
    if (outstandingLoan) {
      return res.status(402).json({
        status: 402,
        error: 'You have an outstanding loan'
      });
    }

    req.body.userEmail = email;
    const loan = new Loan(req.body);
    const newLoan = await loan.createLoan();
    return res.status(201).json({
      status: 201,
      message: 'Loan application record created successfully!',
      data: newLoan
    });
  },

  getAllLoans: async (req, res) => {
    const { repaid } = req.query;
    const { status } = req.query;

    if (status && repaid) {
      const queryResponse = await Loan.queryLoans(status, repaid);
      return res.status(200).json({
        status: 200,
        message: 'Successfully retrieved data!',
        data: queryResponse
      });
    }

    const allLoans = await Loan.getAllLoans();
    return res.status(200).json({
      status: 200,
      message: 'Successfully retrieved all loan records',
      data: allLoans
    });
  },

  getLoanById: async (req, res) => {
    const loan = await Loan.getLoanById(req.params.id);
    if (!loan) {
      return res.status(404).json({
        status: 404,
        error: 'Loan record not found'
      });
    }

    return res.status(200).json({
      status: 200,
      message: 'Successfully retrieved loan record!',
      data: loan
    });
  },

  updateLoan: async (req, res) => {
    const { status } = req.body;
    const { id } = req.params;
    const loan = await Loan.updateLoanStatus(status, id);

    if (!loan) {
      return res.status(404).json({
        status: 404,
        error: 'Loan record not found'
      });
    }

    return res.status(200).json({
      status: 200,
      message: 'Successfully updated loan status!',
      data: loan
    });
  },

  createLoanRepayment: async (req, res) => {
    try {
      const { paidAmount } = req.body;

      const loan = await Loan.getLoanById(req.params.id);
      if (!loan) {
        return res.status(404).json({
          status: 404,
          error: 'Loan record not found'
        });
      }
      if (loan.balance < paidAmount) {
        return res.status(400).json({
          status: 400,
          error: `your loan balance is ${loan.balance}!`,
        });
      }

      const balance = loan.balance - paidAmount;
      loan.balance = balance; // update balance
      if (loan.balance === 0) {
        loan.repaid = true;
      }
      await Loan.updateLoan(loan.repaid, loan.balance, loan.id);

      req.body.paidAmount = paidAmount;
      req.body.loanId = loan.id;
      req.body.amount = loan.amount;
      req.body.monthlyInstallment = loan.paymentinstallment;
      req.body.balance = balance;

      const repayment = new Repayment(req.body);
      const newRepayment = await repayment.createRepayments();
      return res.status(201).json({
        status: 201,
        message: 'Repayment record is successfully created!',
        data: newRepayment
      });
    } catch (error) {
      console.log(error);
    }
  },

  getLoanRepaymentHistory: async (req, res) => {
    const loanId = req.params.id;

    const loan = await Loan.getLoanById(loanId);
    if (!loan) {
      return res.status(404).json({
        status: 404,
        error: 'record not found'
      });
    }

    const repayments = await Repayment.getRepayments(loan.id);
    return res.status(200).json({
      status: 200,
      message: 'Successfully retrieved repayment history record!',
      data: repayments,
    });
  }
};
