import React, { useState, useContext, useEffect } from "react";
import { ProviderContext } from "../Provider";

export default function() {
  const provider = useContext(ProviderContext);
  const [displayName, setDisplayName] = useState(
    provider.auth.currentUser.displayName
  );
  const [validated, setValidated] = useState(false);

  const [error, setError] = useState("");

  useEffect(() => {
    setDisplayName(provider.auth.currentUser.displayName);
  }, [provider.auth.currentUser.displayName]);

  useEffect(() => {
    setValidated(
      displayName &&
        displayName.length > 0 &&
        displayName !== provider.auth.currentUser.displayName
    );
  }, [displayName, provider.auth.currentUser.displayName]);

  const onSubmit = event => {
    event.preventDefault();

    setValidated(false);

    provider.setDisplayName(displayName).catch(setError);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <label>
          Display Name:
          <input
            type="text"
            placeholder="display name"
            value={displayName || ""}
            onChange={e => setDisplayName(e.target.value)}
          />
          <input type="submit" value="Change" disabled={!validated} />
        </label>
        {error && <p>{error.message}</p>}
      </form>
    </div>
  );
}
