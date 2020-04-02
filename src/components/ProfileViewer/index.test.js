import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import ProfileViewer from "./index";
import TestProvider, { profilePromise } from "../TestProvider";

it("renders without crashing", async () => {
  const div = document.createElement("div");

  const fakeprofile_id = "hij456";

  const fakeProfile = {
    displayName: "Amanda Huggenkis",
    description: "I am a mock person."
  };

  // This would be provided by the Router, taken from the URL.
  const match = { params: { id: fakeprofile_id } };

  act(() => {
    ReactDOM.render(
      <TestProvider>
        <ProfileViewer match={match} />
      </TestProvider>,
      div
    );
  });

  await act(async () => {
    profilePromise.resolve(fakeProfile);
  });
});
