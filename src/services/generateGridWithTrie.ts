import words from './wordList.json';

type Array2D = string[][];


class TrieNode {
    children: Map<string, TrieNode> = new Map();
    endOfWord = false;
  }
  
  class Trie {
    root: TrieNode;
  
    constructor() {
      this.root = new TrieNode();
    }
  
    insert(word: string) {
      let currentNode = this.root;
      for (let char of word) {
        if (!currentNode.children.has(char)) {
          currentNode.children.set(char, new TrieNode());
        }
        currentNode = currentNode.children.get(char)!;
      }
      currentNode.endOfWord = true;
    }
  
    searchPrefix(prefix: string) {
      let currentNode = this.root;
      for (let char of prefix) {
        if (currentNode.children.has(char)) {
          currentNode = currentNode.children.get(char)!;
        } else {
          return false;
        }
      }
      return true;
    }
  }
  
  interface Cell {
    letter: string;
    orientation: "horizontal" | "vertical" | null;
  }
  
  interface Position {
    row: number;
    col: number;
    orientation: "horizontal" | "vertical";
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
  
function trimSparseArray(arr: Array2D): Array2D {
    let top = arr.length, bottom = 0, left = arr[0].length, right = 0;

    for(let i = 0; i < arr.length; i++) {
        for(let j = 0; j < arr[i].length; j++) {
            if(arr[i][j] !== " ") {
                top = Math.min(top, i);
                bottom = Math.max(bottom, i);
                left = Math.min(left, j);
                right = Math.max(right, j);
            }
        }
    }

    let trimmed: Array2D = [];

    for(let i = top; i <= bottom; i++) {
        trimmed.push(arr[i].slice(left, right + 1));
    }

    return trimmed;
}

  
  export function generateGridWithTrie(words: string[]) {
    words.sort((a, b) => b.length - a.length);
  
    const size = words.reduce((sum, word) => sum + word.length, 0);
    const grid: Cell[][] = Array(size)
      .fill(null)
      .map(() => Array(size).fill({ letter: " ", orientation: null }));
  
    const trie = new Trie();
    for (let word of words) {
      trie.insert(word);
    }
  
    const firstWord = words.length ? words.shift() : "";
    insertHorizontally(
      grid,
      firstWord!,
      Math.floor(size / 2),
      Math.floor((size - firstWord!.length) / 2)
    );
  
    for (let word of words) {
      let inserted = false;
      for (let row = 0; row < size; row++) {
        for (let col = 0; col < size; col++) {
          if (grid[row][col].letter !== " " && trie.searchPrefix(grid[row][col].letter)) {
            if (canInsertHorizontally(grid, word, row, col)) {
              insertHorizontally(grid, word, row, col);
              inserted = true;
              break;
            } else if (canInsertVertically(grid, word, row, col)) {
              insertVertically(grid, word, row, col);
              inserted = true;
              break;
            }
          }
        }
        if (inserted) break;
      }
    }
  
    const stringGrid: string[][] = grid.map((row) =>
      row.map((cell) => cell.letter)
    );
  
    return trimSparseArray(stringGrid);
  }
  