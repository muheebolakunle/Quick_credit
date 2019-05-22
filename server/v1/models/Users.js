import pool from '../database/index';

export default class User {
  constructor(user) {
    this.id = user.id;
    this.email = user.email;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.password = user.password;
    this.address = user.address;
    this.status = 'unverified';
    this.isAdmin = false;
  }

  async signUp() {
    const queryString = `INSERT INTO users (email, firstname, lastname,
      address, password)
      VALUES ($1, $2, $3, $4, $5) RETURNING email, firstname, lastname,
      address, status, isadmin, id, registered`;
    const values = [this.email, this.firstName, this.lastName, this.address,
      this.password];
    const { rows } = await pool.query(queryString, values);
    return rows[0];
  }

  static async getUserByEmail(email) {
    const queryString = 'SELECT * FROM users WHERE email = $1';
    const values = [email];
    const { rows } = await pool.query(queryString, values);
    return rows[0];
  }

  static async logIn(email) {
    const queryString = 'SELECT id, password, username, isadmin FROM users WHERE email = $1';
    const values = [email];
    const { rows } = await pool.query(queryString, values);
    return rows[0];
  }
}
