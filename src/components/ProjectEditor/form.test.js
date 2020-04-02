import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import EditorForm from "./form";

import TestProvider from "../TestProvider";

it("renders without crashing", () => {
  const div = document.createElement("div");

  // This would be provided by the Router, taken from the URL.
  const match = { params: { id: "test-project-id" } };

  const fakeproject_id = "abc123";
  const fakeproject = {
    name: "hi",
    type: "type",
    description: "project description",
    repoLink: "https://test.example.com/hi"
  };

  ReactDOM.render(
    <TestProvider>
      <EditorForm projectId={fakeproject_id} project={fakeproject} />
    </TestProvider>,
    div
  );
});
