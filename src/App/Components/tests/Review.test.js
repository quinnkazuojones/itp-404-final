import React from "react";
import { Review } from "../Review";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter } from "react-router-dom";

const data = {
  name: "test-name",
  comment: "test-comment",
  rating: 4,
  id: "test-id",
};

test("Review component name", () => {
  render(
    <BrowserRouter>
      <Review data={data} />
    </BrowserRouter>
  );
  expect(screen.getByTestId("name")).toHaveTextContent(data.name);
});

test("Review component comment", () => {
  render(
    <BrowserRouter>
      <Review data={data} />
    </BrowserRouter>
  );
  expect(screen.getByTestId("comment")).toHaveTextContent(data.comment);
});

test("Review component view link value", () => {
  render(
    <BrowserRouter>
      <Review data={data} />
    </BrowserRouter>
  );
  expect(screen.getByTestId("view-link")).toHaveAttribute(
    "href",
    "/review/" + data.id
  );
});
