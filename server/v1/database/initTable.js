import pool from './index';

const createTestDB = `DROP TABLE IF EXISTS repayments;
    DROP TABLE IF EXISTS loans;
    DROP TABLE IF EXISTS users;
    CREATE TABLE IF NOT EXISTS users(
        id SERIAL UNIQUE PRIMARY KEY,
        firstName VARCHAR(50) NOT NULL,
        lastName VARCHAR(50) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(100) NOT NULL,
        isAdmin BOOLEAN DEFAULT FALSE,
        address VARCHAR(200) NOT NULL,
        status VARCHAR(20) DEFAULT 'unverified',
        registered TIMESTAMPTZ DEFAULT NOW()
    );
    CREATE TABLE IF NOT EXISTS loans(
        id SERIAL PRIMARY KEY,
        userEmail VARCHAR(50) NOT NULL REFERENCES users(email) ON DELETE CASCADE,
        createdOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        status VARCHAR(20) DEFAULT 'pending',
        repaid BOOLEAN DEFAULT FALSE,
        tenor INTEGER NOT NULL,
        amount FLOAT NOT NULL,
        paymentInstallment FLOAT NOT NULL,
        balance FLOAT NOT NULL,
        interest FLOAT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS repayments(
        id SERIAL UNIQUE PRIMARY KEY,
        loanId INT NOT NULL,
        amount FLOAT(4) NOT NULL,
        monthlyInstallment FLOAT(4) NOT NULL,
        paidAmount FLOAT(4) NOT NULL,
        balance FLOAT(4) NOT NULL,
        createdOn TIMESTAMPTZ DEFAULT NOW(),
        FOREIGN KEY (loanId) REFERENCES loans (id) ON DELETE CASCADE
    );
    INSERT INTO users (firstname, lastname, email, password, address, status, isadmin)
        VALUES (
        'Olaide',
        'Muheeb',
        'olaide@gmail.com',
        '$2b$10$PjVGFLHaft8.FMHrjGxhqe.60WPaim3LOFxHjAwi6qaUY6XOGGeqK',
        'festac town',
        'unverified',
        false),
        (
        'Olakunle',
        'Muheeb',
        'olakunle@gmail.com',
        '$2b$10$M54YQLCOj7/OOi9TrdHxhO7rXk5zHTypjcn0X/sg8K1RANNi60LtW',
        'festac town',
        'verified',
        true),
        ('Olabisi',
        'Muheeb',
        'olabisi@gmail.com',
        '$2b$10$KToRlR9TU/Ll44TuLqeRh.KfY5p82//YyG/v8kWwUmr.p8UfWK97G',
        'ajibode opp ui gate',
        'verified',
        false
    ),
    ('Oluwatoyin',
        'Muheeb',
        'oluwatoyin@gmail.com',
        '$2b$10$zJquDFIzYAWjVVbCiaO1HOyqLynxK1qKmPAfL2dbAzWsaIioNwTeW',
        'warri',
        'unverified',
        false
    );
    INSERT INTO loans (useremail, createdon, status, repaid, tenor, amount,  interest, paymentinstallment, balance)
        VALUES ('olakunle@gmail.com',
        '2019-05-10T03:47:34.105Z',
        'approved',
        false,
        12,
        500000,
        25000,
        43750,
        525000),
        (
        'olabisi@gmail.com',
        '2019-05-10T03:57:18.763Z',
        'approved',
        true,
        7,
        5020000,
        251000,
        753000,
        0
    ); `;


export default { createTestDB };
