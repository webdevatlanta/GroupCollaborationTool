import React, { useState, useEffect, useContext } from "react";
import { FirebaseContext } from "../Firebase";

export default function(params) {
  const firebase = useContext(FirebaseContext);
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const unsubscribe = firebase.subscribeProjectMessages(
      params.projectId,
      setMessages,
      setError
    );
    return () => unsubscribe();
  }, [params.projectId, firebase]);

  const renderMessages = messages.map((message, key) => (
    <li key={key}>{message.content}</li>
  ));

  return (
    <div>
      <ul>{renderMessages}</ul>
      {error && <p>{error.message}</p>}
    </div>
  );
}
