import pool from './index';
import createTestDB from './initTable';

(async () => {
  try {
    await pool.query(createTestDB.createTestDB);
  } catch (error) {
    console.log(error);
  }
})();
