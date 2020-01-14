import React, {useState, useContext, useEffect} from 'react'
import {SessionContext} from '../Session'
import {FirebaseContext} from '../Firebase'

export default function() {
  const firebase = useContext(FirebaseContext)
  const session = useContext(SessionContext)
  const [displayName, setDisplayName] = useState(session.displayName)
  const [validated, setValidated] = useState(false)

  const [error, setError] = useState("")

  useEffect( () => {
    setDisplayName(session.displayName)
  }, [session.displayName])

  useEffect( () => {
    setValidated(
      displayName &&
      displayName.length > 0 &&
      displayName !== session.displayName)
  }, [displayName, session.displayName])

  // Copies the User displayName field into the adjunct profile document.
  const syncProfile = (user) => {
    const collectionName = process.env.REACT_APP_PROFILES_COLLECTION
    firebase.db.collection(collectionName)
      .doc(user.uid)
      .update({ displayName: user.displayName })
      .catch( error => setError(error) )
  }

  const onSubmit = (event) => {
    event.preventDefault()

    session.updateProfile({ displayName })
      .then( () => setValidated(false), // disables update button
        (error) => setError(error) )
      .then( () => syncProfile(session))
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
