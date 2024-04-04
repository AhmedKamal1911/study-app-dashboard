import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import PasswordField from "./PasswordField";
import CustomSelectField from "./CustomSelectField";
import { useFormik } from "formik";
import registerFormSchema from "../schemas/registerFormSchema";
import getFieldError from "../utils/getFieldError";
// const CustomTextField = styled(TextField)({
//   "& .MuiOutlinedInput-root": {
//     "&:not(:hover) fieldset": {
//       // borderColor: "rgb(50, 71, 92)",
//     },
//     "&:hover fieldset": {
//       // borderColor: "#B2BAC2",
//     },
//     "&.Mui-focused fieldset": {
//       // borderColor: "#6F7E8C",
//     },
//   },
// });
const RegisterForm = ({ onRegister }) => {
  const formRef = useRef(null);
  const [showInstructorDescription, setShowInstructorDesc] = useState(false);
  const formik = useFormik({
    initialValues: {
      username: "",
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      userType: "users",
      instructorDescription: "",
      termsAgree: false,
    },
    validationSchema: registerFormSchema,
    onSubmit: async (values) => {
      const formData = new FormData(formRef.current);
      const unnecessaryInputNames = [
        "userType",
        "termsAgree",
        "confirmPassword",
      ];
      const trimmedFullName = values.fullName.trim();
      formData.set("fullName", trimmedFullName);
      unnecessaryInputNames.forEach((key) => formData.delete(key));
      if (values.userType === "users") {
        formData.delete("instructorDescription");
      }
      // console.table([...formData.entries()]);
      await onRegister(formData, values.userType);
      formik.setSubmitting(false);
    },
  });
  return (
    <Box
      bgcolor="#141213"
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
        <svg
          width="22"
          height="32"
          viewBox="0 0 55 81"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="purple"
            d="M30.1984 0.0144043C24.8945 0.425781 25.2534 6.16968 26.6435 7.65326C22.693 10.3649 13.1875 16.8867 6.76944 21.2803C1.21531 25.0824 -0.842975 34.6064 1.11159 40.8262C3.00952 46.8658 12.4904 51.3615 17.5337 52.7256C17.5337 52.7256 11.7188 56.0269 6.60358 60.0482C1.48831 64.0695 -0.622615 69.3436 3.06836 75.262C6.75933 81.1805 12.725 80.761 17.5257 78.6229C22.3264 76.4848 32.1683 69.1692 37.9402 65.1633C42.7282 61.5411 43.9669 53.6444 41.7631 46.9643C39.9758 41.5468 30.0969 36.4284 25.1792 34.6064C27.1946 33.1595 32.4935 29.4242 37.129 26.0909C38.7184 30.5636 43.9998 30.212 45.6103 27.8209C47.6216 23.4326 51.8339 13.4663 53.9579 8.55175C54.8862 4.81044 52.5639 2.78457 50.2227 2.35938C46.8672 1.75 38.3222 0.960115 30.1984 0.0144043Z"
          ></path>
          <path
            fillOpacity="0.2"
            fill="#FFF"
            d="M26.6523 7.65625C24.9492 5.625 25.3239 0.255308 30.2922 0.0105286C33.0074 0.326611 35.7804 0.62685 38.3907 0.909477C43.5904 1.47246 48.1446 1.96556 50.311 2.3748C52.7331 2.83234 54.886 5.06072 53.9543 8.61103C53.2063 10.3418 52.2075 12.6646 51.1482 15.1282C49.1995 19.6601 47.0459 24.6685 45.8717 27.3445C44.7224 29.964 39.111 31.0585 37.1137 26.0951C32.4782 29.4283 27.2884 33.1556 25.273 34.6026C24.931 34.4553 24.3074 34.2381 23.5124 33.9613C20.8691 33.0407 16.331 31.4602 13.9477 29.5966C9.61363 25.5918 11.6259 19.4662 13.1737 16.904C17.8273 13.7183 20.7417 11.7161 23.4984 9.82236C24.5437 9.10427 25.5662 8.40178 26.6523 7.65625Z"
          ></path>
          <path
            fillOpacity="0.2"
            fill="#FFF"
            d="M17.543 52.7266C21.2241 53.9875 28.5535 57.0509 30.091 59.101C32.0129 61.6635 33.1576 64.34 29.2527 71.2039C28.5954 71.6481 27.9821 72.0633 27.4069 72.4528C22.1953 75.9817 20.1085 77.3946 16.6243 79.0531C13.5855 80.2464 6.61575 81.7103 2.66559 74.5653C-1.11764 67.7222 3.23818 62.7113 6.5963 60.065L12.1695 56.0339L14.8359 54.3477L17.543 52.7266Z"
          ></path>
        </svg>
        <Typography
          variant="h5"
          fontWeight="bold"
          color="rgba(50, 71, 92, 0.87)"
        >
          Healther
        </Typography>
      </Stack>
      <Box color="black" mb={2}>
        <Typography fontWeight="bold" fontSize={24} color="rgb(50,71,92)">
          Adventure starts here 🚀
        </Typography>
        <Typography color="rgba(50, 71, 92, 0.6)">
          Make your app management easy and fun!
        </Typography>
      </Box>
      <form onSubmit={formik.handleSubmit} ref={formRef}>
        <Stack gap={2} mb={2}>
          <TextField
            name="username"
            id="username"
            label="Username"
            variant="outlined"
            placeholder="max9874"
            value={formik.values.username}
            onChange={formik.handleChange}
            helperText={getFieldError(formik, "username")}
            FormHelperTextProps={{
              style: {
                color: "red",
              },
            }}
          />
          <TextField
            name="fullName"
            id="fullName"
            label="Full Name"
            variant="outlined"
            placeholder="max9874"
            value={formik.values.fullName}
            onChange={formik.handleChange}
            helperText={getFieldError(formik, "fullName")}
            FormHelperTextProps={{
              style: {
                color: "red",
              },
            }}
          />
          <TextField
            name="email"
            id="email"
            label="Email"
            variant="outlined"
            type="email"
            placeholder="example@gmail.com"
            onChange={formik.handleChange}
            value={formik.values.email}
            helperText={getFieldError(formik, "email")}
            FormHelperTextProps={{
              style: {
                color: "red",
              },
            }}
          />
          <div>
            <PasswordField
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              label="Password"
              fullWidth
            />
            <p
              style={{
                color: "red",
              }}
            >
              {getFieldError(formik, "password")}
            </p>
          </div>

          <div>
            <PasswordField
              name="confirmPassword"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              label="Confirm Password"
              fullWidth
            />
            <p
              style={{
                color: "red",
              }}
            >
              {getFieldError(formik, "confirmPassword")}
            </p>
          </div>
        </Stack>
        <div>
          <CustomSelectField
            name="userType"
            label="User Type"
            onChange={(e) => {
              formik.handleChange(e);
              setShowInstructorDesc(e.target.value === "instructors");
            }}
            value={formik.values.userType}
            controlled
          >
            <MenuItem value="users">Student</MenuItem>
            <MenuItem value="instructors">Instructor</MenuItem>
          </CustomSelectField>
          <p
            style={{
              color: "red",
            }}
          >
            {getFieldError(formik, "userType")}
          </p>
        </div>

        <div
          style={{
            display: showInstructorDescription ? "block" : "none",
          }}
        >
          <TextField
            id="instructorDescription"
            label="Instructor Description"
            name="instructorDescription"
            value={formik.values.instructorDescription}
            onChange={formik.handleChange}
            variant="outlined"
            fullWidth
            placeholder="What is the instructor description?"
            FormHelperTextProps={{
              style: {
                color: "red",
              },
            }}
            helperText={getFieldError(formik, "instructorDescription")}
          />
        </div>

        <div>
          <FormControlLabel
            sx={{
              mt: 2,
            }}
            control={
              <Checkbox
                name="termsAgree"
                onChange={formik.handleChange}
                checked={formik.values.termsAgree}
              />
            }
            label={
              <Typography color="rgba(50, 71, 92, 0.6)">
                I agree to{" "}
                <Typography component="span" color="rgb(105, 108, 255)">
                  privacy policy & terms
                </Typography>
              </Typography>
            }
          />
          <p
            style={{
              color: "red",
            }}
          >
            {getFieldError(formik, "termsAgree")}
          </p>
        </div>

        <Button
          fullWidth
          sx={{
            mt: 2,
          }}
          variant="contained"
          type="submit"
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? "SIGNING UP" : "SIGN UP"}
        </Button>
        <Typography p={3} color="rgba(50, 71, 92, 0.6)">
          Already have an account?{" "}
          <Link
            to="/login"
            style={{
              textDecoration: "none",
              color: "rgb(105, 108, 255)",
            }}
          >
            Sign in instead
          </Link>{" "}
        </Typography>
      </form>
    </Box>
  );
};

export default RegisterForm;
