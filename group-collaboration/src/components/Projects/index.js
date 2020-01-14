import React, {useContext, useState, useEffect} from 'react';
import './styles.css';
import {Paper} from '@material-ui/core'
import {FirebaseContext} from '../Firebase'
import {SessionContext} from '../Session'

export default function() {
  const firebase = useContext(FirebaseContext)
  const session = useContext(SessionContext)
  // eslint-disable-next-line
  const [projects, setProjects] = useState([])
  const [error, setError] = useState("")

  useEffect( () => {
    if (session) {
      const unsubscribe = firebase.db.collection("projects-test")
      .get()
      .then(querySnapshot => {
        const data = querySnapshot.docs.map(doc => doc.data());
        console.log(data);
        setProjects(data);
      })
      .catch( err => setError(err) )
      return () => unsubscribe()
    } else {
      setProjects([]);
    }
  }, [session, firebase.db])

  const addProject = (owner, name, type, description) => {
    firebase.db.collection("projects-test")
      .add({
        owner: owner.uid,
        name,
        type,
        description
      })
      .then(function() {
        console.log("Document successfully written!");
      })
      .catch( err => setError(err) )
  }

  return (
    <div style={{marginTop: '30px'}}>
      <div>
        Group Collaboration
        <button onClick={ e => addProject(session, "1","2","3")}>add</button> 
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
