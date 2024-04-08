import * as Yup from "yup";

const reviewFormSchema = Yup.object({
  rating: Yup.number().required("Review value is required"),
  reviewBody: Yup.string().required("Review text is required."),
});
export default reviewFormSchema;
