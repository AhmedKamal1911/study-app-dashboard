import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

const initializeAuthState = () => ({
  token: localStorage.getItem("token") ?? null,
  user: null,
});
const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(initializeAuthState);
  console.log({ fromAuthProvider: auth });
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
