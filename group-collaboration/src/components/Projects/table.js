import React from 'react'
import {Paper} from '@material-ui/core'

export default function(props) {
  return (
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
      {props.projects.map((project, i) => {
        return (
          <div className="project-grid" style={{backgroundColor: i%2 === 0 ? '#eee' : '#ddd'}} key={i}>
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
  )
}
