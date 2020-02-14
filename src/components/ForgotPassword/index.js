import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import ForgotPasswordForm from './form';

export default function() {
  return (
    <div className='signin-container'>
      <div className='form-info-container'>
        <h1>Forgot Password</h1>
        <p>Enter your email and we'll send the instructions.</p>
        <ForgotPasswordForm />
        <p>
          <Link to={ROUTES.SIGN_IN}>Back to sign in</Link>
        </p>
      </div>
    </div>
  );
}
