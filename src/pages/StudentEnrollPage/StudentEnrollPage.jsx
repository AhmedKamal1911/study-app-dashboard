import { Box } from "@mui/material";
import InfoBoxWrapper from "../../components/InfoBoxWrapper";
import StudentEnrollmentForm from "../../components/StudentEnrollmentForm";
import { useNavigate } from "react-router-dom";
import wait from "../../utils/wait";
import { useSnackbar } from "../../contexts/snackbarContext";
const StudentEnrollPage = () => {
  const navigate = useNavigate();
  const { openSnackbar } = useSnackbar();
  const onEnrollment = async (enrollmentData) => {
    console.log({ enrollmentData });
    try {
      // TODO: implement enroll api request

      await wait(2000);
      navigate("/");

      openSnackbar("You enrolled to the course successfully.");
    } catch (e) {
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

export default StudentEnrollPage;
