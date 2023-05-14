import React, { ChangeEvent, useState } from "react";
import "./word-count.css";

interface WordCountProps {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const WordCountComponent: React.FC<WordCountProps> = ({ onChange }) => {
  const [inputs, setInputs] = useState([""]);

  const handleInputChange = (index: number, value: any) => {
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);
    // onChange(value);
  };

  const handleBlur = () => {
    setInputs([...inputs, ""]);
  };

  return (
    <div className="word-length-input-container">
      {inputs.map((input, index) => (
        <input
          key={index}
          type="number"
          value={input}
          onChange={(e) => handleInputChange(index, e.target.value)}
          onBlur={handleBlur}
          placeholder={`${index + 3} Letter Words`}
        />
      ))}
    </div>
  );
};

export default WordCountComponent;

// const [wordLengthIndex, setWordLengthIndex] = useState(3)

// const handleWordLengthChange = () => {

// }
