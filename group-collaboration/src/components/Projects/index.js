import React, {useContext, useState, useEffect} from 'react';
import './styles.css';
import {Paper} from '@material-ui/core'
import {FirebaseContext} from '../Firebase'
import {SessionContext} from '../Session'

export default function() {
  const firebase = useContext(FirebaseContext)
  const session = useContext(SessionContext)
  const [projects, setProjects] = useState([])
  const [error, setError] = useState("")

  useEffect( () => {
    if (session) {
      const collectionName = process.env.REACT_APP_PROJECTS_COLLECTION
      firebase.db.collection(collectionName)
        .get()
        .then( querySnapshot => {
          const data = querySnapshot.docs.map(doc => doc.data());
          setProjects(data);
        })
        .catch( err => setError(err) )
    } else {
      setProjects([]);
    }
  }, [session, firebase.db])

  return (
    <div style={{marginTop: '30px'}}>
      <div>
        Group Collaboration
        { error && <p>{error.message}</p> }
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
    </div>
  );
};
