import React, {useContext} from 'react'
import {FirebaseContext} from '../Firebase'

export default function() {
  const firebase = useContext(FirebaseContext)

  return (
    <button type="button" onClick={firebase.doSignOut}>
      Sign Out
    </button>
  )
}
