import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import Signin from "./index";
import { ProviderContext } from "../Provider";
import { SessionContext } from "../Session";
import { MemoryRouter } from "react-router-dom";

it("renders without crashing", async () => {
  const div = document.createElement("div");

  const fakesession = undefined;

  const signinPromise = {
    resolve: undefined,
    reject: undefined
  };

  const fakebase = {
    doSignInWithEmailAndPassword: (email, password) =>
      new Promise((resolve, reject) => {
        signinPromise.resolve = resolve;
        signinPromise.reject = reject;
      })
  };

  act(() => {
    ReactDOM.render(
      <MemoryRouter>
        <ProviderContext.Provider value={fakebase}>
          <SessionContext.Provider value={fakesession}>
            <Signin />
          </SessionContext.Provider>
        </ProviderContext.Provider>
      </MemoryRouter>,
      div
    );
  });
});
