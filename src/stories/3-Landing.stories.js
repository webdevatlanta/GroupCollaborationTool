import React, { useContext } from 'react';
import { storiesOf } from '@storybook/react';
import { useHistory, MemoryRouter } from 'react-router-dom';
import Landing from '../components/Landing';
import Projects from '../components/Projects';
import { SessionContext } from '../components/Session';
import { FirebaseContext } from '../components/Firebase';
import * as ROUTES from '../constants/routes';

export default {
  title: 'Landing',
  component: Landing
};

let fakeSession = false;
let userData = {
  displayName: 'User',
  email: 'user@domain.com',
  uid: '0'
};

const fakebase = {
  auth: { currentUser: { uid: '123' } },
  getProjects: () =>
    new Promise((resolve, reject) => {
      projectsPromise.resolve = resolve;
      projectsPromise.reject = reject;
    })
};

storiesOf('Landing', module)
  .addDecorator(story => (
    <FirebaseContext value={fakebase}>
      <SessionContext.Provider value={userData}>
        <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>
      </SessionContext.Provider>
    </FirebaseContext>
  ))
  .add('Not Signed In', () => {
    return <Landing />;
  })
  .add('Signed In', () => {
    fakeSession = userData;
    return <Landing />;
  });
