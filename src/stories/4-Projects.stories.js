import React from 'react';
import Projects from '../components/Projects';
import { action } from '@storybook/addon-actions';
import { Button } from '@storybook/react/demo';
import { FirebaseContext } from '../components/Firebase';

export default {
  title: 'Button',
  component: Button
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

export const Default = () => (
  <FirebaseContext.Provider value={fakebase}>
    <Projects />
  </FirebaseContext.Provider>
);
