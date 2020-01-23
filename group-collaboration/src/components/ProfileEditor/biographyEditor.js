import React, {useState, useEffect, useContext} from 'react'
import {FirebaseContext} from '../Firebase'
import {SessionContext} from '../Session'

export default function() {
  const firebase = useContext(FirebaseContext)
  const session = useContext(SessionContext)

  const [user] = useState(session)
  const [description, setDescription] = useState("")
  const [saveable, setSaveable] = useState(false)
  const [error, setError] = useState("")

  useEffect( () => {
    firebase
      .getProfile(user.uid)
      .then(({description}) => setDescription(description))
      .catch(setError)
  }, [user.uid, firebase])

  const onChange = (event) => {
    setDescription(event.target.value)
    setSaveable(true)
  }

  const onSubmit = (event) => {
    event.preventDefault();

    setSaveable(false);

    firebase
      .updateProfile(user.uid, {description})
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
