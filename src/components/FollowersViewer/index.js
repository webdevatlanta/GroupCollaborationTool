import React, { useState, useEffect, useContext } from "react";
import { ProviderContext } from "../Provider";

export default function(params) {
  const provider = useContext(ProviderContext);
  const [followers, setFollowers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (params.projectId) {
      provider
        .getProjectFollowers(params.projectId)
        .then(setFollowers)
        .catch(setError);
    }
  }, [params.projectId, provider]);

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
