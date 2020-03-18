import React, { useContext } from "react";
import { ProviderContext } from "../Provider";

export default function() {
  const provider = useContext(ProviderContext);

  return (
    <button type="button" onClick={provider.doSignOut}>
      Sign Out
    </button>
  );
}
