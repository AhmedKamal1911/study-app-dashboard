import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  const auth = useContext(AuthContext);
  if (!auth) throw new Error("cannot use context without provider ");
  return auth;
};

export default AuthProvider;
