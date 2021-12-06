import React from "react";
import { Error } from "../Error";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

test("Error component innerHTML", () => {
  render(<Error>Test error</Error>);
  expect(screen.getByTestId("error")).toHaveTextContent("Test error");
});

test("Error component color", () => {
  render(<Error>Test error</Error>);
  expect(screen.getByTestId("error")).toHaveStyle(`color: red`);
});
