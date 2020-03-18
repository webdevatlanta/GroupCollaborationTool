import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import SignOut from "./index";
import { ProviderContext } from "../Provider";

it("renders without crashing", async () => {
  const div = document.createElement("div");

  const signoutPromise = {
    resolve: undefined,
    reject: undefined
  };

  const fakebase = {
    doSignOut: () =>
      new Promise((resolve, reject) => {
        signoutPromise.resolve = resolve;
        signoutPromise.reject = reject;
      })
  };

  act(() => {
    ReactDOM.render(
      <ProviderContext.Provider value={fakebase}>
        <SignOut />
      </ProviderContext.Provider>,
      div
    );
  });
});
