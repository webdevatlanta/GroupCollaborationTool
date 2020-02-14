import React from 'react';
import SignIn from '../components/SignIn';
import { MemoryRouter } from 'react-router-dom';
import { storiesOf } from '@storybook/react';

storiesOf('Sign In', module)
  .addDecorator(story => (
    <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>
  ))
  .add('Default', () => {
    return <SignIn />;
  });
