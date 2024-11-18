import { Box } from "@mui/material";
import fetchFromAPI from "../../services/api";
import { useNavigate } from "react-router-dom";

import { useSnackbar } from "../../contexts/snackbarContext";
import withHelmet from "../../components/withHelmet";
import ResetPasswordVerifyCodeForm from "../../components/ResetPasswordVerifyCodeForm";

const ResetPasswordVerifyCodePage = () => {
  const navigate = useNavigate();
  const { openSnackbar } = useSnackbar();

  const onSubmit = async (resetCode) => {
    try {
      const response = await fetchFromAPI({
        method: "POST",
        url: `/auth/verify-reset-code`,

        data: resetCode,
      });
      console.log(response.data, "response");
      openSnackbar(`You Entered Correct Code`);
      navigate("/reset-password");
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
      <ResetPasswordVerifyCodeForm onSubmit={onSubmit} />
    </Box>
  );
};

export default withHelmet(
  ResetPasswordVerifyCodePage,
  "ResetPasswordVerifyCodePage"
);
