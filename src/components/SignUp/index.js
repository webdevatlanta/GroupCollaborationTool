import React from "react";
import SignUpForm from "./form";
import { ProviderContext } from "../Provider";

export default function(props) {
  return (
    <div>
      <h1>Sign Up</h1>
      <ProviderContext.Consumer>
        {provider => <SignUpForm provider={provider} />}
      </ProviderContext.Consumer>
    </div>
  );
}
