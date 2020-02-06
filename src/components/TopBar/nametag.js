import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { SessionContext } from "../Session";
import * as ROUTES from "../../constants/routes";

export default function() {
  const session = useContext(SessionContext);
  const history = useHistory();
  const [name, setName] = useState("");

  useEffect(() => {
    if (session) {
      if (session.displayName) {
        setName(session.displayName);
      } else {
        setName(session.email);
      }
    }
  }, [session]);

  const openProfile = event => {
    history.push(ROUTES.EDIT_PROFILE);
  };

  return (
    <Button color="inherit" onClick={openProfile}>
      {name}
    </Button>
  );
}
