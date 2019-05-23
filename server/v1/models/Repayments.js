import moment from 'moment';
import pool from '../database/index';


export default class Repayment {
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

  async createRepayments() {
    const queryString = `INSERT INTO repayments (loanid, amount ,monthlyinstallment, balance, paidamount)
      VALUES ($1, $2, $3, $4, $5) RETURNING *`;
    const values = [
      this.loanId,
      this.amount,
      this.monthlyInstallment,
      this.balance,
      this.paidAmount
    ];
    const { rows } = await pool.query(queryString, values);
    return rows[0];
  }
}
