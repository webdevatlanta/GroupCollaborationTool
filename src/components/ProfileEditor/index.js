import React, {useContext, useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import {FirebaseContext} from '../Firebase'
import EmailVerifier from './emailVerifier'
import NameEditor from './nameEditor'
import BiographyEditor from './biographyEditor'
import Button from '@material-ui/core/Button'
import * as ROUTES from '../../constants/routes';

export default function() {
  const history = useHistory()
  const firebase = useContext(FirebaseContext)
  const [viewerLink, setViewerLink] = useState("")

  useEffect( () => {
    if (firebase.auth.currentUser) {
      const link = ROUTES.VIEW_PROFILE.replace(":uid", firebase.auth.currentUser.uid)
      setViewerLink(link)
    } else {
      setViewerLink(null)
    }
  }, [firebase.auth.currentUser])

  const handleLogout = () => {
    firebase.doSignOut()
    history.push(ROUTES.LANDING)
  }

  if (firebase.auth.currentUser) {
    return (
      <div>
        <h1>Profile</h1>
        { firebase.auth.currentUser &&
          <>
            <EmailVerifier/>
            <NameEditor/>
            <BiographyEditor/>
            <a href={viewerLink}>View this profile</a>
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
