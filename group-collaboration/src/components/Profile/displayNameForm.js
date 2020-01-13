import React, {useState, useContext, useEffect} from 'react'
import {SessionContext} from '../Session'

export default function() {
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

  const onSubmit = (event) => {
    event.preventDefault()

    session.updateProfile({ displayName })
      .then(function() {
        setValidated(false) // disables update button
      }, function(error) {
        setError(error)
      });
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
