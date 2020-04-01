import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import { MemoryRouter } from "react-router-dom";
import ProfileEditor from "./index";
import { ProviderContext } from "../Provider";
import { SessionContext } from "../Session";

it("renders without crashing", () => {
  const div = document.createElement("div");

  const fakesession = {
    uid: 123
  };

  let signoutPromise, profilePromise;
  signoutPromise = profilePromise = { resolve: undefined, reject: undefined };

  const fakebase = {
    doSignOut: () =>
      new Promise((resolve, reject) => {
        signoutPromise.resolve = resolve;
        signoutPromise.reject = reject;
      }),
    getProfile: id =>
      new Promise((resolve, reject) => {
        profilePromise.resolve = resolve;
        profilePromise.reject = reject;
      }),
    auth: {
      currentUser: {
        emailVerified: true,
        email: "groopa@groopa.com"
      }
    }
  };

  act(() => {
    ReactDOM.render(
      <MemoryRouter>
        <ProviderContext.Provider value={fakebase}>
          <SessionContext.Provider value={fakesession}>
            <ProfileEditor />
          </SessionContext.Provider>
        </ProviderContext.Provider>
      </MemoryRouter>,
      div
    );
  });
});
