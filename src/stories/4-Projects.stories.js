import React from 'react';
import Projects from '../components/Projects';
import { useHistory, MemoryRouter } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { FirebaseContext } from '../components/Firebase';
import { SessionContext } from '../components/Session';

const projectsPromise = {
  resolve: undefined,
  reject: undefined
};

const fakebase = {
  auth: {
    currentUser: {
      uid: 1,
      displayName: 'hi',
      email: 'hi@example.com'
    }
  }
};

let userData = {
  displayName: 'User',
  email: 'user@domain.com',
  uid: '0'
};

storiesOf('Projects', module)
  .addDecorator(story => (
    <FirebaseContext value={fakebase}>
      <SessionContext.Provider value={userData}>
        <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>
      </SessionContext.Provider>
    </FirebaseContext>
  ))
  .add('Default', () => {
    return <Projects />;
  });
