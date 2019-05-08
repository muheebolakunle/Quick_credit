const invalidEmail = {
  email: 'olakunle',
  firstName: 'djjsjssj',
  lastName: 'muheeb',
  password: 'hhdjjsjsj',
  address: 'jshshhshs shshshshsn sssjsjjs',
};

const invalidfirstName = {
  email: 'olakunle@yahoo.com',
  firstName: 2334,
  lastName: 'muheeb',
  password: 'hhdjjsjsj',
  address: 'jshshhshs shshshshsn sssjsjjs',
};

const invalidlastName = {
  email: 'olakunle@gmail.com',
  firstName: 'djjsjssj',
  lastName: '234',
  password: 'hhdjjsjsj',
  address: 'jshshhshs shshshshsn sssjsjjs',
};

const invalidAddress = {
  email: 'olakunlejj@gmail.com',
  firstName: 'djjsjssj',
  lastName: 'muheeb',
  password: 'hhdjjsjsj',
  address: 'js',
};

const invalidPassword = {
  email: 'olakunle@yahoo,com',
  firstName: 'djjsjssj',
  lastName: 'muheeb',
  password: 'h',
  address: 'jshshhshs shshshshsn sssjsjjs',
};

const validinput = {
  email: 'olakunle@yahoo.com',
  firstName: 'djjsjssj',
  lastName: 'muheeb',
  password: 'hhdjjdjdjdj',
  address: 'jshshhshs shshshshsn sssjsjjs',
};

const registeredInput = {
  email: 'olakunle@gmail.com',
  firstName: 'djjsjssj',
  lastName: 'muheeb',
  password: 'hhdjjdjdjdj',
  address: 'jshshhshs shshshshsn sssjsjjs',
};

const emptyLogin = {
  email: '',
  password: '',
};

const missingLogin = {
  password: 'password',
};

const notExistLogin = {
  email: 'olayinka@email.com',
  password: 'myers13',
};

const correctLogin = {
  email: 'olakunle@gmail.com',
  password: 'bella',
};

const nonMatchingLogin = {
  email: 'olabisi@gmail.com',
  password: 'myers15',
};

const userLogin = {
  email: 'olaide@gmail.com',
  password: 'bella',
};

export {
  invalidEmail, invalidfirstName, invalidlastName,
  invalidPassword, invalidAddress, validinput,
  emptyLogin, missingLogin, correctLogin,
  notExistLogin, nonMatchingLogin, registeredInput,
  userLogin
};
