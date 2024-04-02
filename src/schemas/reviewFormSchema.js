import * as Yup from "yup";

const reviewFormSchema = Yup.object({
  ratingValue: Yup.number().required("Review value is required"),
  reviewText: Yup.string().required("Review text is required."),
});
export default reviewFormSchema;
