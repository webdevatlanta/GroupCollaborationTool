import React, {useContext, useState, useEffect} from 'react'
import {FirebaseContext} from '../Firebase'

export default function(props) {
  const [error, setError] = useState(null)
  const [project, setProject] = useState(null)
  const firebase = useContext(FirebaseContext)
  const { match: { params: { id } } } = props

  useEffect( () => {
    firebase.getProject(id)
      .then( setProject )
      .catch( setError )
  }, [id, firebase])

  if (!project) {
    return (
      <div>
        <h1>Project Viewer</h1>
        { error && <p>{error.message}</p> }
      </div>
    )
  } else {
    return (
      <div>
        <h1>Project Viewer</h1>
        <h1>{project.name}</h1>
        <p>{project.type}</p>
        <p>{project.description}</p>
        { error && <p>{error.message}</p> }
      </div>
    )
  }
}
