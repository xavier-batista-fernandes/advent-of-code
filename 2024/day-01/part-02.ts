import * as fs from 'fs';

const INPUT_PATH = 'inputs/target';
const data = fs.readFileSync(INPUT_PATH, 'utf-8');
const rows = data.split('\n');

const list1 = [];
const list2 = [];

rows.forEach((row) => {
  const numbers = row.split('   ');
  list1.push(+numbers[0]);
  list2.push(+numbers[1]);
});

const histogram = new Map<number, number>();
list1.forEach((x) => histogram.set(x, (histogram.get(x) || 0) + 1));

let result = 0;
list2.forEach((number) => {
  const count = histogram.get(number) || 0;
  result += number * count;
});

process.stdout.write('\x1b[32m');
console.log('\nResult:', result);
process.stdout.write('\x1b[0m');
