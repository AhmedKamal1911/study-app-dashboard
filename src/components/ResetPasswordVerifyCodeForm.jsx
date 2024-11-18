import { Box, Button, Stack, Typography } from "@mui/material";

import { CustomTextField, FieldError } from ".";
import { Link } from "react-router-dom";
import { useFormik } from "formik";

import { getFieldError } from "../utils";
import verifyCodeFormSchema from "../validations/verifyCodeFormSchema";

// React Component
const ResetPasswordVerifyCodeForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      verifyCode: "",
    },
    validationSchema: verifyCodeFormSchema,
    // Onlogin Request
    onSubmit: async (values) => {
      await onSubmit(values);
      formik.setSubmitting(false);
    },
  });
  return (
    <Box
      bgcolor="background.paper"
      boxShadow="0 0 4px 1px #0000001c"
      p={3}
      borderRadius={2}
      width="100%"
      maxWidth={450}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        gap={1}
        mb={2}
      >
        <Typography variant="h5" fontWeight="bold" color="primary.main">
          HiStudy
        </Typography>
      </Stack>
      <Box color="black" mb={2}>
        <Typography fontWeight="bold" fontSize={24} color="dark">
          Verify Code
        </Typography>
      </Box>
      <form onSubmit={formik.handleSubmit} autoComplete="off">
        <Stack gap={4} mb={2}>
          <div>
            <CustomTextField
              value={formik.values.verifyCode}
              onChange={formik.handleChange}
              name="verifyCode"
              id="verifyCode"
              label="Enter Verify Code"
              variant="outlined"
              type="text"
              fullWidth
              placeholder="verifyCode"
              sx={{
                "& .css-p51h6s-MuiInputBase-input-MuiOutlinedInput-input:-webkit-autofill":
                  {
                    boxShadow: "none",
                    WebkitTextFillColor: "black",
                    caretColor: "#3a39d0",
                  },
              }}
            />
            <FieldError errorText={getFieldError(formik, "verifyCode")} />
          </div>
        </Stack>

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Button
            variant="contained"
            type="submit"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? "Verifing" : "Verify"}
          </Button>
          {/* TODO: implement forget password functionalitiy + page is possible */}
          <Link
            to="/Login"
            style={{ color: "rgb(105, 108, 255)", textDecoration: "underline" }}
          >
            Back to Login
          </Link>
        </Stack>
      </form>
    </Box>
  );
};
export default ResetPasswordVerifyCodeForm;
