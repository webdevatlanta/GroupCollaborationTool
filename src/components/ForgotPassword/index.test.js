import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import ForgotPassword from "./index";
import { ProviderContext } from "../Provider";
import { SessionContext } from "../Session";
import { MemoryRouter } from "react-router-dom";

it("renders without crashing", async () => {
  const div = document.createElement("div");

  const resetPromise = {
    resolve: undefined,
    reject: undefined
  };

  const fakebase = {
    sendPasswordResetEmail: email =>
      new Promise((resolve, reject) => {
        resetPromise.resolve = resolve;
        resetPromise.reject = reject;
      })
  };

  act(() => {
    ReactDOM.render(
      <MemoryRouter>
        <ProviderContext.Provider value={fakebase}>
          <ForgotPassword />
        </ProviderContext.Provider>
      </MemoryRouter>,
      div
    );
  });
});
