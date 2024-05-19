import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import { useRef, useState } from "react";
import {
  PasswordField,
  CustomTextField,
  CustomSelectField,
  FieldError,
} from ".";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import loginFormSchema from "../validations/loginFormSchema";
import { getFieldError } from "../utils";
// React Component
const LoginForm = ({ onLogin }) => {
  const [userType, setUserType] = useState("user");
  const rememberMeCheckRef = useRef(null);
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: loginFormSchema,
    // Onlogin Request
    onSubmit: async (values) => {
      await onLogin(values, userType, rememberMeCheckRef.current.checked);
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
        py={2}
      >
        <Typography variant="h5" fontWeight="bold" color="primary.main">
          HiStudy
        </Typography>
      </Stack>
      <Box color="black" mb={2}>
        <Typography fontWeight="bold" fontSize={24} color="dark">
          Welcome to HiStudy 🚀
        </Typography>
        <Typography color="lightDark">
          Please Sign-in to your account and start the adventure
        </Typography>
      </Box>
      <form onSubmit={formik.handleSubmit} autoComplete="off">
        <Stack gap={4} mb={2}>
          <div>
            <CustomTextField
              value={formik.values.username}
              onChange={formik.handleChange}
              name="username"
              id="username"
              label="username"
              variant="outlined"
              type="username"
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
            <FieldError errorText={getFieldError(formik, "username")} />
          </div>

          <div>
            <PasswordField
              fullWidth
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              disablePasswordIcon
            />
            <FieldError errorText={getFieldError(formik, "password")} />
          </div>
        </Stack>
        <div style={{ marginBottom: "10px" }}>
          <CustomSelectField
            label="Select User Type"
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
            controlled
          >
            <MenuItem value="user">User</MenuItem>
            <MenuItem value="instructor">Instructor</MenuItem>
          </CustomSelectField>
        </div>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <FormControlLabel
            sx={{ "& .MuiButtonBase-root": { color: "#9d95d9" } }}
            control={<Checkbox inputRef={rememberMeCheckRef} />}
            label={<Typography color="lightDark">Remember me</Typography>}
          />
          {/* TODO: implement forget password functionalitiy + page is possible */}
          <Link
            to="/forget-password"
            style={{ color: "rgb(105, 108, 255)", textDecoration: "none" }}
          >
            Forget Password
          </Link>
        </Stack>
        <Button
          fullWidth
          sx={{
            mt: 2,
          }}
          variant="contained"
          type="submit"
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? "Loading" : "Login"}
        </Button>
      </form>
    </Box>
  );
};

export default LoginForm;
