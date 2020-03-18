import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Firebase from "./components/Firebase";
import Provider, { ProviderContext } from "./components/Provider";
import * as serviceWorker from "./serviceWorker";
import "./index.css";

const firebase = new Firebase();

const provider = new Provider({
  db: firebase.db,
  auth: firebase.auth,
  serverTimestamp: firebase.serverTimestamp
});

ReactDOM.render(
  <ProviderContext.Provider value={provider}>
    <App />
  </ProviderContext.Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
