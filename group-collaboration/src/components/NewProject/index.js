import React from 'react'
import NewProjectForm from './form'
import {FirebaseContext} from '../Firebase'

export default function() {
  return(
    <>
      <h1>Create New Project</h1>
      <FirebaseContext.Consumer>
        {firebase => <NewProjectForm firebase={firebase} />}
      </FirebaseContext.Consumer>
    </>
  )
}
