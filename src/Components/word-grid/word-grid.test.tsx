import React from "react";
import { render, screen } from "@testing-library/react";
import WordGridComponent from "./word-grid";

describe("WordGridComponent", () => {
  test("renders correctly with grid", () => {
    const grid = [
      ["a", "p", "p", "l", "e"],
      ["b", "a", "n", "a", "n", "a"],
    ];
    render(<WordGridComponent grid={grid as any} />);

    const headingElement = screen.getByRole("heading", { level: 2 });
    const tableElement = screen.getByRole("table");
    const tableRows = screen.getAllByRole("row");
    const tableCells = screen.getAllByRole("cell");

    expect(headingElement).toBeInTheDocument();
    expect(tableElement).toBeInTheDocument();
    expect(tableRows).toHaveLength(2);
    expect(tableCells).toHaveLength(11);
  });

  test("renders correctly without grid", () => {
    const grid: string[][] = [];
    render(<WordGridComponent grid={grid as any} />);

    const headingElement = screen.getByRole("heading", { level: 2 });
    const tableElement = screen.queryByRole("table");

    expect(headingElement).toBeInTheDocument();
    expect(tableElement).not.toBeInTheDocument();
  });
});
