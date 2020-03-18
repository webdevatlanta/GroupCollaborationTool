import React from "react";
import ReactDOM from "react-dom";
import { MemoryRouter } from "react-router-dom";
import { act } from "react-dom/test-utils";
import Landing from "./index";
import { ProviderContext } from "../Provider";
import { SessionContext } from "../Session";

it("renders without crashing", async () => {
  const div = document.createElement("div");

  const projectsPromise = {
    resolve: undefined,
    reject: undefined
  };

  const fakesession = { uid: "123" };

  const fakebase = {
    getProjects: () =>
      new Promise((resolve, reject) => {
        projectsPromise.resolve = resolve;
        projectsPromise.reject = reject;
      })
  };

  act(() => {
    ReactDOM.render(
      <MemoryRouter>
        <ProviderContext.Provider value={fakebase}>
          <SessionContext.Provider value={fakesession}>
            <Landing />
          </SessionContext.Provider>
        </ProviderContext.Provider>
      </MemoryRouter>,
      div
    );
  });

  await act(async () => {
    projectsPromise.resolve([]);
  });
});
