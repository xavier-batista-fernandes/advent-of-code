import * as fs from 'fs';

const INPUT_PATH = 'inputs/target'
const data = fs.readFileSync(INPUT_PATH, 'utf-8');
const rows = data.split('\n');
const numbers = rows.map(row => row.split('   ')).flat();

const list1 = numbers.filter((_, index) => index % 2 === 0);
const list2 = numbers.filter((_, index) => index % 2 === 1);

list1.sort();
list2.sort();

let total = 0;
for (let i = 0; i < list1.length; i++) {
    total += Math.abs(+list1[i] - +list2[i])
}

console.log(total);
