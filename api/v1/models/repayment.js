import moment from 'moment';

export default class Repayments {
  constructor({
    id, loanId, amount, monthlyInstallment, paidAmount, balance
  }) {
    this.id = id;
    this.loanId = loanId;
    this.createdOn = moment(new Date());
    this.amount = amount;
    this.monthlyInstallment = monthlyInstallment;
    this.balance = balance;
    this.paidAmount = paidAmount;
  }
}
