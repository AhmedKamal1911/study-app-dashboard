import { Box } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import React from "react";
import InfoBoxWrapper from "../../components/InfoBoxWrapper";
import CourseCard from "../../components/CourseCard";
import useFetch from "../../hooks/useFetch";
import { useAuth } from "../../contexts/authContext";
import { useModal } from "../../contexts/modalContext";
import fetchFromAPI from "../../utils/constans/fetchFromApi";
import Loading from "../../components/Loading";
import { useSnackbar } from "../../contexts/snackbarContext";
const UserCoursesPage = () => {
  const { auth } = useAuth();
  const { error, responseData, isLoading } = useFetch({
    url: "/courses",
  });
  const { closeModal } = useModal();
  const { openSnackbar } = useSnackbar();
  const onReviewCreation = (courseId) => async (reviewInfo) => {
    try {
      await fetchFromAPI({
        url: "/reviews",
        method: "POST",
        data: { courseId: courseId, userId: auth.user.id, ...reviewInfo },
        headers: {
          "Content-Type": "application/json",
        },
      });
      closeModal();

      openSnackbar("Review created successfully.");
    } catch (e) {
      openSnackbar("Failed to create review due to network error", "error");
    }
  };
  return (
    <Box minHeight="100vh" p={3} bgcolor="background.paper" borderRadius="8px">
      <InfoBoxWrapper title="My Courses">
        <Loading
          error={error}
          isLoading={isLoading}
          // error={"hasssssssssssssssssssssssssssssssss"}
        >
          <Grid container spacing={3} alignItems="flex-start">
            {responseData?.map((course) => (
              <Grid key={course.id} xs={12} sm={6} md={4} lg={3}>
                <CourseCard
                  onReviewCreation={onReviewCreation(course.id)}
                  courseImg={course.thumbnails.large}
                  reviewsCount={15}
                  totalStudents={course.totalStudents}
                  courseLink={"https://www.youtube.com"}
                  ratingVale={course.rating.value}
                  title={course.title}
                />
              </Grid>
            ))}
          </Grid>
        </Loading>
      </InfoBoxWrapper>
    </Box>
  );
};

export default UserCoursesPage;
