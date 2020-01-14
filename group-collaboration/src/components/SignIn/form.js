import React, {useState, useContext} from 'react'
import {useHistory} from 'react-router-dom'
import * as ROUTES from '../../constants/routes';
import {FirebaseContext} from '../Firebase'

export default function() {
  const history = useHistory()
  const firebase = useContext(FirebaseContext)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const onSubmit = (event) => {
    event.preventDefault()

    firebase
      .doSignInWithEmailAndPassword(email, password)
      .then( user => history.push(ROUTES.LANDING) )
      .catch( error => setError(error) )
  }

  const validate = () => {
    return (
      email.length > 0 &&
      password.length > 0
    )
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          autoFocus
          type="email"
          placeholder="email address"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <input type="submit" value="Sign In" disabled={!validate()} />

        {error && <p>{error.message}</p>}
      </form>
    </div>
  )
}
