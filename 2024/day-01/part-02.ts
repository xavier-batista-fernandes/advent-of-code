import * as fs from 'fs';

const data = fs.readFileSync('input', 'utf-8');
const rows = data.split('\n');

const list1 = [];
const list2 = [];

rows.forEach(row => {
    const numbers = row.split('   ');
    list1.push(+numbers[0]);
    list2.push(+numbers[1]);
})

const histogram = new Map<number, number>();
list1.forEach(x => histogram.set(x, (histogram.get(x) || 0) + 1));

let total = 0;
list2.forEach(number => {
    const count = histogram.get(number) || 0;
    total += number * count;
});

console.log(total);
