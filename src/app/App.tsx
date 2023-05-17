import React, { ChangeEvent, useEffect, useState } from "react";
import WebFont from "webfontloader";
import GeneratedWordsComponent from "../Components/generated-words/generated-words";
import LetterInputComponent from "../Components/letter-input/letter-input";
import WordGridComponent from "../Components/word-grid/word-grid";
import { generateGridWithTrie } from "../services/generateGridWithTrie";
import { generateGrid } from "../services/generateGrid";
import { getWords } from "../services/generateWords";

import "./App.css";

const App: React.FC = () => {
  const [letters, setLetters] = useState("");
  const [wordGrid, setWordGrid] = useState<string[][]>([]);
  const [allWords, setAllWords] = useState<string[]>([]);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<
    "default" | "trie"
  >("default");

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Courier New"],
      },
    });
  }, []);

  const getNLengthWords = () => {
    const map: { [key: string]: number } = {};
    allWords.forEach((word) => {
      map[word] = word.length;
    });

    return map;
  };

  const handleLetterChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLetters(event.target.value);
  };

  const generateWords = () => {
    const words = getWords(letters);
    setAllWords(words);
  };

  const generateWordGrid = () => {
    const grid = generateGrid(allWords, getNLengthWords());
    setWordGrid(grid);
  };

  const generateWordGridWithTrie = () => {
    const grid = generateGridWithTrie(allWords);
    setWordGrid(grid);
  };

  const groupWordsByLength = (words: string[]): string[][] => {
    const maxLength = Math.max(...words.map((word) => word.length));
    let groupedWords: string[][] = Array.from(
      { length: maxLength + 1 },
      () => []
    );

    for (const word of words) {
      const wordLength = word.length;
      groupedWords[wordLength].push(word);
    }

    groupedWords = groupedWords.filter((array) => array.length);

    const uniqueArrays: string[][] = [];

    for (const innerArray of groupedWords) {
      const uniqueElements: string[] = Array.from(new Set(innerArray));
      uniqueArrays.push(uniqueElements);
    }

    return uniqueArrays;
  };

  const showWordGrid = wordGrid.length > 0;

  const handleAlgorithmChange = (event: any) =>
    setSelectedAlgorithm(event.target.value);

  return (
    <div className="main-container">
      <div className="app-container">
        <LetterInputComponent onChange={handleLetterChange} />
        <button onClick={generateWords}>Generate Words</button>
        {!!allWords.length && (
          <>
            <button
              onClick={() => {
                if (selectedAlgorithm === "default") generateWordGrid();
                else generateWordGridWithTrie();
              }}
            >
              Generate Grid
            </button>
            <label>
              <input
                type="radio"
                value="default"
                checked={selectedAlgorithm === "default"}
                onChange={handleAlgorithmChange}
              />
              Default Algorithm
            </label>
            <label>
              <input
                type="radio"
                value="trie"
                checked={selectedAlgorithm === "trie"}
                onChange={handleAlgorithmChange}
              />
              Trie Algorithm
            </label>
          </>
        )}

        {showWordGrid ? (
          <WordGridComponent grid={wordGrid} />
        ) : (
          <p>No grid to show</p>
        )}
      </div>
      <div className="word-grid-container">
        {allWords.length > 0 && (
          <GeneratedWordsComponent words={groupWordsByLength(allWords)} />
        )}
      </div>
    </div>
  );
};

export default App;
