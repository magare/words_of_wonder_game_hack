import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import WordCountComponent from './word-count';

describe('WordCountComponent', () => {
  test('renders correctly', () => {
    render(<WordCountComponent onChange={jest.fn()} />);

    const labelElement = screen.getByLabelText('Number of Words with n letter count:');
    const inputElement = screen.getByRole('spinbutton');

    expect(labelElement).toBeInTheDocument();
    expect(inputElement).toBeInTheDocument();
  });

  test('triggers onChange event', () => {
    const onChangeMock = jest.fn();
    render(<WordCountComponent onChange={onChangeMock} />);

    const inputElement = screen.getByRole('spinbutton');
    const testValue = '5';

    fireEvent.change(inputElement, { target: { value: testValue } });

    expect(onChangeMock).toHaveBeenCalledTimes(1);
    expect((inputElement as HTMLInputElement).value).toBe(testValue);
  });
});
