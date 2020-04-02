import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import FollowersViewer from "./index";
import TestProvider, { mock } from "../TestProvider";

it("renders without crashing", async () => {
  const div = document.createElement("div");

  await act(async () => {
    ReactDOM.render(
      <TestProvider>
        <FollowersViewer projectId="123" />
      </TestProvider>,
      div
    );
  });
  expect(div.innerHTML).toContain(mock.displayName);
});
