import React, { ChangeEvent, KeyboardEvent } from "react";

interface InputProps {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

function handleKeyPress(event: React.KeyboardEvent<HTMLInputElement>): void {
  const keyCode = event.keyCode || event.which;
  const key = String.fromCharCode(keyCode);
  const regex = /^[A-Za-z]+$/;

  if (!regex.test(key)) {
    event.preventDefault();
  }
}

const LetterInputComponent: React.FC<InputProps> = ({ onChange }) => {
  return (
    <input
      type="text"
      placeholder="Enter Characters"
      className="game-input"
      onKeyPress={handleKeyPress}
      onChange={onChange}
    />
  );
};

export default LetterInputComponent;
