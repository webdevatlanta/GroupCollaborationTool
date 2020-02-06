import React, {useContext, useState} from 'react'
import {FirebaseContext} from '../Firebase'
import Button from '@material-ui/core/Button'

export default function() {
  const firebase = useContext(FirebaseContext)
  const [verifying, setVerifying] = useState(false)

  const handleVerify = (event) => {
    event.preventDefault();
    setVerifying(true);
    firebase.auth.currentUser.sendEmailVerification({
      url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT,
    });
  }

  if(firebase.auth.currentUser.emailVerified) {
    return (
      <div>
        {firebase.auth.currentUser.email} &#x2714;
      </div>
    )
  } else {
    return (
      <div>
        {firebase.auth.currentUser.email}
        {verifying &&
          <Button color="secondary" >Verifying...</Button>
        }
        {!verifying &&
          <Button color="primary" onClick={handleVerify}>click to verify</Button>
        }
      </div>
    )
  }
}
