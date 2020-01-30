import React, { useContext, useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { FirebaseContext } from "../Firebase";
import MessageViewer from "../MessageViewer";

export default function(props) {
  const [error, setError] = useState(null);
  const [project, setProject] = useState(null);
  const firebase = useContext(FirebaseContext);
  const {
    match: {
      params: { id }
    }
  } = props;

  useEffect(() => {
    firebase
      .getProject(id)
      .then(setProject)
      .catch(setError);
  }, [id, firebase]);

  if (id === "new") {
    return <></>;
  }

  if (!project) {
    return (
      <div>
        <h1>Project Viewer</h1>
        {error && <p>{error.message}</p>}
      </div>
    );
  } else {
    return (
      <Typography component="div">
        <Box component="h1">Project Viewer</Box>
        <Box component="h2">{project.name}</Box>

        <Box color="text.secondary">Project Type:</Box>
        <Box color="text.primary" mb={3}>
          {project.type}
        </Box>

        <Box color="text.secondary">Description:</Box>
        <Box color="text.primary" mb={3}>
          {project.description}
        </Box>

        <Box color="text.secondary">Repository Link:</Box>
        <Box color="text.primary" mb={3}>
          {project.repoLink || "\u2014"}
        </Box>

        <Box color="text.secondary">Messages</Box>
        <Box color="text.primary" mb={3}>
          <MessageViewer projectId={id} />
        </Box>

        <Box color="error.main">{error && <p>{error.message}</p>}</Box>
      </Typography>
    );
  }
}
