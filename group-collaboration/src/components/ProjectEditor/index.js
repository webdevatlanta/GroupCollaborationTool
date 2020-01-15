import React, {useContext, useState, useEffect} from 'react'
import EditorForm from './form'
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
      <h1>Project Editor</h1>
      { error && <p>{error.message}</p> }
    </div>
  )
  } else {
    return (
      <div>
        <h1>Project Editor</h1>
        <EditorForm projectId={id} project={project} />
        { error && <p>{error.message}</p> }
      </div>
    )
  }
}
