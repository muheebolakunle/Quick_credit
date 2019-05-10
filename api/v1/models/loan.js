import moment from 'moment';

export default class Loans {
  constructor(loan) {
    this.id = loan.id;
    this.user = loan.user;
    this.createdOn = moment(new Date());
    this.status = 'pending';
    this.repaid = false;
    this.tenor = parseInt(loan.tenor, 10);
    this.amount = parseFloat(loan.amount);
    this.interest = 0.05 * this.amount;
    this.paymentInstallment = (this.amount + this.interest) / this.tenor;
    this.balance = this.amount;
  }
}
