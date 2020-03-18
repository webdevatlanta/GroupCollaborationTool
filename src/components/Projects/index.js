import React, { useContext, useState, useEffect } from "react";
import ProjectsTable from "./table";
import "./styles.css";
import { ProviderContext } from "../Provider";

export default function() {
  const provider = useContext(ProviderContext);
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    provider
      .getProjects()
      .then(setProjects)
      .catch(setError);
  }, [provider]);

  return (
    <div style={{ marginTop: "30px" }}>
      <div>
        Group Collaboration
        {error && <p>{error.message}</p>}
      </div>
      <ProjectsTable projects={projects} />
    </div>
  );
}
