import { useContext, useState } from "react";
import React from "react";
const UserContext = React.createContext({
    userDetails: null,
    userLoggedIn: false,
    setUserLoggedIn: () => {},
    setUserDetails: () => {},
  });

export function UserProvider({ children }) {
  const [userDetails, setUserDetails] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const value = {
    userDetails,
    userLoggedIn,
    setUserLoggedIn,
    setUserDetails
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

export function useGetUserDetails() {
  return useContext(UserContext);
}
