import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import Projects from "./index";
import TestProvider, { projectsPromise } from "../TestProvider";

it("renders without crashing", async () => {
  const div = document.createElement("div");

  act(() => {
    ReactDOM.render(
      <TestProvider>
        <Projects />
      </TestProvider>,
      div
    );
  });

  await act(async () => {
    projectsPromise.resolve([]);
  });
});
