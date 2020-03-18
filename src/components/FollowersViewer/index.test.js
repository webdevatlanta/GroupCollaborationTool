import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import FollowersViewer from "./index";
import { ProviderContext } from "../Provider";

it("renders without crashing", async () => {
  const div = document.createElement("div");

  const fakebase = {
    getProjectFollowers: id => {
      return Promise.resolve([{ displayName: "me" }]);
    }
  };

  await act(async () => {
    ReactDOM.render(
      <ProviderContext.Provider value={fakebase}>
        <FollowersViewer projectId="123" />
      </ProviderContext.Provider>,
      div
    );
  });
  expect(div.innerHTML).toContain("me");
});
