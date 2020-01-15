import React, {useContext, useState, useEffect} from 'react';
import ProjectsTable from './table'
import './styles.css';
import {FirebaseContext} from '../Firebase'

export default function() {
  const firebase = useContext(FirebaseContext)
  const [projects, setProjects] = useState([])
  const [error, setError] = useState("")

  useEffect( () => {
    if(firebase.auth.currentUser) {
      firebase.getProjects()
        .then( setProjects )
        .catch( setError )
    } else {
      setProjects([]);
    }
  }, [firebase])

  return (
    <div style={{marginTop: '30px'}}>
      <div>
        Group Collaboration
        { error && <p>{error.message}</p> }
      </div>
      <ProjectsTable projects={projects}/>
    </div>
  );
};
