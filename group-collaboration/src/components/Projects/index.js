import React from 'react';
import {projects} from './projects';
import './styles.css';
import {Paper} from '@material-ui/core'

export default function() {
  return (
    <div style={{marginTop: '30px'}}>
      <div>
        Group Collaboration
      </div>
      <Paper className="projects-container">
        <div className="project-grid" style={{backgroundColor: '#888'}}>
          <div className="project-item">
            Name
          </div>
          <div className="project-item">
            Type
          </div>
          <div className="project-item">
            Description
          </div>
        </div>
        {projects.map((project, i) => {
          return (
            <div className="project-grid" style={{backgroundColor: i%2 === 0 ? '#eee' : '#ddd'}}>
              <div className="project-item">
                {project.name}
              </div>
              <div className="project-item">
                {project.type}
              </div>
              <div className="project-item">
                {project.description}
              </div>
            </div>
          )
        })}
      </Paper>
    </div>
  );
};
