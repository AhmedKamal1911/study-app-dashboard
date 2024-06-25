import * as Yup from "yup";
const profileValidationSchema = Yup.object().shape({
  fullName: Yup.string()
    .required("Full Name is required")
    .min(2, "Full Name must be at least 2 characters long")
    .max(50, "Full Name must be at most 50 characters long"),

  username: Yup.string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters long")
    .max(30, "Username must be at most 30 characters long"),

  email: Yup.string().email("Invalid email format"),

  instructorDescription: Yup.string()
    .optional() // If this field is optional
    .max(500, "Biography must be at most 500 characters long"),
});
export default profileValidationSchema;
