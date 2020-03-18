import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import MessageViewer from "./index";
import { ProviderContext } from "../Provider";

it("renders without crashing", () => {
  const div = document.createElement("div");

  const fakebase = {
    subscribeProjectMessages: (id, callback, error) => {
      callback([]); // respond with an empty array, i.e. no messages
      return function() {};
    }
  };

  act(() => {
    ReactDOM.render(
      <ProviderContext.Provider value={fakebase}>
        <MessageViewer />
      </ProviderContext.Provider>,
      div
    );
  });
});
