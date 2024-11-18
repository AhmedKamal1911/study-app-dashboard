import * as Yup from "yup";
const ForgetPasswordFormSchema = Yup.object({
  email: Yup.string().required("please enter the email address").email(),
});
export default ForgetPasswordFormSchema;
