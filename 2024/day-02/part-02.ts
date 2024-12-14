import { readFileSync } from 'fs';

const INPUT_PATH = 'inputs/target';
const data = readFileSync(INPUT_PATH, 'utf8');
const reports = data.split('\n');

const getAttempts = (report: string) => {
  const levels = report.split(' ');
  const attempts = [];
  attempts.push([...levels]);

  for (let i = 0; i < levels.length; i++) {
    const newLevels = [...levels];
    newLevels.splice(i, 1);
    attempts.push(newLevels);
  }

  return attempts;
};

const isSafe = (levels: string[]): boolean => {
  if (levels.length <= 1) return true;

  const isAscending = +levels[0] < +levels[1];
  let level = levels[0];
  for (let i = 1; i < levels.length; i++) {
    // Check if the levels are either all increasing or all decreasing
    if (isAscending ? +level >= +levels[i] : +level <= +levels[i]) return false;

    // Check if any two adjacent levels differ by at least one and at most three
    const adjacency = Math.abs(+level - +levels[i]);
    if (adjacency < 1 || adjacency > 3) return false;

    level = levels[i];
  }

  return true;
};

let result = 0;
reports.forEach((report) => {
  // Get all the possible level combinations
  const attempts = getAttempts(report);

  // Increment the result count when there is at least one safe combination
  for (let i = 0; i < attempts.length; i++) {
    const attempt = attempts[i];
    if (isSafe(attempt)) {
      result++;
      break;
    }
  }
});

process.stdout.write('\x1b[32m');
console.log('\nResult:', result);
process.stdout.write('\x1b[0m');
