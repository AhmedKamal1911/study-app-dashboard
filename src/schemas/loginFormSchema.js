import * as Yup from "yup";
const loginFormSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password length must be at minimum 8 letters")
    .max(20, "Password cannot be larger than 20 letters")
    .required("Password is required"),
});
export default loginFormSchema;
