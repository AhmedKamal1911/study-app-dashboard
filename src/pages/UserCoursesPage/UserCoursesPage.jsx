import { Box, Typography, Stack, Button } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { Loading, InfoBoxWrapper, CourseCard } from "../../components";
import fetchFromAPI from "../../services/api";
import { useAuth } from "../../contexts/authContext";
import { useModal } from "../../contexts/modalContext";
import { useSnackbar } from "../../contexts/snackbarContext";
import useFetch from "../../hooks/useFetch";
import usePaginateList from "../../hooks/usePagniateList";

import withHelmet from "../../components/withHelmet";
const UserCoursesPage = () => {
  const { auth } = useAuth();

  const {
    error,
    responseData: userCourses,
    isLoading,
    refetch: refetchCourses,
  } = useFetch({
    url: `${auth.user.isInstructor ? "/courses/instructor" : "/users/courses"}`,
    headers: {
      Authorization: `Bearer ${auth.token}`,
    },
  });

  const { dataToShowList: coursesDataToShow, handleNextPage } = usePaginateList(
    userCourses,
    8
  );
  console.log(userCourses);
  const { closeModal } = useModal();
  const { openSnackbar } = useSnackbar();
  const onUnenroll = (courseSlug) => async () => {
    console.log("slug ", courseSlug);
    try {
      await fetchFromAPI({
        url: `/courses/${courseSlug}/unenroll`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      refetchCourses();
      openSnackbar(`you unenrolled from course ${courseSlug} successfully.`);
    } catch (e) {
      console.log(e, "error from unenroll");
    }
  };
  const onDelete = (courseSlug) => async () => {
    try {
      await fetchFromAPI({
        url: `/courses/${courseSlug}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });

      refetchCourses();
      openSnackbar(`Course Deleted successfully.`);
    } catch (e) {
      console.log(e, "error from Delete");
    }
  };
  const onReviewCreation = (courseSlug) => async (reviewInfo) => {
    try {
      await fetchFromAPI({
        url: `/reviews/${courseSlug}`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
        data: reviewInfo,
      });

      refetchCourses();

      closeModal();

      openSnackbar("Review created successfully.");
    } catch (e) {
      openSnackbar("Failed to create review due to network error", "error");
    }
  };
  const onReviewUpdate = (course) => async (reviewUpdatedInfo) => {
    console.log(course.slug, "slug");
    try {
      await fetchFromAPI({
        url: `/reviews/${course.reviews[0].id}`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
        data: reviewUpdatedInfo,
      });

      refetchCourses();

      closeModal();

      openSnackbar("Review Updated successfully.");
    } catch (e) {
      openSnackbar("Failed to Update review due to network error", "error");
    }
  };

  const onReviewDelete = (course) => async () => {
    try {
      await fetchFromAPI({
        url: `/reviews/${course.slug}/${course.reviews[0].id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });

      refetchCourses();

      closeModal();

      openSnackbar("Review Deleted successfully.");
    } catch (e) {
      openSnackbar("Failed to Delete review due to network error", "error");
    }
  };

  return (
    <Box minHeight="100vh" p={3} bgcolor="background.paper" borderRadius="8px">
      <InfoBoxWrapper title="My Courses">
        <Loading error={error} isLoading={isLoading}>
          {userCourses && (
            <>
              {coursesDataToShow.length > 0 ? (
                <>
                  <Grid container spacing={3}>
                    {coursesDataToShow?.map((course) => {
                      return (
                        <Grid key={course.id} xs={12} sm={6} md={4} lg={3}>
                          <Box
                            sx={{ "& > *": { height: "100%" }, height: "100%" }}
                          >
                            <CourseCard
                              course={course}
                              onUnenroll={onUnenroll(course.slug)}
                              hideReviewBtn={auth.user.isInstructor}
                              hideUnenrollBtn={auth.user.isInstructor}
                              onReviewCreation={onReviewCreation(course.slug)}
                              onReviewUpdate={onReviewUpdate(course)}
                              onReviewDelete={onReviewDelete(course)}
                              onDelete={onDelete(course.slug)}
                              hideDeleteBtn={!auth.user.isInstructor}
                            />
                          </Box>
                        </Grid>
                      );
                    })}
                  </Grid>
                  {userCourses?.length !== coursesDataToShow.length && (
                    <div
                      style={{
                        marginTop: "30px",
                      }}
                    >
                      <Button
                        sx={{
                          display: "block",
                          maxWidth: "300px",
                          width: "100%",
                          marginInline: "auto",
                        }}
                        variant="contained"
                        size="large"
                        onClick={() => handleNextPage()}
                      >
                        Show more
                      </Button>
                    </div>
                  )}
                </>
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
            </>
          )}
        </Loading>
      </InfoBoxWrapper>
    </Box>
  );
};

export default withHelmet(UserCoursesPage, "Courses");
