import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Paper } from "@material-ui/core";
import { ProviderContext } from "../Provider";
import * as ROUTES from "../../constants/routes";

export default function(props) {
  const provider = useContext(ProviderContext);
  const viewerLink = id => ROUTES.VIEW_PROJECT.replace(":id", id);
  const editorLink = id => ROUTES.EDIT_PROJECT.replace(":id", id);
  return (
    <Paper className="projects-container">
      <div className="project-grid" style={{ backgroundColor: "#888" }}>
        <div className="project-item">Name</div>
        <div className="project-item">Type</div>
        <div className="project-item">Description</div>
        <div className="project-item">Actions</div>
      </div>
      {/*I added a filter to hide private projects unless it belongs to the current user*/}
      {props.projects
        .filter(
          project =>
            project.type === "Public" ||
            (project.owner === provider.auth.currentUser.uid &&
              project.type === "Private")
        )
        .map((project, i) => {
          return (
            <div
              className="project-grid"
              style={{ backgroundColor: i % 2 === 0 ? "#eee" : "#ddd" }}
              key={i}
            >
              <div className="project-item">{project.name}</div>

              <div className="project-item">{project.type}</div>
              <div className="project-item">{project.description}</div>
              <div className="project-item">
                <Link to={viewerLink(project.id)}>details</Link>
                {project.owner === provider.auth.currentUser.uid && (
                  <>
                    &nbsp;|&nbsp;
                    <Link to={editorLink(project.id)}>edit</Link>
                  </>
                )}
              </div>
            </div>
          );
        })}
    </Paper>
  );
}
