import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import Signup from "./index";
import { ProviderContext } from "../Provider";
import { SessionContext } from "../Session";
import { MemoryRouter } from "react-router-dom";

it("renders without crashing", async () => {
  const div = document.createElement("div");

  const fakesession = undefined;

  const signupPromise = {
    resolve: undefined,
    reject: undefined
  };

  const fakebase = {
    doCreateUserWithEmailAndPassword: (email, password) =>
      new Promise((resolve, reject) => {
        signupPromise.resolve = resolve;
        signupPromise.reject = reject;
      })
  };

  act(() => {
    ReactDOM.render(
      <MemoryRouter>
        <ProviderContext.Provider value={fakebase}>
          <SessionContext.Provider value={fakesession}>
            <Signup />
          </SessionContext.Provider>
        </ProviderContext.Provider>
      </MemoryRouter>,
      div
    );
  });
});
