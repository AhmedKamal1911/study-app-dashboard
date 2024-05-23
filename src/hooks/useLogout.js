import { useCallback } from "react";
import { useAuth } from "../contexts/authContext";

const useLogout = () => {
  const { setAuth } = useAuth();
  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setAuth({ token: null, user: null });
  }, [setAuth]);
  return logout;
};

export default useLogout;
