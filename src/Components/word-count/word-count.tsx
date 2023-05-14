import React, { ChangeEvent } from 'react';

interface WordCountProps {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const WordCountComponent: React.FC<WordCountProps> = ({ onChange }) => {
  return (
    <div>
      <label>Number of Words with n letter count:</label>
      <input type="number" onChange={onChange} />
    </div>
  );
};

export default WordCountComponent;
