import React, { useState, useEffect, useContext } from "react";
import { ProviderContext } from "../Provider";

export default function(params) {
  const provider = useContext(ProviderContext);
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const unsubscribe = provider.subscribeProjectMessages(
      params.projectId,
      setMessages,
      setError
    );
    return () => unsubscribe();
  }, [params.projectId, provider]);

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
