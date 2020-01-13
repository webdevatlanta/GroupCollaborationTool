import React, {useContext, useState} from 'react'
import {SessionContext} from '../Session'

export default function() {
  const session = useContext(SessionContext)
  const [editing, setEditing] = useState(false)

  const hasVerifiedEmail = () => session.emailVerified
  const hasDisplayName = () => session.displayName !== ""


  const renderEditor = (
    <h1>Editing Profile</h1>
  )

  const renderViewer = (
    <div>
      <h1>Profile</h1>
      { session &&
        <>
          <p>Email: {session.email}</p>
          <p>Email Verified: {hasVerifiedEmail() ? "yes" : "no"}</p>
          <p>Display name: {hasDisplayName() ? "(not set)" : session.displayName}</p>
        </>
      }
    </div>
  )

  const renderMode = editing ? renderEditor : renderViewer;

  return (
    {renderMode}
  )
}
