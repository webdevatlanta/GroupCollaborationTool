import React, { useContext, useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { FirebaseContext } from "../Firebase";
import { SessionContext } from "../Session";
import MessageViewer from "../MessageViewer";
import FollowersViewer from "../FollowersViewer";

export default function(props) {
  const {
    match: {
      params: { id }
    }
  } = props;
  const firebase = useContext(FirebaseContext);
  const session = useContext(SessionContext);
  const [error, setError] = useState(null);
  const [project, setProject] = useState(null);

  useEffect(() => {
    firebase
      .getProject(id)
      .then(setProject)
      .catch(setError);
  }, [id, firebase]);

  const followProject = () => {
    const params = { project_id: id, user_id: session.uid };
    firebase.addProjectFollower(params).catch(setError);
  };

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
        <Box component="h2">
          {project.name}
          &nbsp;
          <Button
            size="small"
            variant="contained"
            color="primary"
            onClick={followProject}
          >
            Follow
          </Button>
        </Box>

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

        <Box color="text.secondary">Followers</Box>
        <Box color="text.primary" mb={3}>
          <FollowersViewer projectId={id} />
        </Box>

        <Box color="error.main">{error && <p>{error.message}</p>}</Box>
      </Typography>
    );
  }
}
