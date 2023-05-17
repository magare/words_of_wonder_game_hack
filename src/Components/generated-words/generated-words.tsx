import React, { useState, useEffect } from "react";

interface GeneratedWordsProps {
  words: string[][];
}

const GeneratedWordsComponent: React.FC<GeneratedWordsProps> = ({ words }) => {
  const [renderedWords, setRenderedWords] = useState<string[][]>([]);

  useEffect(() => {
    const timeoutIds: NodeJS.Timeout[][] = words.map((word, index) => {
      let delay = 0;

      const wordTimeoutIds: NodeJS.Timeout[] = word.map((letter) => {
        delay += 0; // Adjust the delay time per letter here (200 milliseconds in this example)

        return setTimeout(() => {
          setRenderedWords((prevWords) => {
            const updatedWords = [...prevWords];
            updatedWords[index] = [
              ...word.slice(0, updatedWords[index]?.length || 0),
              letter,
            ];
            return updatedWords;
          });
        }, delay);
      });

      return wordTimeoutIds;
    });

    return () => {
      // Clear all the timeouts when the component is unmounted
      timeoutIds.forEach((wordTimeoutIds) => {
        wordTimeoutIds.forEach((timeoutId) => clearTimeout(timeoutId));
      });
    };
  }, [words]);

  return (
    <div className="generated-words">
      <h2>Generated Words:</h2>
      {renderedWords.map((word, index) => (
        <div key={index} className="words">
          <h3>Letter Count: {word.length ? word[0].length : ""}</h3>
          <div className="word-list">
            {word.map((letter, i) => (
              <div className="word" key={i}>
                {letter}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default GeneratedWordsComponent;
