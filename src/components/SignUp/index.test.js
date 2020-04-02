import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import Signup from "./index";
import TestProvider from "../TestProvider";

it("renders without crashing", async () => {
  const div = document.createElement("div");

  act(() => {
    ReactDOM.render(
      <TestProvider session={undefined}>
        <Signup />
      </TestProvider>,
      div
    );
  });
});
