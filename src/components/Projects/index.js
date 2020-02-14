import React, { useContext, useState, useEffect } from 'react';
import ProjectsTable from './table';
import './styles.css';
import { FirebaseContext } from '../Firebase';

export default function() {
  const firebase = useContext(FirebaseContext);
  console.log(firebase);
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    firebase
      .getProjects()
      .then(setProjects)
      .catch(setError);
  }, [firebase]);

  return (
    <div style={{ marginTop: '30px' }}>
      <div>
        Group Collaboration
        {error && <p>{error.message}</p>}
      </div>
      <ProjectsTable projects={projects} />
    </div>
  );
}
