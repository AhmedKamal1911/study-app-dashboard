import { Box, Typography, Stack } from "@mui/material";
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
    url: `${auth.user.isInstructor ? "/courses/instructor" : "/users/courses"}`,
    headers: {
      Authorization: `Bearer ${auth.token}`,
    },
  });
  const { closeModal } = useModal();
  const { openSnackbar } = useSnackbar();
  const onReviewCreation = (courseId) => async (reviewInfo) => {
    try {
      await fetchFromAPI({
        url: "/reviews",
        method: "POST",
        data: { courseId: courseId, userId: auth.user.id, ...reviewInfo },
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
          {responseData?.courses.length > 0 ? (
            <Grid container spacing={3} alignItems="flex-start">
              {responseData?.courses?.map((course) => (
                <Grid key={course.id} xs={12} sm={6} md={4} lg={3}>
                  <CourseCard
                    hideReviewBtn={auth.user.isInstructor}
                    onReviewCreation={onReviewCreation(course.id)}
                    courseImg={course.thumbnails}
                    reviewsCount={course.numberOfRatings}
                    totalStudents={course.numberOfStudents}
                    courseLink={course.courseLink}
                    ratingValue={5}
                    // FIXME: please rating value from course
                    title={course.title}
                  />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Stack
              minHeight="88vh"
              alignItems="
            center"
              justifyContent="center"
            >
              <Typography
                variant="body2"
                color="indianred"
                border="1px solid indianred"
                fontWeight="bold"
                p={2}
                borderRadius={2}
                fontSize={18}
              >
                You have no courses to show
              </Typography>
            </Stack>
          )}
        </Loading>
      </InfoBoxWrapper>
    </Box>
  );
};

export default UserCoursesPage;
