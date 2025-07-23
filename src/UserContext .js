// src/UserContext.js
import { createContext, useState } from "react";

// Create the context
export const UserContext = createContext();

// Wrap your app with this provider
export const UserProvider = ({ children }) => {
  // ✅ Load user from localStorage only once (on initial render)
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
