import wordList from "./wordList.json";

// Function to check if a word can be formed using given letters
const isWordPossible = (word :string, letters: string) => {
  const lettersMap = new Map();
  for (const letter of letters) {
    lettersMap.set(letter, (lettersMap.get(letter) || 0) + 1);
  }
  for (const char of word) {
    if (!lettersMap.has(char) || lettersMap.get(char) === 0) {
      return false;
    }
    lettersMap.set(char, lettersMap.get(char) - 1);
  }
  return true;
};

// Function to find valid English words given a set of letters
const findValidWords = (letters: string, wordList: Array<string>) => {
  const validWords = [];
  for (const word of wordList) {
    if (isWordPossible(word, letters)) {
      validWords.push(word);
    }
  }
  return validWords;
};

export const getWords = (letters: string) => {
  return findValidWords(letters, wordList);
};

