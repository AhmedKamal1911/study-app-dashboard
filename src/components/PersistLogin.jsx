import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/authContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import fetchFromAPI from "../utils/constans/fetchFromApi";
import { Stack, Typography } from "@mui/material";
import { InfinitySpin } from "react-loader-spinner";
import { isCancel } from "axios";

const PersistLogin = () => {
  // TODO: persist login
  const { auth, setAuth } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  useEffect(() => {
    let abortController;
    if (auth.token) {
      //TODO: fetch the user info and update auth user because i want the isAdmin state and isInstructor State
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
            console.log({ response });
            setAuth((prevAuth) => ({ ...prevAuth, user: response.user }));
            setIsLoading(false);
          } catch (e) {
            console.log(e);
            // maybe it fails because of token expiration
            if (isCancel(e)) return;
            if (e.request.status === 401) {
              // if so
              localStorage.removeItem("token");
              // navigate the user to the login page to be able to get new access token and remove the old token from local storage and set auth to empty
              setAuth({ user: null, token: null });
              setIsLoading(false);
              return;
            }
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
  }, [auth, setAuth]);
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

  if (!auth.token) {
    if (location.pathname === "/login") return <Outlet />;
    return (
      <Navigate
        to="/login"
        replace
        state={{
          to: location,
        }}
      />
    );
  }
  // make user go to courses page if he is student or instructor
  if (auth.user && location.pathname === "/login") {
    // there is token and user and you are on /login
    return <Navigate to="/" replace />;
  }
  // there is user and token
  // there is user and token and location.pathname not /login
  //
  return <Outlet />;
};

export default PersistLogin;
