export type Cell = {
  letter: string;
  orientation: "horizontal" | "vertical" | null;
};

type Position = {
  row: number;
  col: number;
  orientation: "horizontal" | "vertical";
};

export function generateGrid(
  words: string[],
  nLengthWords: { [key: number | string]: number }
) {
  words.sort((a, b) => b.length - a.length);

  const size = words.reduce((sum, word) => sum + word.length, 0);
  const grid: Cell[][] = Array(size)
    .fill(null)
    .map(() => Array(size).fill({ letter: " ", orientation: null }));

  const wordLengthCounts: { [key: number]: number } = {};

  const firstWord = words.length ? words.shift() : '';
  insertHorizontally(
    grid,
    firstWord!,
    Math.floor(size / 2),
    Math.floor((size - firstWord!.length) / 2)
  );
  wordLengthCounts[firstWord!.length] = 1;

  for (let word of words) {
    const wordLength = word.length;
    if (wordLengthCounts[wordLength] >= nLengthWords[wordLength]) {
      continue;
    }

    let bestPosition: Position | null = null;
    let bestOverlap = 0;
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        for (let orientation of ["horizontal", "vertical"] as (
          | "horizontal"
          | "vertical"
        )[]) {
          const overlap = countOverlaps(grid, word, row, col, orientation);
          if (
            overlap > bestOverlap &&
            ((orientation === "horizontal" &&
              canInsertHorizontally(grid, word, row, col)) ||
              (orientation === "vertical" &&
                canInsertVertically(grid, word, row, col)))
          ) {
            bestPosition = { row, col, orientation };
            bestOverlap = overlap;
          }
        }
      }
    }

    if (bestPosition) {
      if (bestPosition.orientation === "horizontal") {
        insertHorizontally(grid, word, bestPosition.row, bestPosition.col);
      } else {
        insertVertically(grid, word, bestPosition.row, bestPosition.col);
      }
      wordLengthCounts[wordLength] = (wordLengthCounts[wordLength] || 0) + 1;
    }
  }
  console.log(grid);

  for (let row of grid) {
    console.log(row.map((cell) => cell.letter).join(" "));
  }

  let stringGrid: string[][] = grid.map((row) =>
    row.map((cell) => cell.letter)
  );

  return stringGrid;
}

function insertHorizontally(
  grid: Cell[][],
  word: string,
  row: number,
  col: number
): void {
  for (let i = 0; i < word.length; i++) {
    grid[row][col + i] = { letter: word[i], orientation: "horizontal" };
  }
}

function insertVertically(
  grid: Cell[][],
  word: string,
  row: number,
  col: number
): void {
  for (let i = 0; i < word.length; i++) {
    grid[row + i][col] = { letter: word[i], orientation: "vertical" };
  }
}

function canInsertHorizontally(
  grid: Cell[][],
  word: string,
  row: number,
  col: number
): boolean {
  if (col < 0 || col + word.length > grid[row].length) return false;
  for (let i = 0; i < word.length; i++) {
    const cell = grid[row][col + i];
    if (
      cell.letter !== " " &&
      (cell.letter !== word[i] || cell.orientation !== "vertical")
    )
      return false;
  }
  return true;
}

function canInsertVertically(
  grid: Cell[][],
  word: string,
  row: number,
  col: number
): boolean {
  if (row < 0 || row + word.length > grid.length) return false;
  for (let i = 0; i < word.length; i++) {
    const cell = grid[row + i][col];
    if (
      cell.letter !== " " &&
      (cell.letter !== word[i] || cell.orientation !== "horizontal")
    )
      return false;
  }
  return true;
}

function countOverlaps(
  grid: Cell[][],
  word: string,
  row: number,
  col: number,
  orientation: "horizontal" | "vertical"
): number {
  if (
    (orientation === "horizontal" &&
      !canInsertHorizontally(grid, word, row, col)) ||
    (orientation === "vertical" && !canInsertVertically(grid, word, row, col))
  ) {
    return 0;
  }

  let overlap = 0;
  for (let i = 0; i < word.length; i++) {
    const cell =
      orientation === "horizontal" ? grid[row][col + i] : grid[row + i][col];
    if (cell.letter === word[i]) overlap++;
  }
  return overlap;
}
