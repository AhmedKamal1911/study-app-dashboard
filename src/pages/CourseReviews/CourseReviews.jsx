import { useParams } from "react-router-dom";
import withHelmet from "../../components/withHelmet";
import { Box, Stack, Typography } from "@mui/material";
import {
  CourseReviewCard,
  EmptyBox,
  InfoBoxWrapper,
  Loading,
} from "../../components";
import useFetch from "../../hooks/useFetch";
import fetchFromAPI from "../../services/api";
import { useSnackbar } from "../../contexts/snackbarContext";

const CourseReviews = () => {
  const { slug } = useParams();
  const { openSnackbar } = useSnackbar();
  const { error, responseData, isLoading, refetch } = useFetch({
    url: `/courses/${slug}/reviews`,
  });
  console.log(responseData);
  const deleteReview = async (id) => {
    try {
      await fetchFromAPI({
        url: `/admin-dashboard/reviews/${id}`,
        method: "DELETE",
      });
      refetch();

      openSnackbar("Review Deleted successfully.");
    } catch (e) {
      openSnackbar(
        "Failed to Delete the Review due to a network error.",
        "error"
      );
    }
  };
  return (
    <Box
      sx={{
        minHeight: "100vh",
        p: 2,
      }}
    >
      <InfoBoxWrapper title="Course Reviews">
        <Loading isLoading={isLoading} error={error}>
          <Stack gap={5}>
            {responseData?.length ? (
              responseData?.map((review) => (
                <CourseReviewCard
                  key={review.id}
                  reviewData={review}
                  onReviewDelete={deleteReview}
                />
              ))
            ) : (
              <EmptyBox text={"There is No Reviews in This Course"} />
            )}
          </Stack>
        </Loading>
      </InfoBoxWrapper>
    </Box>
  );
};

export default withHelmet(CourseReviews, "Course Reviews");
