import React, { useState, useContext } from "react";
import { FirebaseContext } from "../Firebase";

const ForgotPasswordFrom = () => {
  const firebase = useContext(FirebaseContext);
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");

  const validate = () => {
    return email.length > 0;
  };

  const handleSubmit = e => {
    e.preventDefault();

    firebase
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
