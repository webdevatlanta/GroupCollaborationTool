import React from 'react'
import SignUpForm from './form'
import {FirebaseContext} from '../Firebase';

export default function(props) {
  return (
    <div>
      <h1>Sign Up</h1>
      <FirebaseContext.Consumer>
        {firebase => <SignUpForm firebase={firebase} />}
      </FirebaseContext.Consumer>
    </div>
  )
}
