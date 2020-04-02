import React from "react";
import ReactDOM from "react-dom";

import { act } from "react-dom/test-utils";
import NameTag from "./index";
import TestProvider, { mock } from "../TestProvider";

let div;
beforeEach(() => {
  div = document.createElement("div");
});

it("renders valid session without crashing", async () => {
  act(() => {
    ReactDOM.render(
      <TestProvider>
        <NameTag />
      </TestProvider>,
      div
    );
  });

  expect(div.textContent).toBe(mock.displayName);
});

it("renders null session without crashing", async () => {
  act(() => {
    ReactDOM.render(
      <TestProvider session={null}>
        <NameTag />
      </TestProvider>,
      div
    );
  });

  expect(div.textContent).toBe("Sign In");
});

it("renders undefined session without crashing", async () => {
  act(() => {
    ReactDOM.render(
      <TestProvider session={undefined}>
        <NameTag />
      </TestProvider>,
      div
    );
  });

  expect(div.textContent).toBe("");
});
