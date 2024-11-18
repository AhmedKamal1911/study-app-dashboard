import { Box } from "@mui/material";
import fetchFromAPI from "../../services/api";
import { useNavigate } from "react-router-dom";

import { useSnackbar } from "../../contexts/snackbarContext";
import withHelmet from "../../components/withHelmet";
import ForgetPasswordForm from "../../components/ForgetPasswordForm";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const { openSnackbar } = useSnackbar();

  const onSubmit = async (data) => {
    try {
      const response = await fetchFromAPI({
        method: "POST",
        url: `/auth/forgot-password?email=${data.email}`,
      });

      openSnackbar(response?.message);
      navigate("/password-verify-code");
    } catch (e) {
      openSnackbar(e.response?.data.message ?? e.message, "error");
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
      <ForgetPasswordForm onSubmit={onSubmit} />
    </Box>
  );
};

export default withHelmet(ForgetPassword, "ForgetPassword");
