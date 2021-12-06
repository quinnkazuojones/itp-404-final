import React from "react";
import { Centered } from "../Centered";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

test("Centered component innerHTML", () => {
  render(<Centered>Test error</Centered>);
  expect(screen.getByTestId("centered")).toHaveTextContent("Test error");
});

test("Centered component style", () => {
  render(<Centered>Test error</Centered>);
  expect(screen.getByTestId("centered")).toHaveStyle(`text-align: center`);
});
