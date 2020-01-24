import SessionContext from "./context";

export default function toSession(user) {
  if (user) {
    let { displayName, email, uid } = user;
    return { displayName, email, uid };
  } else {
    return null;
  }
}

export { SessionContext };
