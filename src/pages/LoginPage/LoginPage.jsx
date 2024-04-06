import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import { LoginForm } from "../../components";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import fetchFromAPI from "../../utils/constans/fetchFromApi";
import { getUserBaseURL } from "../../App";
import { useSnackbar } from "../../contexts/snackbarContext";

const LoginPage = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { openSnackbar } = useSnackbar();

  const onLogin = async (loginCredentials, loginType) => {
    try {
      console.log({ loginCredentials });
      const { user, token } = await fetchFromAPI({
        method: "POST",
        url: `/auth/${loginType}/signin`,
        data: loginCredentials,
      });

      setAuth({ user, token });
      localStorage.setItem("token", token);
      openSnackbar(`Logged in successfully, welcome back ${user.fullName}`);
      navigate(location.state?.from.pathname || getUserBaseURL(user));
    } catch (e) {
      openSnackbar(e.response.data.message, "error");
      console.log({ loginError: e });
    }
  };
  return (
    <Box
      bgcolor="background.default"
      sx={{
        height: "100vh",
        px: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <LoginForm onLogin={onLogin} />
    </Box>
  );
};

export default LoginPage;
