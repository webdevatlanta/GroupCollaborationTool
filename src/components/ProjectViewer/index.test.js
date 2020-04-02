import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import ProjectViewer from "./index";
import TestProvider, { projectPromise } from "../TestProvider";

it("renders without crashing", async () => {
  const div = document.createElement("div");

  const fakeproject_id = "abc123";
  const fakeproject = {
    name: "hi",
    type: "private",
    description: "project description",
    repoLink: "https://test.example.com/hi"
  };

  // This would be provided by the Router, taken from the URL.
  const match = { params: { id: fakeproject_id } };

  act(() => {
    ReactDOM.render(
      <TestProvider>
        <ProjectViewer match={match} />
      </TestProvider>,
      div
    );
  });

  await act(async () => {
    projectPromise.resolve(fakeproject);
  });
});
