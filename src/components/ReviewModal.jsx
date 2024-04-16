import { Button, Rating, Stack, TextField } from "@mui/material";
import { useFormik } from "formik";
import reviewFormSchema from "../validations/reviewFormSchema";
import { getFieldError } from "../utils";
const ReviewModal = ({ onReviewCreation }) => {
  const formik = useFormik({
    initialValues: {
      rating: null,
      reviewBody: "",
    },
    validationSchema: reviewFormSchema,
    onSubmit: async (values) => {
      await onReviewCreation(values);
      formik.setSubmitting(false);
    },
  });
  const handleRatingChange = (event, newValue) => {
    formik.setFieldValue("rating", newValue);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack gap={2}>
        <div>
          <Rating
            name="rating"
            id="rating"
            value={formik.values.rating}
            onChange={handleRatingChange}
          />
          <p
            style={{
              color: "red",
              margin: 0,
            }}
          >
            {getFieldError(formik, "rating")}
          </p>
        </div>
        <div>
          <TextField
            fullWidth
            name="reviewBody"
            value={formik.values.reviewBody}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="reviewBody"
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
            {getFieldError(formik, "reviewBody")}
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
