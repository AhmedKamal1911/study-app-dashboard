import { Box } from "@mui/material";
import React from "react";
import { LoginForm } from "../../components";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import { wait } from "@testing-library/user-event/dist/utils";

const LoginPage = () => {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const onLogin = async (loginCredentials) => {
    try {
      console.log({ loginCredentials });
      // TODO: login request here + storing localStorage token
      await wait(2000);
      setAuth({
        user: { name: "dasdasd", id: 41, isAdmin: true },
        token: "dasdasda ads das das as121 2 1",
      });
      navigate(location.state?.to.pathname || "/");
    } catch (e) {
      console.log({ loginError: e });
    }
  };
  if (auth.user) {
    return <Navigate to="/" replace />;
  }
  return (
    <Box
      bgcolor="rgb(245,245,249)"
      sx={{
        height: "100vh",
        px: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <LoginForm onLogin={onLogin} />
    </Box>
  );
};

export default LoginPage;
