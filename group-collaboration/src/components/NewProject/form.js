import React, { useState, useContext } from "react";
import { FirebaseContext } from "../Firebase";
import { SessionContext } from "../Session";
import { useHistory } from "react-router-dom";
import * as ROUTES from "../../constants/routes";

export default function() {
  const history = useHistory();
  const firebase = useContext(FirebaseContext);
  const session = useContext(SessionContext);
  const [owner] = useState(session.uid);
  const [name, setName] = useState("");
  const [type, setType] = useState("Open Source");
  const [description, setDescription] = useState("");
  const [repoLink, setRepoLink] = useState("");
  const [error, setError] = useState("");

  const validate = () => {
    return name.length > 0 && type.length > 0 && description.length > 0;
  };

  const onSubmit = event => {
    event.preventDefault();

    firebase
      .createProject({ owner, name, type, description, repoLink })
      .then(() => history.push(ROUTES.LANDING))
      .catch(error => setError(error));
  };

  return (
    <div>
      <form className="new-project-form" onSubmit={onSubmit}>
        <div className="flex-row">
          <input
            autoFocus
            type="text"
            placeholder="project name"
            className="project-name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <select
            className="type-select"
            value={type}
            onChange={e => setType(e.target.value)}
          >
            <option value="Open Source">Open Source</option>
            <option value="Private">Private</option>
          </select>
        </div>

        {/* <br /> */}

        <textarea
          cols="45"
          rows="10"
          placeholder="project description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />

        {/* <br /> */}
        <input
          type="text"
          placeholder="repository link"
          value={repoLink}
          onChange={e => setRepoLink(e.target.value)}
        />
        {/* <br /> */}
        <input
          type="submit"
          value="Create"
          className={`new-project-submit ${
            validate() ? "validated" : "disabled"
          }`}
          disabled={!validate()}
        />

        {error && <p>{error.message}</p>}
      </form>
    </div>
  );
}
