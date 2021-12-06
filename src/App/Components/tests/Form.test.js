import React from "react";
import { Form } from "../Form";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { PRIMARY, SECONDARY } from "../../../config/constants";

test("Form button styles", () => {
  render(
    <Form>
      <button data-testid="button"></button>
    </Form>
  );
  expect(screen.getByTestId("button")).toHaveStyle(
    `border: 1px solid ${PRIMARY}`
  );
});

test("Form button styles 2", () => {
  render(
    <Form>
      <button data-testid="button"></button>
    </Form>
  );
  expect(screen.getByTestId("button")).toHaveStyle(`border-radius: 3px`);
});

test("Form border styles", () => {
  render(<Form data-testid="form" />);
  expect(screen.getByTestId("form")).toHaveStyle(
    `border: 1px solid ${SECONDARY}`
  );
});
