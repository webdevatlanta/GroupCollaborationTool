import React from "react";
import ForgotPassword from "../components/ForgotPassword";
import { MemoryRouter } from "react-router-dom";
import { storiesOf } from "@storybook/react";

storiesOf("Forgot Password", module)
  .addDecorator(story => (
    <MemoryRouter initialEntries={["/"]}>{story()}</MemoryRouter>
  ))
  .add("Default", () => {
    return <ForgotPassword />;
  });
