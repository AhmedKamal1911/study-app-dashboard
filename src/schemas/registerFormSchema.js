import * as Yup from "yup";
import generateFileValidationSchema from "./fileValidationSchema";
export const fileValidationSchema = generateFileValidationSchema(2.5, "User");
const registerFormSchema = Yup.object({
  file: fileValidationSchema,
  userType: Yup.string().required("User type is required"),
  instructorDescription: Yup.string().when("userType", {
    is: "instructors",
    then: () => Yup.string().required("Instructor description is required"),
    otherwise: () => Yup.string().notRequired(),
  }),
  username: Yup.string().required("Username is required"),
  fullName: Yup.string()
    .required("Full name is required.")
    .matches(
      /^\s*[a-zA-Z]{2,}\s[a-zA-Z]{2,}\s*$/,
      "Full name must contain at least 2 characters for each part and no numbers."
    ),
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
