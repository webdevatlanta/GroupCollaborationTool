import React from "react";
import { useHistory } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import Projects from "../Projects";

export default function() {
  const history = useHistory();

  const handleNewProject = () => {
    history.push(ROUTES.NEW_PROJECT);
  };

  return (
    <>
      <div>
        <button type="button" onClick={handleNewProject}>
          Create New Project
        </button>
      </div>
      <Projects />
    </>
  );
}
