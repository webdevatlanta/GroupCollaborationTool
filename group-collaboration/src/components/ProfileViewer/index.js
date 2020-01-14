import React, {useContext, useState, useEffect} from 'react'
import {FirebaseContext} from '../Firebase'
import {SessionContext} from '../Session'

export default function(props) {
  const firebase = useContext(FirebaseContext)
  const session = useContext(SessionContext)
  const { match: { params: { uid } } } = props
  const [profile, setProfile] = useState(null)
  const [error, setError] = useState(null)

  useEffect( () => {
    if (session) {
      const collectionName = process.env.REACT_APP_PROFILES_COLLECTION
      firebase.db.collection(collectionName)
        .doc(uid)
        .get()
        .then((snapshot) => snapshot.data())
        .then((data) => setProfile(data))
        .catch( err => setError(err) )
    } else {
      setProfile(null)
    }
  }, [uid, session, firebase.db])

  if (!session) {
    return (
      <p>You need to be logged in to see this content.</p>
    )
  }

  return (
    <div>
      <h1>Profile Viewer</h1>
      { profile &&
        <>
          <p>{profile.displayName}</p>
          <p>
            {profile.description}
          </p>
        </>
      }
      { !profile &&
        <p>
          Nothing here.
        </p>
      }
      { error && <p>{error.message}</p> }
    </div>
  )
}
