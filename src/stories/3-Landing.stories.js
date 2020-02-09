import React, { useContext } from 'react';
// import { useHistory } from 'react-router-dom';
import Landing from '../components/Landing';
import Projects from '../components/Projects';
// import { SessionContext } from '../components/Session';
import * as ROUTES from '../constants/routes';

export default {
  title: 'Landing',
  component: Landing
};

export const NotSignedIn = function() {
  // STORYBOOK CONFIG
  const session = false;

  //   const history = useHistory();

  //   const handleNewProject = event => {
  //     history.push(ROUTES.NEW_PROJECT);
  //   };

  return (
    <div>
      <h1>WebDevAtlanta: Groopa</h1>
      <p>
        Hello! This is a tool for collaboration. It is a WebDevAtlanta project.{' '}
        <a href="https://github.com/webdevatlanta/GroupCollaborationTool">
          See the code here
        </a>
        .
      </p>
      {!session && (
        <p>
          {' '}
          You are not signed in. If you have an account,{' '}
          <a href={ROUTES.SIGN_IN}>sign in here</a>. Otherwise,{' '}
          <a href={ROUTES.SIGN_UP}>sign up</a>!
        </p>
      )}
      {session && (
        <div>
          <button type="button" onClick={evt => handleNewProject(evt)}>
            Create New Project
          </button>
        </div>
      )}
      {session && (
        <>
          <Projects />
        </>
      )}
    </div>
  );
};

export const SignedIn = function() {
  // STORYBOOK CONFIG
  const session = true;

  //   const history = useHistory();

  //   const handleNewProject = event => {
  //     history.push(ROUTES.NEW_PROJECT);
  //   };

  return (
    <div>
      <h1>WebDevAtlanta: Groopa</h1>
      <p>
        Hello! This is a tool for collaboration. It is a WebDevAtlanta project.{' '}
        <a href="https://github.com/webdevatlanta/GroupCollaborationTool">
          See the code here
        </a>
        .
      </p>
      {!session && (
        <p>
          {' '}
          You are not signed in. If you have an account,{' '}
          <a href={ROUTES.SIGN_IN}>sign in here</a>. Otherwise,{' '}
          <a href={ROUTES.SIGN_UP}>sign up</a>!
        </p>
      )}
      {session && (
        <div>
          <button type="button" onClick={evt => handleNewProject(evt)}>
            Create New Project
          </button>
        </div>
      )}
      {session && (
        <>
          <Projects storybook />
        </>
      )}
    </div>
  );
};
