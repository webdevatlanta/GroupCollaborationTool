import { useState, useEffect } from "react";

function useAuthUser(provider) {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const unlisten = provider.auth.onAuthStateChanged(user => {
      user ? setUser(user) : setUser(null);
    });
    return () => unlisten();
  });

  return user;
}

export { useAuthUser };
