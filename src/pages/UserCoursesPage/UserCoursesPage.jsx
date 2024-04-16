import { Box, Typography, Stack, Button } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { Loading, InfoBoxWrapper, CourseCard } from "../../components";
import fetchFromAPI from "../../services/api";
import { useAuth } from "../../contexts/authContext";
import { useModal } from "../../contexts/modalContext";
import { useSnackbar } from "../../contexts/snackbarContext";
import useFetch from "../../hooks/useFetch";
import usePaginateList from "../../hooks/usePagniateList";
import { calculateReviewValue } from "../../utils";
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

  const { closeModal } = useModal();
  const { openSnackbar } = useSnackbar();
  const onReviewCreation = (courseSlug) => async (reviewInfo) => {
    try {
      const response = await fetchFromAPI({
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
  return (
    <Box minHeight="100vh" p={3} bgcolor="background.paper" borderRadius="8px">
      <InfoBoxWrapper title="My Courses">
        <Loading
          error={error}
          isLoading={isLoading}
          // error={"hasssssssssssssssssssssssssssssssss"}
        >
          {userCourses && (
            <>
              {coursesDataToShow.length > 0 ? (
                <>
                  <Grid container spacing={3}>
                    {coursesDataToShow?.map((course) => {
                      const courseReviewValue = calculateReviewValue(
                        course.reviews
                      );
                      return (
                        <Grid key={course.id} xs={12} sm={6} md={4} lg={3}>
                          <Box
                            sx={{ "& > *": { height: "100%" }, height: "100%" }}
                          >
                            <CourseCard
                              hideReviewBtn={
                                auth.user.isInstructor || course.hasReviewed
                              }
                              onReviewCreation={onReviewCreation(course.slug)}
                              courseImg={course.thumbnails}
                              reviewsCount={course.numberOfRatings}
                              totalStudents={course.numberOfStudents}
                              courseLink={course.courseLink}
                              ratingValue={courseReviewValue}
                              title={course.title}
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

export default UserCoursesPage;
