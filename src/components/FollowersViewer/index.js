import React, { useState, useEffect, useContext } from "react";
import { FirebaseContext } from "../Firebase";

export default function(params) {
  const firebase = useContext(FirebaseContext);
  const [followers, setFollowers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (params.projectId) {
      firebase
        .getProjectFollowers(params.projectId)
        .then(setFollowers)
        .catch(setError);
    }
  }, [params.projectId, firebase]);

  const renderFollowers = followers.map((follower, key) => (
    <li key={key}>{follower.displayName}</li>
  ));

  return (
    <div>
      <ul>{renderFollowers}</ul>
      {error && <p>{error.message}</p>}
    </div>
  );
}
