import React, { useState, useEffect, useContext } from "react";
import { ProviderContext } from "../Provider";
import { SessionContext } from "../Session";

export default function() {
  const provider = useContext(ProviderContext);
  const session = useContext(SessionContext);

  const [user] = useState(session);
  const [description, setDescription] = useState("");
  const [saveable, setSaveable] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    provider
      .getProfile(user.uid)
      .then(({ description }) => setDescription(description))
      .catch(setError);
  }, [user.uid, provider]);

  const onChange = event => {
    setDescription(event.target.value);
    setSaveable(true);
  };

  const onSubmit = event => {
    event.preventDefault();

    setSaveable(false);

    provider
      .updateProfile(user.uid, { description })
      .catch(error => setError(error));
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <textarea
          cols="45"
          rows="10"
          placeholder="about me"
          value={description}
          onChange={e => onChange(e)}
        />
        <br />
        <input type="submit" value="Save" disabled={!saveable} />

        {error && <p>{error.message}</p>}
      </form>
    </div>
  );
}
