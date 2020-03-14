import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import {Paper} from '@material-ui/core'
import {FirebaseContext} from '../Firebase'
import * as ROUTES from '../../constants/routes'

export default function(props) {
  const firebase = useContext(FirebaseContext)
  const viewerLink = (id) => ROUTES.VIEW_PROJECT.replace(':id', id)
  const editorLink = (id) => ROUTES.EDIT_PROJECT.replace(':id', id)

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
      {/* i added a filter to hide private projects*/}
      {props.projects
      // .filter((project => project.type !=="Private"))
      .map((project, i) => { 
        return (
          <div className="project-grid" style={{backgroundColor: i%2 === 0 ? '#eee' : '#ddd'}} key={i}>
            <div className="project-item">
              {project.name}
            </div>
            
            <div className="project-item">
              {project.type}{/* this is where the private column goes */}


            </div>
            <div className="project-item">
              {project.description}
            </div>
            <div className="project-item">
              <Link to={ viewerLink(project.id) }>details</Link>
              {/* This is where the project owner can be specified */}
              { (project.owner === firebase.auth.currentUser.uid) &&
                <>
                  &nbsp;|&nbsp;
                  <Link to={ editorLink(project.id) }>edit</Link>
                </>
              }
            </div>
          </div>
        )
      })}
    </Paper>
  )
}
