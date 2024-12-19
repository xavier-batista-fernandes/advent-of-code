import { readFileSync } from 'fs';

const VERBOSE = false;
const INPUT_PATH = 'inputs/target';

const data = readFileSync(INPUT_PATH, 'utf-8');
const rows = data.split('\n');
const matrix = rows.map((row) => row.split(''));

const numRows = matrix.length;
const numCols = matrix[0].length;

const logText = (text: string) => {
  if (!VERBOSE) return;
  console.log(text);
};

logText('Analyzing matrix...');
logText('Number of rows: ' + numRows);
logText('Number of columns: ' + numCols);

const getXmasCount = (row: number, col: number) => {
  let count = 0;

  if (col - 1 >= 0 && row - 1 >= 0 && col + 1 < numCols && row + 1 < numRows) {
    // M . S
    // . A .
    // M . S
    if (
      matrix[row - 1][col - 1] === 'M' &&
      matrix[row + 1][col - 1] === 'M' &&
      matrix[row - 1][col + 1] === 'S' &&
      matrix[row + 1][col + 1] === 'S'
    ) {
      count++;
      logText(`Found X-MAS 0 degrees starting at [${row}, ${col}]`);
    }

    // M . M
    // . A .
    // S . S
    if (
      matrix[row - 1][col - 1] === 'M' &&
      matrix[row + 1][col - 1] === 'S' &&
      matrix[row - 1][col + 1] === 'M' &&
      matrix[row + 1][col + 1] === 'S'
    ) {
      count++;
      logText(`Found X-MAS 90 degrees starting at [${row}, ${col}]`);
    }

    // S . M
    // . A .
    // S . M
    if (
      matrix[row - 1][col - 1] === 'S' &&
      matrix[row + 1][col - 1] === 'S' &&
      matrix[row - 1][col + 1] === 'M' &&
      matrix[row + 1][col + 1] === 'M'
    ) {
      count++;
      logText(`Found X-MAS 180 degrees starting at [${row}, ${col}]`);
    }

    // S . S
    // . A .
    // M . M
    if (
      matrix[row - 1][col - 1] === 'S' &&
      matrix[row + 1][col - 1] === 'M' &&
      matrix[row - 1][col + 1] === 'S' &&
      matrix[row + 1][col + 1] === 'M'
    ) {
      count++;
      logText(`Found X-MAS 270 degrees starting at [${row}, ${col}]`);
    }
  }

  return count;
};

let result = 0;
for (let i = 0; i < numRows; i++) {
  for (let j = 0; j < numCols; j++) {
    if (matrix[i][j] !== 'A') continue;
    result += getXmasCount(i, j);
  }
}

process.stdout.write('\x1b[32m');
console.log('\nResult:', result);
process.stdout.write('\x1b[0m');
