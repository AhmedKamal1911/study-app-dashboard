import { Box } from "@mui/material";
import fetchFromAPI from "../../services/api";
import { LoginForm } from "../../components";
import { useNavigate } from "react-router-dom";
import { getUserBaseURL } from "../../routes/AppRouter";
import { useAuth } from "../../contexts/authContext";
import { useSnackbar } from "../../contexts/snackbarContext";

const LoginPage = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const { openSnackbar } = useSnackbar();

  const onLogin = async (
    loginCredentials,
    loginUserType = "user",
    rememberMe
  ) => {
    try {
      const { user, token } = await fetchFromAPI({
        method: "POST",
        url: `/auth/${loginUserType}/signin`,
        params: {
          rememberMe,
        },
        data: loginCredentials,
      });
      setAuth({ user, token });
      localStorage.setItem("token", token);
      openSnackbar(`Logged in successfully, welcome back ${user.fullName}`);
      navigate(getUserBaseURL(user));
    } catch (e) {
      openSnackbar(e.response.data.message, "error");
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
