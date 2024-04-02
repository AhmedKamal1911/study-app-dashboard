import * as Yup from "yup";

const registerFormSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  email: Yup.string()
    .email("Invalid Email Address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password length must be at minimum 8 letters")
    .max(20, "Password cannot be larger than 20 letters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .required("Confirm your password")
    .oneOf([Yup.ref("password")], "Your passwords do not match"),
  termsAgree: Yup.bool().isTrue("You must agree on terms of service"),
});
// TODO: create power meter for password
// TODO: create strong password validation
export default registerFormSchema;
