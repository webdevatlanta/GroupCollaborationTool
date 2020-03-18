import React from "react";
import * as ROUTES from "../../constants/routes";

export default function() {
  return (
    <p>
      {" "}
      You are not signed in. If you have an account,{" "}
      <a href={ROUTES.SIGN_IN}>sign in here</a>. Otherwise,{" "}
      <a href={ROUTES.SIGN_UP}>sign up</a>!
    </p>
  );
}
