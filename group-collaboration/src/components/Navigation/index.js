import React from 'react';
import {SessionContext} from '../Session'
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

export default function(props) {
  return(
    <div>
      <SessionContext.Consumer>
        {session => session && <p>logged in as {session.email}</p>}
      </SessionContext.Consumer>
      <ul>
        <li>
          <Link to={ROUTES.SIGN_IN}>Sign In</Link>
        </li>
        <li>
          <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
        </li>
        <li>
          <Link to={ROUTES.LANDING}>Landing</Link>
        </li>
        <li>
          <Link to={ROUTES.ACCOUNT}>Account</Link>
        </li>
        <li>
          <Link to={ROUTES.ADMIN}>Admin</Link>
        </li>
      </ul>
    </div>
) }
