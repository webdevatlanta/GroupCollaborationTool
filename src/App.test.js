import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ProviderContext } from "./components/Provider";

it("renders without crashing", () => {
  const div = document.createElement("div");

  const provider = {
    auth: {
      currentUser: {
        uid: 1,
        displayName: "hi",
        email: "hi@example.com"
      }
    }
  };

  ReactDOM.render(
    <ProviderContext.Provider value={provider}>
      <App />
    </ProviderContext.Provider>,
    div
  );
});
