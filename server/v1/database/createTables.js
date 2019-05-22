import pool from './index';
// eslint-disable-next-line no-console
console.log('Creating tables...');

(async () => {
  try {
    await pool.query(`CREATE TABLE IF NOT EXISTS users(
        id SERIAL UNIQUE PRIMARY KEY,
        firstName VARCHAR(50) NOT NULL,
        lastName VARCHAR(50) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(100) NOT NULL,
        isAdmin BOOLEAN DEFAULT FALSE,
        address VARCHAR(200) NOT NULL,
        status VARCHAR(20) DEFAULT 'unverified',
        registered TIMESTAMPTZ DEFAULT NOW())`);

    await pool.query(`CREATE TABLE IF NOT EXISTS loans(
      id SERIAL PRIMARY KEY,
      userEmail VARCHAR(50) NOT NULL REFERENCES users(email) ON DELETE CASCADE,
      createdOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      status VARCHAR(20) DEFAULT 'pending',
      repaid BOOLEAN DEFAULT FALSE,
      tenor INTEGER NOT NULL,
      amount FLOAT NOT NULL,
      paymentInstallment FLOAT NOT NULL,
      balance FLOAT NOT NULL,
      interest FLOAT NOT NULL)`);

    await pool.query(`CREATE TABLE IF NOT EXISTS repayments(
        id SERIAL UNIQUE PRIMARY KEY,
        loanId INT NOT NULL,
        amount FLOAT(4) NOT NULL,
        monthlyInstallment FLOAT(4) NOT NULL,
        paidAmount FLOAT(4) NOT NULL,
        balance FLOAT(4) NOT NULL,
        createdOn TIMESTAMPTZ DEFAULT NOW(),
        FOREIGN KEY (loanId) REFERENCES loans (id) ON DELETE CASCADE)`);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
})();
