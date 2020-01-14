import React, {useContext, useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import Button from '@material-ui/core/Button'
import {FirebaseContext} from '../Firebase'
import * as ROUTES from '../../constants/routes'

export default function() {
  const firebase = useContext(FirebaseContext)
  const history = useHistory();
  const [name, setName] = useState("")

  useEffect( () => {
    if (firebase.auth.currentUser.displayName) {
      setName(firebase.auth.currentUser.displayName)
    } else {
      setName(firebase.auth.currentUser.email)
    }
  }, [firebase.auth.currentUser])

  const openProfile = event => {
    history.push(ROUTES.EDIT_PROFILE)
  }

  return (
    <Button color="inherit" onClick={openProfile}>{name}</Button>
  )
}
