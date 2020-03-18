import React, { useContext, useState } from "react";
import { ProviderContext } from "../Provider";
import Button from "@material-ui/core/Button";

export default function() {
  const provider = useContext(ProviderContext);
  const [verifying, setVerifying] = useState(false);

  const handleVerify = event => {
    event.preventDefault();
    setVerifying(true);
    provider.auth.currentUser.sendEmailVerification({
      url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT
    });
  };

  if (provider.auth.currentUser.emailVerified) {
    return <div>{provider.auth.currentUser.email} &#x2714;</div>;
  } else {
    return (
      <div>
        {provider.auth.currentUser.email}
        {verifying && <Button color="secondary">Verifying...</Button>}
        {!verifying && (
          <Button color="primary" onClick={handleVerify}>
            click to verify
          </Button>
        )}
      </div>
    );
  }
}
