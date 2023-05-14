import React from 'react';

interface WordGridProps {
  grid: string[][];
}

const WordGridComponent: React.FC<WordGridProps> = ({ grid }) => {
  return (
    <div>
      <h2>Word Grid:</h2>
      <table>
        <tbody>
          {grid.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((col, colIndex) => (
                <td key={colIndex}>{col}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WordGridComponent;