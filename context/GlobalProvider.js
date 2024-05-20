import React, { createContext, useContext, useEffect, useState } from "react";

import { getCurrentUser } from "../lib/appwrite";

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userLogin, setUserLogin] = useState(null);
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");

  useEffect(() => {
    getCurrentUser()
      .then((res) => {
        if (res) {
          setIsLogged(true);
          setUser(res);
        } else {
          setIsLogged(false);
          setUser(null);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        isLogged,
        setIsLogged,
        user,
        setUser,
        loading,
        userLogin,
        setUserLogin,
        token,
        setToken,
        userId,
        setUserId,
        passwordLogin,
        setPasswordLogin,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
