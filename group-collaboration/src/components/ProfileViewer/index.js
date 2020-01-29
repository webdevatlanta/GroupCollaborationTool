import React, { useContext, useState, useEffect } from "react";
import { FirebaseContext } from "../Firebase";

export default function(props) {
  const {
    match: {
      params: { uid }
    }
  } = props;

  const firebase = useContext(FirebaseContext);
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    firebase
      .getProfile(uid)
      .then(setProfile)
      .catch(setError);
  }, []);

  return (
    <div>
      <h1>Profile Viewer</h1>
      {profile && (
        <>
          <p>{profile.displayName}</p>
          <p>{profile.description}</p>
        </>
      )}
      {!profile && <p>Nothing here.</p>}
      {error && <p>{error.message}</p>}
    </div>
  );
}
