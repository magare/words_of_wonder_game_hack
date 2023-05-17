import React from "react";
import "./word-grid.css";

interface WordGridProps {
  grid: string[][];
}

const WordGridComponent: React.FC<WordGridProps> = ({ grid }) => {
  return (
    <div>
      <h2>Word Grid:</h2>
      <table className="word-grid-table">
        <tbody>
          {grid.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((col, colIndex) => (
                <td
                  key={colIndex}
                  className={`grid-cell ${col.trim() ? "non-empty" : "empty"}`}
                >
                  {col}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WordGridComponent;
