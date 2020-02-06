import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { FirebaseContext } from "./components/Firebase";

it("renders without crashing", () => {
  const div = document.createElement("div");

  const fakebase = {
    auth: {
      currentUser: {
        uid: 1,
        displayName: "hi",
        email: "hi@example.com"
      }
    }
  };

  ReactDOM.render(
    <FirebaseContext.Provider value={fakebase}>
      <App />
    </FirebaseContext.Provider>,
    div
  );
});
