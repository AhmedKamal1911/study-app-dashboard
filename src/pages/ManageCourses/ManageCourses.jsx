import { Box } from "@mui/material";
import InfoBoxWrapper from "../../components/InfoBoxWrapper";
import CoursesTable from "../../components/CoursesTable";
import useFetch from "../../hooks/useFetch";
import fetchFromAPI from "../../services/api";
import { useSnackbar } from "../../contexts/snackbarContext";
import withHelmet from "../../components/withHelmet";

const ManageCourses = () => {
  const { error, responseData, isLoading, refetch } = useFetch({
    url: `/courses`,
  });
  const { openSnackbar } = useSnackbar();
  const deleteCourse = async (id) => {
    try {
      await fetchFromAPI({
        url: `/admin-dashboard/courses/${id}`,
        method: "DELETE",
      });
      refetch();

      openSnackbar("Course Deleted successfully.");
    } catch (e) {
      openSnackbar(
        "Failed to Delete the Course due to a network error.",
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
      <InfoBoxWrapper title="Manage Courses">
        <CoursesTable
          coursesData={responseData}
          isLoading={isLoading}
          error={error}
          onCourseDelete={deleteCourse}
          errorText={"Failed to Fetch Courses due to a network error."}
        />
      </InfoBoxWrapper>
    </Box>
  );
};

export default withHelmet(ManageCourses, "Manage Courses");
