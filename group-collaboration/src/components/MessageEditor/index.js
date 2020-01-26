import React, { useState, useContext } from "react";
import { FirebaseContext } from "../Firebase";
import { SessionContext } from "../Session";

export default function(params) {
  const firebase = useContext(FirebaseContext);
  const session = useContext(SessionContext);
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  const validate = () => content.length > 0;
  const handleSubmit = evt => {
    evt.preventDefault();
    firebase
      .addProjectMessage(params.projectId, {
        authorDisplayName: session.displayName,
        authorUid: session.uid,
        content
      })
      .then(result => setContent(""))
      .catch(error => setError(error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="what's up?"
        value={content}
        onChange={event => setContent(event.currentTarget.value)}
      />
      <input type="submit" value="Update" disabled={!validate()} />

      {error && <p>{error.message}</p>}
    </form>
  );
}
