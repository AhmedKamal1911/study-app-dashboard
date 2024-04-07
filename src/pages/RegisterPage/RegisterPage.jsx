import { Box } from "@mui/material";
import React from "react";
import { RegisterForm } from "../../components";

import { useNavigate } from "react-router-dom";

import fetchFromAPI from "../../utils/constans/fetchFromApi";
import { useAuth } from "../../contexts/authContext";
import { useSnackbar } from "../../contexts/snackbarContext";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const { openSnackbar } = useSnackbar();
  console.log(auth.token, "**************Token");
  const onRegister = async (registerData, endPoint = "users") => {
    const userTypeSingular = endPoint.slice(0, endPoint.length - 1);
    try {
      console.log({ registerData });
      console.log([...registerData.entries()]);
      const response = await fetchFromAPI({
        url: `/${endPoint}`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
        data: registerData,
      });
      console.log({ registerResponse: response });
      openSnackbar(`${userTypeSingular}, created successfully.`);
      navigate("/");
    } catch (e) {
      openSnackbar(`Failed to create ${userTypeSingular}`, "error");
    }
  };
  return (
    <Box
      bgcolor="background.default"
      sx={{
        minHeight: "100vh",
        p: 2,
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
