import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import ProjectEditor from "./index";
import TestProvider, { projectPromise } from "../TestProvider";

it("renders without crashing", async () => {
  const div = document.createElement("div");

  const fakeproject_id = "abc123";
  const fakeproject = {
    name: "hi",
    type: "type",
    description: "project description",
    repoLink: "https://test.example.com/hi"
  };

  // This would be provided by the Router, taken from the URL.
  const match = { params: { id: fakeproject_id } };

  act(() => {
    ReactDOM.render(
      <TestProvider>
        <ProjectEditor match={match} />
      </TestProvider>,
      div
    );
  });

  await act(async () => {
    projectPromise.resolve(fakeproject);
  });
});
