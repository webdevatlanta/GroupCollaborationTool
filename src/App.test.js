import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import TestProvider from "./components/TestProvider";

it("renders without crashing", () => {
  const div = document.createElement("div");

  ReactDOM.render(
    <TestProvider>
      <App />
    </TestProvider>,
    div
  );
});
