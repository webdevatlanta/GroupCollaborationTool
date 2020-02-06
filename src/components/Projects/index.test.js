import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import Projects from "./index";
import { FirebaseContext } from "../Firebase";

it("renders without crashing", async () => {
  const div = document.createElement("div");

  const projectsPromise = {
    resolve: undefined,
    reject: undefined
  };

  const fakebase = {
    auth: { currentUser: { uid: "123" } },
    getProjects: () =>
      new Promise((resolve, reject) => {
        projectsPromise.resolve = resolve;
        projectsPromise.reject = reject;
      })
  };

  act(() => {
    ReactDOM.render(
      <FirebaseContext.Provider value={fakebase}>
        <Projects />
      </FirebaseContext.Provider>,
      div
    );
  });

  await act(async () => {
    projectsPromise.resolve([]);
  });
});
