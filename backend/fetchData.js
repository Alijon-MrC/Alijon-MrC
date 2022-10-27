const str = 'TAR__082021';

const regex = new RegExp('2022');
const globalRegex = new RegExp('2021*', 'g');

console.log(regex.test(str));
// expected output: true

// console.log(globalRegex.lastIndex);
// // expected output: 0

// console.log(globalRegex.test(str));
// // expected output: true

console.log(globalRegex.lastIndex);
// expected output: 9

console.log(globalRegex.test(str));
// expected output: false
