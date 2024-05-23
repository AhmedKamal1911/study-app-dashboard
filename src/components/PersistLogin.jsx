import { Stack } from "@mui/material";
import fetchFromAPI from "../services/api";
import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { isCancel } from "axios";
import { InfinitySpin } from "react-loader-spinner";
import { getUserBaseURL } from "../routes/AppRouter";
import { useAuth } from "../contexts/authContext";
import useLogout from "../hooks/useLogout";

const PersistLogin = () => {
  const { auth, setAuth } = useAuth();
  const logout = useLogout();
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  useEffect(() => {
    let abortController;
    if (auth.token) {
      if (!auth.user) {
        abortController = new AbortController();
        const getCurrentUser = async () => {
          try {
            const response = await fetchFromAPI({
              url: "/auth/user/profile",
              headers: {
                Authorization: `Bearer ${auth.token}`,
              },
              signal: abortController.signal,
            });

            setAuth((prevAuth) => ({ ...prevAuth, user: response.user }));
            setIsLoading(false);
          } catch (e) {
            // maybe it fails because of token expiration
            if (isCancel(e)) return;
            // if so
            logout();
            // navigate the user to the login page to be able to get new access token and remove the old token from local storage and set auth to empty
            setIsLoading(false);

            // network error
            // maybe it fails because of network error that means i cant go to protected pages for example because it requires user.isAdmin ,....
            // if so
            // what to do ?????? ? ?? ?  help me chatgpt : TODO: implement exponential backoff
          }
        };
        getCurrentUser();
      }
    } else {
      setIsLoading(false);
    }
    return () => {
      abortController?.abort("unmount");
    };
  }, [auth, setAuth, logout]);
  if (isLoading)
    return (
      <Stack
        height="100vh"
        alignItems="center"
        justifyContent="center"
        bgcolor="rgb(232, 234, 237)"
      >
        <InfinitySpin color="purple" />
      </Stack>
    );
  const isLoginPage = location.pathname === "/login";
  const isLoggedIn = Boolean(auth.token);
  const isUserLoggedIn = Boolean(auth.user);

  if (!isLoggedIn) {
    if (isLoginPage) {
      return <Outlet />;
    } else {
      return <Navigate to="/login" replace />;
    }
  }

  if (isUserLoggedIn && isLoginPage) {
    return <Navigate to={getUserBaseURL(auth.user)} replace />;
  }

  return <Outlet />;
};

export default PersistLogin;
