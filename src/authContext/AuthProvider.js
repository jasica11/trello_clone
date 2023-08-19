import React, { useState, useEffect, createContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const storedApiKey = localStorage.getItem("apiKey");
    const storedApiToken = localStorage.getItem("apiToken");
    const storedOrgId = sessionStorage.getItem("orgId");

    if (storedApiKey && storedApiToken && storedOrgId) {
      setIsAuthorized(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthorized, setIsAuthorized }}>
      {children}
    </AuthContext.Provider>
  );
};
