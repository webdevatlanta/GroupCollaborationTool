import React from "react";
import SignInForm from "./form";
import * as ROUTES from "../../constants/routes";
import { Link } from "react-router-dom";
import "./style.css";

export default function() {
  return (
    <div className="signin-container">
      <div className="form-info-container">
        <h1>Sign In</h1>
        <SignInForm />
        <p>
          <Link to={ROUTES.FORGOT_PASSWORD}>Forgot password</Link>
        </p>
        <p>
          If you do not have an account,{" "}
          <a href={ROUTES.SIGN_UP}>create one!</a>
        </p>
      </div>
    </div>
  );
}
