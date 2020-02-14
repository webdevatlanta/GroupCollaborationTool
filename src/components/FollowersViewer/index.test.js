import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import FollowersViewer from "./index";
import { FirebaseContext } from "../Firebase";

it("renders without crashing", async () => {
  const div = document.createElement("div");

  const fakebase = {
    getProjectFollowers: id => {
      return Promise.resolve([{ displayName: "me" }]);
    }
  };

  await act(async () => {
    ReactDOM.render(
      <FirebaseContext.Provider value={fakebase}>
        <FollowersViewer projectId="123" />
      </FirebaseContext.Provider>,
      div
    );
  });
  expect(div.innerHTML).toContain("me");
});
