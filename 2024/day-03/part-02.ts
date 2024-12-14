import { readFileSync } from 'fs';

const VERBOSE = true;
const INPUT_PATH = 'inputs/target';

type Pattern = { reg: RegExp; op: 'mul' | 'do' | 'dont' };

const patterns: Pattern[] = [
  { reg: /mul\((\d+),(\d+)\)/, op: 'mul' },
  { reg: /do\(\)/, op: 'do' },
  { reg: /don't\(\)/, op: 'dont' },
];

const logText = (text: string) => {
  if (!VERBOSE) return;
  console.log(text);
};

const data = readFileSync(INPUT_PATH, 'utf-8');

let index = 0;
let result = 0;
let areOpsEnabled = true;
const count = [0, 0, 0];

logText('Reading report...');
while (index <= data.length) {
  const string = data.substring(index);

  // Grab next occurrences of each pattern
  const occurrences = patterns.map((pattern) => {
    return { ...string.match(pattern.reg), op: pattern.op };
  });

  // Select the one that is closest
  occurrences.sort((match1, match2) => {
    if (match1.index === undefined) return 1;
    if (match2.index === undefined) return -1;
    return match1.index - match2.index;
  });
  const nextOp = occurrences[0];
  if (nextOp.index !== undefined) {
    logText('\nFound new operation: ' + '\x1b[36m' + nextOp[0] + '\x1b[0m');
  } else {
    logText('\nNo more operations were found.');
    logText('Performing final calculations...');
    break;
  }

  // Process the current pattern
  switch (nextOp.op) {
    case 'do':
      count[0]++;
      logText('Enabling operations...');
      areOpsEnabled = true;
      break;

    case 'dont':
      count[1]++;
      logText('Disabling operations...');
      areOpsEnabled = false;
      break;

    case 'mul':
      count[2]++;
      logText('Multiplying numbers... ');
      result += areOpsEnabled ? +nextOp[1] * +nextOp[2] : 0;
      logText('New result: ' + '\x1b[34m' + result + '\x1b[0m');
  }

  // Update the index to find next pattern
  index += nextOp.index + 1;
}

process.stdout.write('\x1b[32m');
console.log('\nResult:', result);
process.stdout.write('\x1b[0m');
