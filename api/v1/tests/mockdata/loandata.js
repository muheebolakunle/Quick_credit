const emptyloan = {
  amount: '',
  tenor: '',
};

const missingAmount = {
  tenor: '7',
};

const missingTenor = {
  amount: '7000',
};

const invalidAmount = {
  amount: '500',
  tenor: '6',
};

const invalidTenor = {
  amount: '5000',
  tenor: 'hsjjj',
};

const correctloan = {
  amount: '5000',
  tenor: '6',
};


export {
  emptyloan, missingAmount, missingTenor,
  invalidAmount, invalidTenor, correctloan
};
