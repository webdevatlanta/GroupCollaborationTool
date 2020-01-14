import React, {useContext} from 'react'
import {useHistory} from 'react-router-dom'
import Projects from '../Projects'
import {FirebaseContext} from '../Firebase'
import * as ROUTES from '../../constants/routes';

export default function() {
  const firebase = useContext(FirebaseContext)
  const history = useHistory()

  const handleNewProject = (event) => {
    history.push(ROUTES.NEW_PROJECT)
  }

  return (
  <div>
    <h1>WebDevAtlanta: Groopa</h1>
    <p>
      Hello! This is a tool for collaboration. It is a WebDevAtlanta project. <a href="https://github.com/webdevatlanta/GroupCollaborationTool">See the code here</a>.
    </p>
    { !firebase.auth.currentUser &&
      <p> You are not signed in. If you have an account, <a href={ROUTES.SIGN_IN}>log in here</a>. Otherwise, <a href={ROUTES.SIGN_UP}>sign up</a>!</p>
    }
    { firebase.auth.currentUser &&
      <div>
        <button type="button" onClick={(evt) => handleNewProject(evt)}>
          Create New Project
        </button>
      </div>
    }
    { firebase.auth.currentUser &&
      <>
        <Projects/>
      </>
    }
  </div>
  )
}
