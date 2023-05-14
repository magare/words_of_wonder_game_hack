import React, { ChangeEvent } from 'react';

interface LetterInputProps {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const LetterInputComponent: React.FC<LetterInputProps> = ({ onChange }) => {
  return (
    <div>
      <label>Enter Letters:</label>
      <input type="text" onChange={onChange} />
    </div>
  );
};

export default LetterInputComponent;
