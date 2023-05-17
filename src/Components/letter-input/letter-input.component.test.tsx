import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import LetterInputComponent from './letter-input';

describe('LetterInputComponent', () => {
  test('renders correctly', () => {
    render(<LetterInputComponent onChange={jest.fn()} />);

    const labelElement = screen.getByLabelText('Enter Letters:');
    const inputElement = screen.getByRole('textbox');

    expect(labelElement).toBeInTheDocument();
    expect(inputElement).toBeInTheDocument();
  });

  test('triggers onChange event', () => {
    const onChangeMock = jest.fn();
    render(<LetterInputComponent onChange={onChangeMock} />);

    const inputElement = screen.getByRole('textbox');
    const testValue = 'test';

    fireEvent.change(inputElement, { target: { value: testValue } });

    expect(onChangeMock).toHaveBeenCalledTimes(1);
    expect((inputElement as HTMLInputElement).value).toBe(testValue);
  });
});
