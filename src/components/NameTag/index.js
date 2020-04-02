import React, { useContext } from "react";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import { SessionContext } from "../Session";
import * as ROUTES from "../../constants/routes";

export default function() {
  const history = useHistory();
  const session = useContext(SessionContext);

  const handleSignIn = event => {
    history.push(ROUTES.SIGN_IN);
  };

  const openProfile = event => {
    history.push(ROUTES.EDIT_PROFILE);
  };

  switch (session) {
    case undefined: {
      return <></>;
    }
    case null: {
      return (
        <Button color="inherit" onClick={handleSignIn}>
          Sign In
        </Button>
      );
    }
    default: {
      const name = session.displayName ? session.displayName : session.email;
      return (
        <Button color="inherit" onClick={openProfile}>
          {name}
        </Button>
      );
    }
  }
}
