import React, { createContext, useState, useEffect } from "react";

const TokenContext = createContext();

export const TokenProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("access") || "");

  useEffect(() => {
    if (token) {
      localStorage.setItem("access", token);
    } else {
      localStorage.removeItem("access");
    }
  }, [token]);

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      {children}
    </TokenContext.Provider>
  );
};

export default TokenContext;
