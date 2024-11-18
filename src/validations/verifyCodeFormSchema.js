import * as Yup from "yup";
const verifyCodeFormSchema = Yup.object({
  verifyCode: Yup.string().required("please enter the Verify Code."),
});
export default verifyCodeFormSchema;
