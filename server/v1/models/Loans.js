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
      balance, createdon, status`;
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

  static async getAllLoans() {
    const queryString = 'SELECT * FROM loans ORDER BY id';
    const { rows } = await pool.query(queryString);
    return rows;
  }

  static async queryLoans(status, repaid) {
    const queryString = 'SELECT * FROM loans WHERE status = $1 and repaid = $2 ORDER BY id';
    const values = [status, repaid];
    const { rows } = await pool.query(queryString, values);
    return rows;
  }

  static async getLoanById(id) {
    const queryString = 'SELECT * FROM loans WHERE id = $1';
    const values = [id];
    const { rows } = await pool.query(queryString, values);
    return rows[0];
  }

  static async updateLoanStatus(status, id) {
    const queryString = `UPDATE loans
    SET status = $1
    WHERE id = $2 returning *`;
    const values = [status, id];
    const { rows } = await pool.query(queryString, values);
    return rows[0];
  }
}
