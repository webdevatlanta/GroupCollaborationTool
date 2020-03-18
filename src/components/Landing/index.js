import React, { useContext } from "react";
import NotLoggedIn from "./NotLoggedIn";
import LoggedIn from "./LoggedIn";
import MessageOfTheDay from "./MessageOfTheDay";
import { SessionContext } from "../Session";

export default function() {
  const session = useContext(SessionContext);

  const ViewFromSession = ({ session }) => {
    switch (session) {
      case undefined: {
        return <></>;
      }
      case null: {
        return <NotLoggedIn />;
      }
      default: {
        return <LoggedIn />;
      }
    }
  };

  return (
    <div>
      <h1>WebDevAtlanta: Groopa</h1>
      <MessageOfTheDay />
      <ViewFromSession session={session} />
    </div>
  );
}
