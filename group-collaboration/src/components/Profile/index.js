import React, {useContext} from 'react'
import {SessionContext} from '../Session'
import DisplayNameForm from './displayNameForm'

export default function() {
  const session = useContext(SessionContext)

  const hasVerifiedEmail = () => session.emailVerified

  return (
    <div>
      <h1>Profile</h1>
      { session &&
        <>
          <p>Email: {session.email}</p>
          <p>Email Verified: {hasVerifiedEmail() ? "yes" : "no"}</p>
          <DisplayNameForm/>
        </>
      }
    </div>
  )
}
