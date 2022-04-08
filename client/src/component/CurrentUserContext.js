import { createContext, useState } from "react";
import { checkSessionStorage } from "./CheckSessionStorage";
export const CurrentUserContext = createContext(null);
export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    checkSessionStorage("currentUser", {})
  );

  return (
    <CurrentUserContext.Provider
      value={{
        currentUser,
        setCurrentUser,
      }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};
