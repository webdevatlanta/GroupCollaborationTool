import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import MessageViewer from "./index";
import { FirebaseContext } from "../Firebase";

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
      <FirebaseContext.Provider value={fakebase}>
        <MessageViewer />
      </FirebaseContext.Provider>,
      div
    );
  });
});
