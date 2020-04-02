import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import ProfileEditor from "./index";
import TestProvider from "../TestProvider";

it("renders without crashing", () => {
  const div = document.createElement("div");

  act(() => {
    ReactDOM.render(
      <TestProvider>
        <ProfileEditor />
      </TestProvider>,
      div
    );
  });
});
