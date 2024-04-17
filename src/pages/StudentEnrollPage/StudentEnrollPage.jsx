import { Box } from "@mui/material";
import { InfoBoxWrapper, StudentEnrollmentForm } from "../../components";
import { useNavigate } from "react-router-dom";
import fetchFromAPI from "../../services/api";
import { useSnackbar } from "../../contexts/snackbarContext";
import { useAuth } from "../../contexts/authContext";
import { getUserBaseURL } from "../../routes/AppRouter";
import withHelmet from "../../components/withHelmet";
const StudentEnrollPage = () => {
  const navigate = useNavigate();
  const { openSnackbar } = useSnackbar();
  const { auth } = useAuth();
  const onEnrollment = async (enrolledCourseSlug) => {
    try {
      await fetchFromAPI({
        url: `/courses/${enrolledCourseSlug}/enroll`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      openSnackbar("You enrolled to the course successfully.");
      navigate(getUserBaseURL(auth.user));
    } catch (e) {
      if (e.response.data.statusCode === 405) {
        openSnackbar(e.response.data.message, "error");
        return;
      }
      openSnackbar(
        "Failed to enroll to the course due to network error",
        "error"
      );
    }
  };
  return (
    <Box minHeight="83.4vh">
      <InfoBoxWrapper title="Enroll Students" />
      <Box>
        <StudentEnrollmentForm onEnrollment={onEnrollment} />
      </Box>
    </Box>
  );
};

export default withHelmet(StudentEnrollPage, "Enroll");
