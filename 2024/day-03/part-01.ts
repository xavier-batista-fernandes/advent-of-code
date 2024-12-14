import { readFileSync } from 'fs';

const INPUT_PATH = 'inputs/target';
const data = readFileSync(INPUT_PATH, 'utf8');

const multiplicationRegex = /mul\(\d+,\d+\)/g;
const multiplications = data.match(multiplicationRegex);

const numberRegex = /\d+/g;
let result = 0;
multiplications.forEach((item) => {
  const numbers = item.match(numberRegex);
  result += +numbers[0] * +numbers[1];
});

process.stdout.write('\x1b[32m');
console.log('\nResult:', result);
process.stdout.write('\x1b[0m');
