import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import NavDrawer from "./index";
import TestProvider from "../TestProvider";

it("renders without crashing", async () => {
  const div = document.createElement("div");

  const drawerOpen = false;

  act(() => {
    ReactDOM.render(
      <TestProvider>
        <NavDrawer drawerOpen={drawerOpen} />
      </TestProvider>,
      div
    );
  });
});
