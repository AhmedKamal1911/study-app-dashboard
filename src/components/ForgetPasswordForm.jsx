import { Box, Button, Stack, Typography } from "@mui/material";

import { CustomTextField, FieldError } from ".";
import { Link } from "react-router-dom";
import { useFormik } from "formik";

import { getFieldError } from "../utils";
import ForgetPasswordFormSchema from "../validations/ForgetPasswordFormSchema";
// React Component
const ForgetPasswordForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: ForgetPasswordFormSchema,
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
          Forgot your password ?
        </Typography>
      </Box>
      <form onSubmit={formik.handleSubmit} autoComplete="off">
        <Stack gap={4} mb={2}>
          <div>
            <CustomTextField
              value={formik.values.email}
              onChange={formik.handleChange}
              name="email"
              id="email"
              label="Enter Email Address"
              variant="outlined"
              type="email"
              fullWidth
              placeholder="example@gmail.com"
              sx={{
                "& .css-p51h6s-MuiInputBase-input-MuiOutlinedInput-input:-webkit-autofill":
                  {
                    boxShadow: "none",
                    WebkitTextFillColor: "black",
                    caretColor: "#3a39d0",
                  },
              }}
            />
            <FieldError errorText={getFieldError(formik, "email")} />
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
            {formik.isSubmitting ? "Sending Message" : "Send Message"}
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
export default ForgetPasswordForm;
