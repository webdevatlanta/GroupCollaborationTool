import React, {useContext} from 'react'
import {SessionContext} from '../Session'
import EmailVerifier from './emailVerifier'
import NameEditor from './nameEditor'

export default function() {
  const session = useContext(SessionContext)

  if (session) {
    return (
      <div>
        <h1>Profile</h1>
        { session &&
          <>
            <EmailVerifier/>
            <NameEditor/>
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
