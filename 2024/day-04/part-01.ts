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

  // right
  if (col + 3 < numCols)
    if (
      matrix[row][col + 1] === 'M' &&
      matrix[row][col + 2] === 'A' &&
      matrix[row][col + 3] === 'S'
    ) {
      count++;
      logText(`Found XMAS Right starting at [${row}, ${col}]`);
    }

  // left
  if (col - 3 >= 0) {
    if (
      matrix[row][col - 1] === 'M' &&
      matrix[row][col - 2] === 'A' &&
      matrix[row][col - 3] === 'S'
    ) {
      count++;
      logText(`Found XMAS Left starting at [${row}, ${col}]`);
    }
  }

  // down
  if (row + 3 < numRows)
    if (
      matrix[row + 1][col] === 'M' &&
      matrix[row + 2][col] === 'A' &&
      matrix[row + 3][col] === 'S'
    ) {
      count++;
      logText(`Found XMAS Down starting at [${row}, ${col}]`);
    }

  // up
  if (row - 3 >= 0)
    if (
      matrix[row - 1][col] === 'M' &&
      matrix[row - 2][col] === 'A' &&
      matrix[row - 3][col] === 'S'
    ) {
      count++;
      logText(`Found XMAS Up starting at [${row}, ${col}]`);
    }

  // up right
  if (row - 3 >= 0 && col + 3 < numCols)
    if (
      matrix[row - 1][col + 1] === 'M' &&
      matrix[row - 2][col + 2] === 'A' &&
      matrix[row - 3][col + 3] === 'S'
    ) {
      count++;
      logText(`Found XMAS Up-Right starting at [${row}, ${col}]`);
    }

  // up left
  if (row - 3 >= 0 && col - 3 >= 0) {
    if (
      matrix[row - 1][col - 1] === 'M' &&
      matrix[row - 2][col - 2] === 'A' &&
      matrix[row - 3][col - 3] === 'S'
    ) {
      count++;
      logText(`Found XMAS Up-Left starting at [${row}, ${col}]`);
    }
  }

  // down right
  if (row + 3 < numRows && col + 3 < numCols)
    if (
      matrix[row + 1][col + 1] === 'M' &&
      matrix[row + 2][col + 2] === 'A' &&
      matrix[row + 3][col + 3] === 'S'
    ) {
      count++;
      logText(`Found XMAS Down-Right starting at [${row}, ${col}]`);
    }

  // down left
  if (row + 3 < numRows && col - 3 >= 0)
    if (
      matrix[row + 1][col - 1] === 'M' &&
      matrix[row + 2][col - 2] === 'A' &&
      matrix[row + 3][col - 3] === 'S'
    ) {
      count++;
      logText(`Found XMAS Down-Left starting at [${row}, ${col}]`);
    }

  return count;
};

let result = 0;
for (let i = 0; i < numRows; i++) {
  for (let j = 0; j < numCols; j++) {
    if (matrix[i][j] !== 'X') continue;
    result += getXmasCount(i, j);
  }
}

process.stdout.write('\x1b[32m');
console.log('\nResult:', result);
process.stdout.write('\x1b[0m');
