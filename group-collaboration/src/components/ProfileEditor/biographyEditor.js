import React, {useState, useEffect, useContext} from 'react'
import {FirebaseContext} from '../Firebase'
import {SessionContext} from '../Session'

export default function() {
  const firebase = useContext(FirebaseContext)
  const session = useContext(SessionContext)

  const [user] = useState(session.user)
  const [description, setDescription] = useState("")
  const [saveable, setSaveable] = useState(false)
  const [error, setError] = useState("")

  useEffect( () => {
    const collectionName = process.env.REACT_APP_PROFILES_COLLECTION
    firebase.db.collection(collectionName)
      .doc(user.uid)
      .get()
      .then((snapshot) => snapshot.data())
      .then((data) => setDescription(data.description))
      .catch( err => setError(err) )
  }, [user.uid, firebase.db])

  const onChange = (event) => {
    setDescription(event.target.value)
    setSaveable(true)
  }

  const onSubmit = (event) => {
    event.preventDefault();

    setSaveable(false);

    const collectionName = process.env.REACT_APP_PROFILES_COLLECTION
    firebase.db.collection(collectionName)
      .doc(user.uid)
      .update({ description })
      .catch( error => setError(error) )
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <textarea
          cols="45"
          rows="10"
          placeholder="about me"
          value={description}
          onChange={e => onChange(e)}
        />
        <br/>
        <input type="submit" value="Save" disabled={!saveable} />

        {error && <p>{error.message}</p>}
      </form>
    </div>
  )
}
