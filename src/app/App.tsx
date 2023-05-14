import React, { ChangeEvent, useState } from 'react';
import GeneratedWordsComponent from '../Components/generated-words/generated-words';
import LetterInputComponent from '../Components/letter-input/letter-input';
import WordCountComponent from '../Components/word-count/word-count';
import WordGridComponent from '../Components/word-grid/word-grid';

const App: React.FC = () => {
  const [letters, setLetters] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [generatedWords, setGeneratedWords] = useState<string[][]>([]);
  const [wordGrid, setWordGrid] = useState<string[][]>([]);

  const handleLetterChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLetters(event.target.value);
  };

  const handleWordCountChange = (event: ChangeEvent<HTMLInputElement>) => {
    setWordCount(parseInt(event.target.value, 10));
  };

  const generateWords = () => {
    // Implement your logic to generate words based on letters and word count
    // Set the generated words and word grid using setGeneratedWords and setWordGrid
    // For example:
    const mockGeneratedWords: string[][] = [['word1', 'word2'], ['word3']];
    setGeneratedWords(mockGeneratedWords);

    const mockWordGrid: string[][] = [['w', 'o', 'r', 'd'], ['1', '2', '3', '4']];
    setWordGrid(mockWordGrid);
  };

  const showGeneratedWords = generatedWords.length > 0;
  const showWordGrid = wordGrid.length > 0;

  return (
    <div>
      <LetterInputComponent onChange={handleLetterChange} />
      <WordCountComponent onChange={handleWordCountChange} />
      <button onClick={generateWords}>Generate Words</button>
      {showGeneratedWords && <GeneratedWordsComponent words={generatedWords} />}
      {showWordGrid && <WordGridComponent grid={wordGrid} />}

    </div>
  );
};

export default App;
