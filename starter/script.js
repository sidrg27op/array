'use strict';
// Number(prompt('enter yr age')) > 18
//   ? console.log('u can drive')
//   : console.log('noob2');

// const sum = 10;

// // for (let i = 1; i < sum; i++) {
// //   console.log(`4 x ${i} = ${4 * i}`);
// // }

// let i = 1;
// // while (i < sum) {
// //   console.log(`4 x ${i} = ${4 * i}`);
// //   i++;
// // }

// // do {
// //   console.log(`4 x ${i} = ${4 * i}`);
// //   i++;
// // } while (i <= sum);

// let marks = {
//   nuni: 12,
//   sid: 10,
//   ayu: 21,
//   rep: 211,
// };

// console.log(Object.keys(marks)[0]);

// // for (let i = 0; i < Object.keys(marks).length; i++) {
// //   console.log(
// //     `The marks of ${Object.keys(marks)[i]} is ${marks[Object.keys(marks)[i]]}`
// //   );
// // }

// // const op = ['fd', 'gfgf', 'dsds', 'hgh'];
// // console.log(op[2]);

// // console.log(['fd', 'gfgf', 'dsds', 'hgh'][0]);

// // for (let key in marks) {
// //   console.log(`marks of ${key} is ${marks[key]}`);
// // }

// // const n = 4;
// // let cn;
// // while (cn != n) {
// //   cn = prompt('enter a number');
// // }
// const op = 'dsdifd';
// console.log(op);

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

// ui

const updateUI = function (acc) {
  displayMovement(acc.movements);
  calcDisplayBlance(acc);
  calcin(acc);
};

