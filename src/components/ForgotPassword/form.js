import React, { useState, useContext } from "react";
import { ProviderContext } from "../Provider";

const ForgotPasswordFrom = () => {
  const provider = useContext(ProviderContext);
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");

  const validate = () => {
    return email.length > 0;
  };

  const handleSubmit = e => {
    e.preventDefault();

    provider
      .sendPasswordResetEmail(email)
      .then(() => {
        setSuccessMessage("Email sent");
      })
      .catch(err => {
        setError(err);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="signin-form">
      <input
        type="email"
        name="email"
        placeholder="email address"
        id="fogot-password-email"
        onChange={e => setEmail(e.target.value)}
      />
      <br />
      <button
        type="submit"
        className={
          validate()
            ? "signin-form-submit validated"
            : "signin-form-submit disabled"
        }
        disabled={!validate()}
      >
        Send reset instructions
      </button>
      <br />
      {successMessage && <p>{successMessage}</p>}
      {error && <p>{error.message}</p>}
    </form>
  );
};

export default ForgotPasswordFrom;
