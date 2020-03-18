import React, { useContext, useState, useEffect } from "react";
import EditorForm from "./form";
import MessageEditor from "../MessageEditor";
import MessageViewer from "../MessageViewer";
import { ProviderContext } from "../Provider";

export default function(props) {
  const [error, setError] = useState(null);
  const [project, setProject] = useState(null);
  const provider = useContext(ProviderContext);
  const {
    match: {
      params: { id }
    }
  } = props;

  useEffect(() => {
    provider
      .getProject(id)
      .then(setProject)
      .catch(setError);
  }, [id, provider]);

  if (!project) {
    return (
      <div>
        <h1>Project Editor</h1>
        {error && <p>{error.message}</p>}
      </div>
    );
  } else {
    return (
      <div>
        <h1>Project Editor</h1>
        <EditorForm projectId={id} project={project} />
        <MessageViewer projectId={id} />
        <MessageEditor projectId={id} />
        {error && <p>{error.message}</p>}
      </div>
    );
  }
}
