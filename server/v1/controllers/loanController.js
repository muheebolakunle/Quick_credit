import Loan from '../models/Loans';
import User from '../models/Users';
// import Repayments from '../models/repayment';

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
    // repaid = JSON.parse(repaid);

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

  // updateLoan: (req, res) => {
  //   const loan = loanStore.find(singleLoan => singleLoan.id === parseInt(req.params.id, 10));
  //   if (!loan) {
  //     return res.status(404).json({
  //       status: 404,
  //       error: 'Loan record not found'
  //     });
  //   }
  //   loan.status = req.body.status;
  //   return res.status(200).json({
  //     status: 200,
  //     message: 'Successfully updated loan status!',
  //     data: {
  //       loanid: loan.id,
  //       loanAmount: loan.amount,
  //       tenor: loan.tenor,
  //       status: loan.status,
  //       monthlyInstallment: loan.paymentInstallment,
  //       interest: loan.interest
  //     }
  //   });
  // },

  // createLoanRepayment: (req, res) => {
  //   const paidAmount = parseFloat(req.body.paidAmount);

  //   const loan = loanStore.find(singleLoan => singleLoan.id === parseInt(req.params.id, 10));
  //   if (!loan) {
  //     return res.status(404).json({
  //       status: 404,
  //       error: 'Loan record not found'
  //     });
  //   }

  //   if (paidAmount > loan.balance) {
  //     return res.status(400).json({
  //       status: 400,
  //       error: `your loan balance is ${loan.balance}!`,
  //     });
  //   }

  //   const balance = loan.balance - paidAmount;

  //   req.body.id = repaymentStore.length > 0 ? repaymentStore[repaymentStore.length - 1].id + 1 : 1;
  //   req.body.paidAmount = paidAmount;
  //   req.body.loanId = loan.id;
  //   req.body.amount = loan.amount;
  //   req.body.monthlyInstallment = loan.paymentInstallment;
  //   req.body.balance = balance;

  //   const repayment = new Repayments(req.body);

  //   loan.balance = balance; // update balance
  //   if (loan.balance === 0) {
  //     loan.repaid = true;
  //   }

  //   repaymentStore.push(repayment);
  //   return res.status(201).json({
  //     status: 201,
  //     message: 'Repayment record is successfully created!',
  //     data: repayment
  //   });
  // },

  // getLoanRepaymentHistory: (req, res) => {
  //   const loanId = req.params.id;

  //   const loanRecord = repaymentStore.filter(history => history.loanId === parseInt(loanId, 10));
  //   if (!loanRecord) {
  //     return res.status(404).json({
  //       status: 404,
  //       error: 'record not found',
  //     });
  //   }

  //   return res.status(200).json({
  //     status: 200,
  //     message: 'Successfully retrieved repayment history record!',
  //     data: loanRecord,
  //   });
  // }
};
