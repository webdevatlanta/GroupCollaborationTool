import React from "react";
import ReactDOM from "react-dom";
import { MemoryRouter } from "react-router-dom";
import { act } from "react-dom/test-utils";
import NameTag from "./index";
import { SessionContext } from "../Session";

it("renders valid session without crashing", async () => {
  const fakesession = {
    uid: "123",
    displayName: "myDisplayName",
    email: "my@email.example.com"
  };

  const div = document.createElement("div");

  act(() => {
    ReactDOM.render(
      <MemoryRouter>
        <NameTag session={fakesession} />
      </MemoryRouter>,
      div
    );
  });

  expect(div.textContent).toBe("myDisplayName");
});

it("renders null session without crashing", async () => {
  const fakesession = null;

  const div = document.createElement("div");

  act(() => {
    ReactDOM.render(
      <MemoryRouter>
        <NameTag session={fakesession} />
      </MemoryRouter>,
      div
    );
  });

  expect(div.textContent).toBe("Sign In");
});

it("renders undefined session without crashing", async () => {
  const fakesession = undefined;

  const div = document.createElement("div");

  act(() => {
    ReactDOM.render(
      <MemoryRouter>
        <NameTag session={fakesession} />
      </MemoryRouter>,
      div
    );
  });

  expect(div.textContent).toBe("");
});
