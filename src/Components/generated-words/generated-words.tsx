import React from 'react';

interface GeneratedWordsProps {
  words: string[][];
}

const GeneratedWordsComponent: React.FC<GeneratedWordsProps> = ({ words }) => {
  return (
    <div>
      <h2>Generated Words:</h2>
      {words.map((word, index) => (
        <div key={index}>
          <h3>Letter Count: {word.length}</h3>
          <ul>
            {word.map((w, i) => (
              <li key={i}>{w}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default GeneratedWordsComponent;
