import React from "react";
import ReactDOM from "react-dom";
import MessageEditor from "./index";
import { FirebaseContext } from "../Firebase";

it("renders without crashing", () => {
  const div = document.createElement("div");

  ReactDOM.render(<MessageEditor />, div);
});
