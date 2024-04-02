import { Box } from "@mui/material";
import React from "react";
import { RegisterForm } from "../../components";
import { wait } from "@testing-library/user-event/dist/utils";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";

const RegisterPage = () => {
  const location = useLocation();
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const onRegister = async (registerData) => {
    try {
      console.log({ registerData });
      // TODO: login request here + storing localStorage token
      await wait(2000);
      // FIXME: This code is redundant (login-form), make it more reusable
      setAuth({
        user: { name: "dasdasd", id: 41, isAdmin: true },
        token: "dasdasda ads das das as121 2 1",
      });
      // TODO: close Modal and show Alert of success
      navigate(location.state?.to.pathname || "/");
    } catch (e) {
      // TODO: show Alert of failure
      console.log({ loginError: e });
    }
  };
  return (
    <Box
      bgcolor="#f7f7f7"
      sx={{
        height: "100vh",
        px: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <RegisterForm onRegister={onRegister} />
    </Box>
  );
};

export default RegisterPage;
