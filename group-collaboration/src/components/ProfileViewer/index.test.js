import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import ProfileViewer from "./index";
import { FirebaseContext } from "../Firebase";
import { SessionContext } from "../Session";

it("renders without crashing", async () => {
  const div = document.createElement("div");

  const fakeprofile_id = "hij456";

  const fakesession = {
    uid: 123
  };

  const fakeProfile = {
    displayName: "Amanda Huggenkis",
    description: "I am a mock person."
  };

  const profilePromise = {
    resolve: undefined,
    reject: undefined
  };

  const fakebase = {
    getProfile: id =>
      new Promise((resolve, reject) => {
        profilePromise.resolve = resolve;
        profilePromise.reject = reject;
      })
  };

  // This would be provided by the Router, taken from the URL.
  const match = { params: { id: fakeprofile_id } };

  act(() => {
    ReactDOM.render(
      <FirebaseContext.Provider value={fakebase}>
        <SessionContext.Provider value={fakesession}>
          <ProfileViewer match={match} />
        </SessionContext.Provider>
      </FirebaseContext.Provider>,
      div
    );
  });

  await act(async () => {
    profilePromise.resolve(fakeProfile);
  });
});
