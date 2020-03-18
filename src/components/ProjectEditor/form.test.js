import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import EditorForm from "./form";
import { ProviderContext } from "../Provider";
import { SessionContext } from "../Session";

it("renders without crashing", () => {
  const div = document.createElement("div");

  // This would be provided by the Router, taken from the URL.
  const match = { params: { id: "test-project-id" } };

  const fakebase = {};

  const fakeproject_id = "abc123";
  const fakeproject = {
    name: "hi",
    type: "type",
    description: "project description",
    repoLink: "https://test.example.com/hi"
  };

  const fakesession = {
    uid: 123
  };

  ReactDOM.render(
    <ProviderContext.Provider value={fakebase}>
      <SessionContext.Provider value={fakesession}>
        <EditorForm projectId={fakeproject_id} project={fakeproject} />
      </SessionContext.Provider>
    </ProviderContext.Provider>,
    div
  );
});
