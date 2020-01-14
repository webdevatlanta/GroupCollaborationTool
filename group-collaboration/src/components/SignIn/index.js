import React from 'react'
import SignInForm from './form'
import * as ROUTES from '../../constants/routes'

export default function() {
  return (
  <div>
    <h1>Sign In</h1>
    <SignInForm/>
    <p>If you do not have an account, <a href={ROUTES.SIGN_UP}>create one!</a></p>
  </div>
  )
}