/////
const displayMovement = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;
  movs.forEach((mov, i) => {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = ` <div class="movements">
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
      <div class="movements__value">${mov}</div>
    </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBlance = function (acc) {
  acc.Blanace = acc.movements.reduce((acc, mov) => acc + mov, 0);
  // console.log(Blanace);
  labelBalance.textContent = `${acc.Blanace} EUR`;
};

const calcin = function (acc) {
  const income = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${income}`;
  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}`;
  const intrest = acc.movements
    .filter(mov => mov > 0)
    .map(mov => (mov * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, mov) => acc + mov, 0);
  labelSumInterest.textContent = intrest;
};

const userName = function (accs) {
  accs.forEach(acc => {
    acc.userName = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};

userName(accounts);

// login
let currentacc;
btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  // console.log('login');
  currentacc = accounts.find(acc => acc.userName === inputLoginUsername.value);
  console.log(currentacc);
  if (currentacc?.pin === Number(inputLoginPin.value)) {
    labelWelcome.textContent = `welcomeback ${currentacc.owner.split(' ')[0]}`;
    containerApp.style.opacity = 100;
    updateUI(currentacc);
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();
  }
});

// transfer
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amoutn = Number(inputTransferAmount.value);
  const recieveacc = accounts.find(
    acc => acc.userName === inputTransferTo.value
  );
  inputTransferTo.value = inputTransferAmount.value = '';
  if (
    amoutn > 0 &&
    recieveacc &&
    currentacc.Blanace > amoutn &&
    recieveacc?.userName !== currentacc.userName
  ) {
    currentacc.movements.push(-amoutn);
    recieveacc.movements.push(amoutn);
    updateUI(currentacc);
  }
});
// loan
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  if (amount > 0 && currentacc.movements.some(mov => mov >= amount / 10)) {
    currentacc.movements.push(amount);
    updateUI(currentacc);
  }
});

// closed

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  if (
    inputCloseUsername.value === currentacc.userName &&
    Number(inputClosePin.value) === currentacc.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.userName === currentacc.userName
    );
    console.log(index);
    accounts.splice(index, 1);
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = '';
  labelWelcome.textContent = 'Log in to get started';
});
let ss = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovement(currentacc.movements, !ss);
  ss = !ss;
});
// console.log(accounts);
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// console.log(movements.entries);
/////////////////////////////////////////////////

const arr = ['a', 'b', 'c', 'd', 'e', 'f'];

// console.log(arr.slice(2, 4));
// console.log(arr.splice(2));
// console.log(arr.splice(2, 2));
// console.log(arr);

// movements.forEach((e, i, a) => {
//   e > 0 ? console.log(`${i} ${e} deposiTE`) : console.log(`${i} ${e} withdrew`);
//   // console.log(a);
// });

// const fr = 'siddharth';

// for (let i = 0; i < fr.length; i++) {
//   console.log(fr[i]);
// }

// const op = [1, 2, 3, 34, 45, 5];
// const nuni = [...op];

// console.log(nuni);

// console.log(op.splice(0, 1));
// console.log(op);
// console.log(op.splice(-2));
// console.log(op);

// const checkDogs = function (f, s) {
//   const fdog = f.slice();
//   fdog.splice(0, 1);
//   fdog.splice(-2);
//   const dogs = fdog.concat(s);
//   dogs.forEach(function (dg, i) {
//     dg >= 3
//       ? console.log(`Dog number${i + 1}is an adult,and is${dg}yeass old`)
//       : console.log(`Dog number${i + 1}is an puppy🐶,and is${dg}yeass old`);
//   });
// };

// checkDogs([1, 3, 5, , 67, 6], [32, 43, 5, , 1, 2, 25, 6]);

// const euToUsd = 1.1;

// const usd = movements.map(mov => mov * euToUsd);

// console.log(movements);
// console.log(usd);

// const newm = [];

// for (const mov of movements) newm.push(mov * euToUsd);
// console.log(newm);

// const movemende = movements.map(
//   (mov, i) =>
//     `Movement ${i + 1} you ${mov > 0 ? 'deposited' : 'withdraw'} ${mov}`
// );

// console.log(movemende);

// const names = 'Siddharth raghav';

// const op = names
//   .toLowerCase()
//   .split(' ')
//   .map(name => name[0])
//   .join('');
// console.log(op);

// const width = [];

// for (const mov of movements) {
//   if (mov < 0) width.push(mov);
// }

// console.log(width);

// const withdrawls = movements.filter(mov => mov < 0);
// console.log(withdrawls);

// const max = movements.reduce((acc, mov) => {
//   if (acc > mov) return acc;
//   else return mov;
// }, movements[0]);

// console.log(max);

// const money = 'please give us rupee 1000';

// const value = Number(money.slice(-4));

// console.log(typeof value);

// const calcHmanage = function (arr) {
//   const humanage = arr.map(arrs => (arrs <= 2 ? 2 * arrs : 16 + arrs * 4));
//   const adult = humanage.filter(arrs => arrs >= 18);
//   console.log(humanage);
//   console.log(adult);
//   // const average = adult.reduce((acc, a) => (acc + a, 0) / adult.length);
//   // const average = adult.reduce((acc, age, i, arr) => acc + age / arr.length, 0);
//   const average = adult.reduce((acc, age) => acc + age, 0) / adult.length;

//   console.log(average);
// };

// const val = calcHmanage([5, 2, 4, 1, 15, 8, 3]);

// const eutousd = 1.1;

// const totaleurodp = movements
//   .filter(mov => mov > 0)
//   .map(mov => mov * eutousd)
//   .reduce((acc, mov) => acc + mov, 0);

// console.log(totaleurodp);

// const arrp = [2, 3, 4, 5, 5, 6, 6];

// for (let i = 0; i < arrp.length; i++) {
//   console.log(arrp[i]);
// }
// const accoutn = accounts.find(mov => mov.owner === 'Jessica Davis');
// console.log(accoutn?.userName ? accoutn.userName : 'incorrect couutn');
//include
console.log(movements.includes(-130));
//somem
console.log(movements.some(acc => acc > 2000));
//every
console.log(account4.movements.every(acc => acc > 0));
//flat
const accmonents = accounts.map(acc => acc.movements);
const allmovents = accmonents.flat();
console.log(allmovents);
const overallb = allmovents.reduce((acc, mov) => acc + mov, 0);
console.log(overallb);
//flatmap
const overbal = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, mov) => acc + mov, 0);
console.log(overbal);
// sortindg ascending
// console.log(movements);
movements.sort((a, b) => a - b);
// movements.sort((a, b) => {
//   if (a > b) return 1;
//   if (a < b) return -1;
// });
console.log(movements);
movements.sort((a, b) => b - a);
// movements.sort((a, b) => {
//   if (a > b) return -1;
//   if (a < b) return 1;
// });

console.log(movements);
