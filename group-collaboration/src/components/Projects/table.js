import React from 'react'
import {Link} from 'react-router-dom'
import {Paper} from '@material-ui/core'
import * as ROUTES from '../../constants/routes'

export default function(props) {
  const projectLink = (id) => ROUTES.VIEW_PROJECT.replace(':id', id)

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
        <div className="project-item">
          Actions
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
            <div className="project-item">
              <Link to={ projectLink(project.id) }>details</Link>
            </div>
          </div>
        )
      })}
    </Paper>
  )
}
