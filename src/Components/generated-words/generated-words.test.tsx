import React from 'react';
import { render, screen } from '@testing-library/react';
import GeneratedWordsComponent from './generated-words';

describe('GeneratedWordsComponent', () => {
  test('renders correctly with words', () => {
    const words = [['apple', 'banana'], ['car', 'dog']];
    render(<GeneratedWordsComponent words={words} />);

    const headingElement = screen.getByRole('heading', { level: 2 });
    const listItems = screen.getAllByRole('listitem');

    expect(headingElement).toBeInTheDocument();
    expect(listItems).toHaveLength(4);
  });

  test('renders correctly without words', () => {
    const words: string[][] = [];
    render(<GeneratedWordsComponent words={words} />);

    const headingElement = screen.getByRole('heading', { level: 2 });
    const listItems = screen.queryAllByRole('listitem');

    expect(headingElement).toBeInTheDocument();
    expect(listItems).toHaveLength(0);
  });
});
