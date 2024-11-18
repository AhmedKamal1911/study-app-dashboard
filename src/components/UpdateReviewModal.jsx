import { useState } from "react";
import { Button, Rating, Stack, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import reviewFormSchema from "../validations/reviewFormSchema";
import { getFieldError } from "../utils";
import { useAuth } from "../contexts/authContext";

const UpdateReviewModal = ({
  onReviewUpdate,
  onReviewDelete,
  course,
  title,
}) => {
  const {
    auth: { user },
  } = useAuth();

  const [submitAction, setSubmitAction] = useState(null);

  const userReview = course.reviews?.find(
    (review) => review.reviewCreator?.id === user.id
  );

  const formik = useFormik({
    initialValues: {
      rating: userReview.rating ?? null,
      reviewBody: userReview.reviewBody ?? "",
    },
    validationSchema: reviewFormSchema,
    onSubmit: async (values, { setSubmitting }) => {
      if (submitAction === "delete") {
        await handleReviewDelete();
      } else {
        console.log(values, "values");
        if (
          values.rating !== userReview.rating ||
          values.reviewBody !== userReview.reviewBody
        ) {
          await handleReviewUpdate(values);
        }
      }
      setSubmitting(false);
      setSubmitAction(null); // Reset action after submission
    },
  });

  const handleReviewUpdate = (values) => {
    return onReviewUpdate(values);
  };

  const handleReviewDelete = () => {
    return onReviewDelete();
  };

  // Handle Rating Value Function
  const handleRatingChange = (event, newValue) => {
    formik.setFieldValue("rating", newValue);
  };

  // Set action type and submit form
  const handleButtonClick = (action) => {
    setSubmitAction(action);
    formik.handleSubmit();
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack gap={2}>
        <Typography color="white" variant="h5">
          {title} :
        </Typography>
        <div>
          <Rating
            disabled={formik.isSubmitting}
            name="rating"
            id="rating"
            value={formik.values.rating}
            onChange={handleRatingChange}
          />
          <p style={{ color: "red", margin: 0 }}>
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
          <p style={{ color: "red", margin: 0 }}>
            {getFieldError(formik, "reviewBody")}
          </p>
        </div>
        <Button
          onClick={() => handleButtonClick("update")}
          fullWidth
          variant="contained"
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting && submitAction === "update"
            ? "Updating"
            : "Update"}
        </Button>
        <Button
          onClick={() => handleButtonClick("delete")}
          fullWidth
          color="error"
          variant="contained"
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting && submitAction === "delete"
            ? "Deleting"
            : "Delete"}
        </Button>
      </Stack>
    </form>
  );
};

export default UpdateReviewModal;
