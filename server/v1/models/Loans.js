import moment from 'moment';
import pool from '../database/index';


export default class Loan {
  constructor(loan) {
    this.id = loan.id;
    this.userEmail = loan.userEmail;
    this.createdOn = moment(new Date());
    this.status = 'pending';
    this.repaid = false;
    this.tenor = parseInt(loan.tenor, 10);
    this.amount = parseFloat(loan.amount);
    this.interest = 0.05 * this.amount;
    this.paymentInstallment = (this.amount + this.interest) / this.tenor;
    this.balance = this.amount + this.interest;
  }

  async createLoan() {
    const queryString = `INSERT INTO loans (useremail, amount , tenor, interest, paymentinstallment, balance)
      VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, useremail, amount, tenor, interest, paymentInstallment, 
      balance, createdon`;
    const values = [this.userEmail, this.amount, this.tenor, this.interest, this.paymentInstallment,
      this.balance
    ];
    const { rows } = await pool.query(queryString, values);
    return rows[0];
  }

  static async findOutstandingLoan(email) {
    const queryString = 'SELECT * FROM loans WHERE useremail = $1 and repaid= $2 and status!= $3';
    const values = [email, false, 'rejected'];
    const { rows } = await pool.query(queryString, values);
    return rows[0];
  }
}
