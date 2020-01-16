import React, {useContext, useState, useEffect} from 'react'
import {FirebaseContext} from '../Firebase'

export default function(props) {
  const firebase = useContext(FirebaseContext)

  const { match: { params: { uid } } } = props
  const [profile, setProfile] = useState(null)
  const [error, setError] = useState(null)

  useEffect( () => {
      if(!uid)
        return

      const collectionName = process.env.REACT_APP_PROFILES_COLLECTION
      firebase.db.collection(collectionName)
        .doc(uid)
        .get()
        .then((snapshot) => snapshot.data())
        .then((data) => setProfile(data))
        .catch( err => setError(err) )
  }, [uid, firebase.auth.currentUser, firebase.db])

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
