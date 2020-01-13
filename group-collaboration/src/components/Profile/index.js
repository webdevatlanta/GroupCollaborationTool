import React, {useContext} from 'react'
import {useHistory} from 'react-router-dom'
import {SessionContext} from '../Session'
import {FirebaseContext} from '../Firebase'
import EmailVerifier from './emailVerifier'
import NameEditor from './nameEditor'
import Button from '@material-ui/core/Button'
import * as ROUTES from '../../constants/routes';

export default function() {
  const history = useHistory()
  const session = useContext(SessionContext)
  const firebase = useContext(FirebaseContext)

  const handleLogout = () => {
    firebase.doSignOut()
    history.push(ROUTES.LANDING)
  }

  if (session) {
    return (
      <div>
        <h1>Profile</h1>
        { session &&
          <>
            <EmailVerifier/>
            <NameEditor/>
            <br/>
            <Button color="primary" onClick={handleLogout}>
              Click to log out
            </Button>
          </>
        }
      </div>
    )
  } else {
    return (
      <a href="/signin">Please sign in.</a>
    )
  }
}
