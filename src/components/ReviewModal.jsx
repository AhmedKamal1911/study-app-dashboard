import { Button, Rating, Stack, TextField } from "@mui/material";
import { useFormik } from "formik";
import reviewFormSchema from "../schemas/reviewFormSchema";
import getFieldError from "../utils/getFieldError";
const ReviewModal = ({ onReviewCreation }) => {
  // TODO: implement blur formik
  const formik = useFormik({
    initialValues: {
      ratingValue: null,
      reviewText: "",
    },
    validationSchema: reviewFormSchema,
    onSubmit: async (values) => {
      await onReviewCreation(values);
      formik.setSubmitting(false);
    },
  });
  const handleRatingChange = (event, newValue) => {
    formik.setFieldValue("ratingValue", newValue);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack gap={2}>
        <div>
          <Rating
            name="ratingValue"
            precision={0.5}
            value={formik.values.ratingValue}
            onChange={handleRatingChange}
          />
          <p
            style={{
              color: "red",
              margin: 0,
            }}
          >
            {getFieldError(formik, "ratingValue")}
          </p>
        </div>
        <div>
          <TextField
            fullWidth
            name="reviewText"
            value={formik.values.reviewText}
            onChange={formik.handleChange}
            id="course-req"
            label="Create Review"
            variant="outlined"
            multiline
            rows={3}
            placeholder="Review"
          />

          <p
            style={{
              color: "red",
              margin: 0,
            }}
          >
            {getFieldError(formik, "reviewText")}
          </p>
        </div>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? "Creating" : "Create"}
        </Button>
      </Stack>
    </form>
  );
};

export default ReviewModal;
