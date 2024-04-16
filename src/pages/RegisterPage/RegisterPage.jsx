import { Box } from "@mui/material";

import { useNavigate } from "react-router-dom";
import { RegisterForm } from "../../components";

import fetchFromAPI from "../../services/api";
import { useAuth } from "../../contexts/authContext";
import { useSnackbar } from "../../contexts/snackbarContext";
import { getUserBaseURL } from "../../routes/AppRouter";
import withHelmet from "../../components/withHelmet";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const { openSnackbar } = useSnackbar();

  const onRegister = async (registerData, endPoint = "users") => {
    const userTypeSingular = endPoint.slice(0, endPoint.length - 1);
    try {
      await fetchFromAPI({
        url: `/${endPoint}`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
        data: registerData,
      });

      openSnackbar(`${userTypeSingular}, created successfully.`);
      navigate(getUserBaseURL(auth.user));
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

export default withHelmet(RegisterPage, "Register");
