import pool from './index';


// console.log('seeding database');

// const seedTables = async () => {
//   try {
//     await pool.query(`INSERT INTO users (firstname, lastname, email, password, address, status, isadmin)
//     VALUES (
//     'Olaide',
//     'Muheeb',
//     'olaide@gmail.com',
//     '$2b$10$PjVGFLHaft8.FMHrjGxhqe.60WPaim3LOFxHjAwi6qaUY6XOGGeqK',
//     'festac town',
//     'unverified',
//     false),
//     (
//     'Olakunle',
//     'Muheeb',
//     'olakunle@gmail.com',
//     '$2b$10$M54YQLCOj7/OOi9TrdHxhO7rXk5zHTypjcn0X/sg8K1RANNi60LtW',
//     'festac town',
//     'verified',
//     true),
//     ('Olabisi',
//     'Muheeb',
//     'olabisi@gmail.com',
//     '$2b$10$KToRlR9TU/Ll44TuLqeRh.KfY5p82//YyG/v8kWwUmr.p8UfWK97G',
//     'ajibode opp ui gate',
//     'verified',
//     false) RETURNING *`);

//     await pool.query(`INSERT INTO loans (useremail, createdon, status, repaid, tenor, amount,  interest, paymentinstallment, balance)
//     VALUES ( 'olakunle@gmail.com',
//     '2019-05-10T03:47:34.105Z',
//     'approved',
//     false,
//     12,
//     500000,
//     25000,
//     43750,
//     525000),('olabisi@gmail.com',
//     '2019-05-10T03:57:18.763Z',
//     'approved',
//     true,
//     7,
//     5020000,
//     251000,
//     753000,
//     0) RETURNING *`);
//   } catch (error) {
//     return error;
//   }
// };

// seedTables();


// (async () => {
//   const params = [
//     'olakunle@gmail.com',
//     '2019-05-10T03:47:34.105Z',
//     'approved',
//     false,

//     12,
//     500000,
//     25000,
//     43750,
//     525000
//   ];
//   try {
//     await pool.query(`INSERT INTO loans (useremail, createdon, status, repaid, tenor, amount,  interest, paymentinstallment, balance)
//               VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`, params);
//     return;
//   } catch (error) {
//     return error;
//   }
// })();

// (async () => {
//   const params = [
//     'olabisi@gmail.com',
//     '2019-05-10T03:57:18.763Z',
//     'approved',
//     true,
//     7,
//     5020000,
//     251000,
//     753000,
//     0
//   ];
//   try {
//     await pool.query(`INSERT INTO loans (useremail, createdon, status, repaid, tenor, amount,  interest, paymentinstallment, balance)
//                 VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`, params);
//     return;
//   } catch (error) {
//     return error;
//   }
// })();
// (async () => {
//   let result;
//   const params = [
//     'Olakunle',
//     'Muheeb',
//     'olakunle@gmail.com',
//     '$2b$10$M54YQLCOj7/OOi9TrdHxhO7rXk5zHTypjcn0X/sg8K1RANNi60LtW',
//     'festac town',
//     'verified',
//     true
//   ];
//   try {
//     result = await pool.query(`INSERT INTO users (firstName, lastName, email, password, address, status, isAdmin)
//       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`, params);
//     return result;
//   } catch (error) {
//     return error;
//   }
// })();

// (async () => {
//   let result;
//   const params = [
//     'Olaide',
//     'Muheeb',
//     'olaide@gmail.com',
//     '$2b$10$PjVGFLHaft8.FMHrjGxhqe.60WPaim3LOFxHjAwi6qaUY6XOGGeqK',
//     'festac town',
//     'unverified',
//     false
//   ];
//   try {
//     result = await pool.query(`INSERT INTO users (firstname, lastname, email, password, address, status, isadmin)
//         VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`, params);
//     return result;
//   } catch (error) {
//     return error;
//   }
// })();

// (async () => {
//   let result;
//   const params = [
//     'Olabisi',
//     'Muheeb',
//     'olabisi@gmail.com',
//     '$2b$10$KToRlR9TU/Ll44TuLqeRh.KfY5p82//YyG/v8kWwUmr.p8UfWK97G',
//     'ajibode opp ui gate',
//     'verified',
//     false
//   ];
//   try {
//     result = await pool.query(`INSERT INTO users (firstname, lastname, email, password, address, status, isadmin)
//           VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`, params);
//     return result;
//   } catch (error) {
//     return error;
//   }
// })();
