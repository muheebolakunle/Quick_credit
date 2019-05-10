import { userStore, loanStore } from '../datastore';
import Loans from '../models/loan';

export default {
  createLoan: (req, res) => {
    const { email } = req.user;
    const user = userStore.find(signedUser => signedUser.email === email);
    if (user.status === 'unverified') {
      return res.status(400).json({
        status: 400,
        error: 'You are not yet a verified user.'
      });
    }

    const existingLoans = loanStore.filter(loan => loan.user === email);
    const outstandingLoan = existingLoans
      .filter(loan => loan.repaid === false && loan.status !== 'rejected');
    if (outstandingLoan.length > 0) {
      return res.status(402).json({
        status: 402,
        error: 'You have an outstanding loan'
      });
    }

    req.body.user = email;
    req.body.id = loanStore.length > 0 ? userStore[loanStore.length - 1].id + 1 : 1;
    const loan = new Loans(req.body);
    loanStore.push(loan);
    return res.status(201).json({
      status: 201,
      data: loan
    });
  },

  getAllLoans: (req, res) => {
    const response = res.status(200).json({
      status: 200,
      data: loanStore
    });
    return response;
  }
};
