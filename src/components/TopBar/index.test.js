import React from "react";
import ReactDOM from "react-dom";
import { MemoryRouter } from "react-router-dom";
import { act } from "react-dom/test-utils";
import TopBar from "./index";
import { SessionContext } from "../Session";

it("renders without crashing", async () => {
  const div = document.createElement("div");

  const drawerOpen = false;

  const fakesession = {
    uid: "123",
    displayName: "myDisplayName",
    email: "my@email.example.com"
  };

  act(() => {
    ReactDOM.render(
      <MemoryRouter>
        <SessionContext.Provider value={fakesession}>
          <TopBar drawerOpen={drawerOpen} />
        </SessionContext.Provider>
      </MemoryRouter>,
      div
    );
  });
});
