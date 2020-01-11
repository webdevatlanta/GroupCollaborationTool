import React, {useContext, useState, useEffect} from "react";
import TopBar from './containers/TopBar';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Navigation from './components/Navigation'
import SignUpPage from './components/SignUp'
import SignInPage from './components/SignIn'
import AccountPage from './components/Account'
import * as ROUTES from './constants/routes'
import {FirebaseContext} from './components/Firebase'
import {SessionContext} from './components/Session'

import "./App.css";

export default function() {
  const firebase = useContext(FirebaseContext)

  const [user, setUser] = useState( () => firebase.auth.currentUser )

  useEffect( () => {
    const unsubscribe = firebase.auth.onAuthStateChanged( (user) => setUser(user) )
    return () => unsubscribe()
  })

  return (
    <div>
      <div className="top-bar">
        <TopBar />
      </div>
      <Router>
        <div>
          <SessionContext.Provider value={user}>
            <Navigation/>
          </SessionContext.Provider>
          <hr/>
          <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
          <Route path={ROUTES.SIGN_IN} component={SignInPage} />
          <Route path={ROUTES.ACCOUNT} component={AccountPage} />
        </div>
      </Router>
    </div>
  );
}
