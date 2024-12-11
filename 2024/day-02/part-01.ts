import {readFileSync} from "fs";

const INPUT_PATH = 'inputs/target'
const data = readFileSync(INPUT_PATH, "utf8");
const reports = data.split('\n');

const areLevelsSorted = (levels: string[], isAscending: boolean): boolean  => {
    let level = levels[0];
    for (let i = 1; i < levels.length; i++) {
        if (isAscending ? +level >= +levels[i] : +level <= +levels[i])
            return false;
        level = levels[i];
    }
    return true;
}

const areLevelsAdjacent = (levels: string[]): boolean => {
    let level = levels[0];
    for (let i = 1; i < levels.length; i++) {
        const adjacency = Math.abs(+level - +levels[i]);
        if (adjacency < 1 || adjacency > 3)
            return false;
        level = levels[i];
    }
    return true;
}

let result = 0;
reports.forEach(report => {
    const levels = report.split(' ');

    if (!areLevelsSorted(levels, true) && !areLevelsSorted(levels, false))
        return;

    if (!areLevelsAdjacent(levels))
        return;

    result++;
})
console.log(result);


