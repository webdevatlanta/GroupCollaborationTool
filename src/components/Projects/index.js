import React, { useContext, useState, useEffect } from 'react';
import ProjectsTable from './table';
import './styles.css';
import { FirebaseContext } from '../Firebase';

export default function(props) {
  // if (props.storybook) {
  //   const projects = [
  //     {
  //       description: 'This is a public project',
  //       name: 'Example 1',
  //       owner: '0',
  //       type: 'Public',
  //       id: '0'
  //     },
  //     {
  //       description: 'This is a private project',
  //       name: 'Example 2',
  //       owner: '0',
  //       type: 'Private',
  //       id: '0'
  //     }
  //   ];
  //   return (
  //     <div style={{ marginTop: '30px' }}>
  //       <div>Group Collaboration</div>
  //       <ProjectsTable projects={projects} />
  //     </div>
  //   );
  // }

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
