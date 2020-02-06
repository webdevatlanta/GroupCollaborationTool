import React from "react";
import ReactDOM from "react-dom";
import { MemoryRouter } from "react-router-dom";
import { act } from "react-dom/test-utils";
import Landing from "./index";
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
      <MemoryRouter>
        <FirebaseContext.Provider value={fakebase}>
          <Landing />
        </FirebaseContext.Provider>
      </MemoryRouter>,
      div
    );
  });

  await act(async () => {
    projectsPromise.resolve([]);
  });
});
