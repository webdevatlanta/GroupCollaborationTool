import React from "react";
import ReactDOM from "react-dom";
import { MemoryRouter } from "react-router-dom";
import { act } from "react-dom/test-utils";
import NewProject from "./index";
import { FirebaseContext } from "../Firebase";
import { SessionContext } from "../Session";

it("renders without crashing", () => {
  const div = document.createElement("div");

  const fakebase = {};
  const fakesession = {
    uid: 123
  };

  act(() => {
    ReactDOM.render(
      <MemoryRouter>
        <FirebaseContext.Provider value={fakebase}>
          <SessionContext.Provider value={fakesession}>
            <NewProject />
          </SessionContext.Provider>
        </FirebaseContext.Provider>
      </MemoryRouter>,
      div
    );
  });
});
