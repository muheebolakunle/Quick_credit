import pool from './index';

// eslint-disable-next-line no-console
console.log('Dropping tables...');

(async () => {
  try {
    await pool.query('DROP TABLE IF EXISTS users CASCADE');
    await pool.query('DROP TABLE IF EXISTS loans CASCADE');
    await pool.query('DROP TABLE IF EXISTS repayments CASCADE');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
})();
