import React, {useContext, useState, useEffect} from "react";
import {BrowserRouter as Router, Route} from 'react-router-dom'
import TopBar from './components/TopBar';
import SignUpPage from './components/SignUp'
import SignInPage from './components/SignIn'
import ProfileViewer from './components/ProfileViewer'
import ProfileEditor from './components/ProfileEditor'
import LandingPage from './components/Landing'
import NewProjectPage from './components/NewProject'
import ProjectViewer from './components/ProjectViewer'
import ProjectEditor from './components/ProjectEditor'
import {SessionContext} from './components/Session'
import {FirebaseContext} from './components/Firebase'
import * as ROUTES from './constants/routes'

import "./App.css";

export default function() {
  const firebase = useContext(FirebaseContext)
  const [session, setSession] = useState({user:firebase.auth.currentUser})

  useEffect(() =>{
    const unlisten = firebase.auth
      .onAuthStateChanged(user => setSession({user}))

    return () => unlisten();
  }, [firebase.auth]);

  return (
    <SessionContext.Provider value={session}>
    <div>
      <Router>
        <div className="top-bar">
          <TopBar />
        </div>
        <div>
          <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
          <Route path={ROUTES.SIGN_IN} component={SignInPage} />
          <Route exact path={ROUTES.EDIT_PROFILE} component={ProfileEditor} />
          <Route path={ROUTES.VIEW_PROFILE} component={ProfileViewer} />
          <Route exact path={ROUTES.NEW_PROJECT} component={NewProjectPage} />
          <Route exact path={ROUTES.VIEW_PROJECT} component={ProjectViewer} />
          <Route exec path={ROUTES.EDIT_PROJECT} component={ProjectEditor} />
          <Route exact path={ROUTES.LANDING} component={LandingPage} />
        </div>
      </Router>
    </div>
    </SessionContext.Provider>
  );
}
