import React, { ChangeEvent, useEffect, useState } from "react";
import WebFont from "webfontloader";
import GeneratedWordsComponent from "../Components/generated-words/generated-words";
import LetterInputComponent from "../Components/letter-input/letter-input";
import WordCountComponent from "../Components/word-count/word-count";
import WordGridComponent from "../Components/word-grid/word-grid";
import { generateGrid } from "../services/generateGrid";
import { getWords } from "../services/generateWords";
import "./App.css";

const App: React.FC = () => {
  const [letters, setLetters] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [generatedWords, setGeneratedWords] = useState<string[][]>([]);
  const [wordGrid, setWordGrid] = useState<string[][]>([]);
  const [allWords, setAllWords] = useState<string[]>([]);

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Courier New"],
      },
    });
  }, []);

  const getWordGrid = () => {};

  const getNLengthWords = () => {
    const map: { [key: number | string]: number } = {};
    allWords.forEach((i: string) => {
      map[i] = i.length;
    });

    return map;
  };

  const handleLetterChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log("value", event.target.value);
    setLetters(event.target.value);
  };

  const handleWordCountChange = (event: ChangeEvent<HTMLInputElement>) => {
    setWordCount(parseInt(event.target.value, 10));
  };

  const generateWords = async () => {
    await setAllWords(getWords(letters));
  };

  const generateWordGrid = () => {
    const grid = generateGrid(allWords, getNLengthWords());
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

    groupedWords = groupedWords.filter((i) => i.length);

    const uniqueArrays: any[][] = [];

    for (const innerArray of groupedWords) {
      const uniqueElements: any[] = Array.from(new Set(innerArray));
      uniqueArrays.push(uniqueElements);
    }

    return uniqueArrays;
  };

  const showGeneratedWords = generatedWords.length > 0;
  const showWordGrid = wordGrid.length > 0;

  return (
    <div className="main-container">
      <div className="app-container">
        <LetterInputComponent onChange={handleLetterChange} />
        {/* <WordCountComponent onChange={handleWordCountChange} /> */}
        <button onClick={generateWords}>Generate Words</button>
        <button onClick={generateWordGrid}>Generate Grid</button>

        {showWordGrid && <WordGridComponent grid={wordGrid} />}
        {!showWordGrid && <>{"No grid to show"}</>}
      </div>
      <div className="word-grid">
        {allWords.length > 0 && (
          <GeneratedWordsComponent words={groupWordsByLength(allWords)} />
        )}
      </div>
    </div>
  );
};

export default App;

