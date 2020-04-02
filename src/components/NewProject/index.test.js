import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";

import NewProject from "./index";
import TestProvider from "../TestProvider";

it("renders without crashing", () => {
  const div = document.createElement("div");

  act(() => {
    ReactDOM.render(
      <TestProvider>
        <NewProject />
      </TestProvider>,
      div
    );
  });
});
