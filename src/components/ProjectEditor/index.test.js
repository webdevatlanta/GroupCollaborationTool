import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import ProjectEditor from "./index";
import { ProviderContext } from "../Provider";
import { SessionContext } from "../Session";

it("renders without crashing", async () => {
  const div = document.createElement("div");

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

  const projectPromise = {
    resolve: undefined,
    reject: undefined
  };

  const fakebase = {
    getProject: id =>
      new Promise((resolve, reject) => {
        projectPromise.resolve = resolve;
      }),

    subscribeProjectMessages: (id, callback, error) => {
      callback([]); // Return an empty list of messages.
      return function() {};
    }
  };

  // This would be provided by the Router, taken from the URL.
  const match = { params: { id: fakeproject_id } };

  act(() => {
    ReactDOM.render(
      <ProviderContext.Provider value={fakebase}>
        <SessionContext.Provider value={fakesession}>
          <ProjectEditor match={match} />
        </SessionContext.Provider>
      </ProviderContext.Provider>,
      div
    );
  });

  await act(async () => {
    projectPromise.resolve(fakeproject);
  });
});
