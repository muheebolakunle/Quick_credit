export const userStore = [
  {
    id: 1,
    email: 'olakunle@gmail.com',
    firstName: 'olakunle',
    lastName: 'muheeb',
    password: '$2b$10$M54YQLCOj7/OOi9TrdHxhO7rXk5zHTypjcn0X/sg8K1RANNi60LtW',
    address: 'festac town',
    status: 'verified',
    isAdmin: true
  }, {
    id: 2,
    email: 'olaide@gmail.com',
    firstName: 'olaide',
    lastName: 'muheeb',
    password: '$2b$10$PjVGFLHaft8.FMHrjGxhqe.60WPaim3LOFxHjAwi6qaUY6XOGGeqK',
    address: 'festac town',
    status: 'unverified',
    isAdmin: false
  }, {
    id: 3,
    email: 'olabisi@gmail.com',
    firstName: 'olabisi',
    lastName: 'muheeb',
    password: '$2b$10$KToRlR9TU/Ll44TuLqeRh.KfY5p82//YyG/v8kWwUmr.p8UfWK97G',
    address: 'ajibode opp ui gate',
    status: 'verified',
    isAdmin: false
  }
];
export const loanStore = [
  {
    id: 1,
    user: 'olakunle@gmail.com',
    createdOn: '2019-05-10T03:47:34.105Z',
    status: 'approved',
    repaid: false,
    tenor: '12',
    amount: 500000,
    interest: 25000,
    paymentInstallment: 43750,
    balance: 500000
  },
  {
    id: 2,
    user: 'olabisi@gmail.com',
    createdOn: '2019-05-10T03:57:18.763Z',
    status: 'approved',
    repaid: true,
    tenor: '7',
    amount: 5020000,
    interest: 251000,
    paymentInstallment: 753000,
    balance: 0.00
  },
  {
    id: 3,
    user: 'olabisi@gmail.com',
    createdOn: '2019-05-10T04:01:52.648Z',
    status: 'approved',
    repaid: true,
    tenor: '9',
    amount: 645300,
    interest: 32265,
    paymentInstallment: 75285,
    balance: 0.00
  }

];
export const repaymentStore = [];
