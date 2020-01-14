import React, {useContext, useState} from 'react'
import {SessionContext} from '../Session'
import Button from '@material-ui/core/Button'

export default function() {
  const session = useContext(SessionContext)
  const [verifying, setVerifying] = useState(false)

  const handleVerify = (event) => {
    event.preventDefault();
    setVerifying(true);
    session.sendEmailVerification({
      url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT,
    });
  }

  if(session.emailVerified) {
    return (
      <div>
        {session.email} &#x2714;
      </div>
    )
  } else {
    return (
      <div>
        {session.email}
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
