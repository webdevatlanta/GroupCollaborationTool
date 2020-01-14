import React, {useContext} from 'react'
import Projects from '../Projects'
import {SessionContext} from '../Session'
import * as ROUTES from '../../constants/routes';

export default function() {
  const session = useContext(SessionContext)

  return (
  <div>
    <h1>WebDevAtlanta: Groopa</h1>
    <p>
      Hello! This is a tool for collaboration. It is a WebDevAtlanta project. <a href="https://github.com/webdevatlanta/GroupCollaborationTool">See the code here</a>.
    </p>
    { !session &&
      <p> You are not signed in. If you have an account, <a href={ROUTES.SIGN_IN}>log in here</a>. Otherwise, <a href={ROUTES.SIGN_UP}>sign up</a>!</p>
    }
    { session &&
      <>
        <Projects/>
      </>
    }
  </div>
  )
}
