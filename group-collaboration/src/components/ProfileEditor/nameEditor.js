import React, {useState, useContext, useEffect} from 'react'
import {FirebaseContext} from '../Firebase'

export default function() {
  const firebase = useContext(FirebaseContext)
  const [displayName, setDisplayName] = useState(firebase.auth.currentUser.displayName)
  const [validated, setValidated] = useState(false)

  const [error, setError] = useState("")

  useEffect( () => {
    setDisplayName(firebase.auth.currentUser.displayName)
  }, [firebase.auth.currentUser.displayName])

  useEffect( () => {
    setValidated(
      displayName &&
      displayName.length > 0 &&
      displayName !== firebase.auth.currentUser.displayName)
  }, [displayName, firebase.auth.currentUser.displayName])

  // Copies the User displayName field into the adjunct profile document.
  const syncProfile = (user) => {
    firebase
      .updateProfile(user.uid, {displayName: user.displayName})
      .catch(setError)
  }

  const onSubmit = (event) => {
    event.preventDefault()

    setValidated(false)

    firebase.auth.currentUser.updateProfile({ displayName })
      .then(() => syncProfile(firebase.auth.currentUser))
      .catch(setError)
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <label>
          Display Name:
          <input
            type="text"
            placeholder="display name"
            value={displayName || ""}
            onChange={e => setDisplayName(e.target.value)}
          />
          <input type="submit" value="Change" disabled={!validated} />
        </label>
        {error && <p>{error.message}</p>}
      </form>
    </div>
  )
}
