import { Box } from "@mui/material";
import InfoBoxWrapper from "../../components/InfoBoxWrapper";
import StudentEnrollmentForm from "../../components/StudentEnrollmentForm";
import { useNavigate } from "react-router-dom";
import wait from "../../utils/wait";
const StudentEnrollPage = () => {
  const navigate = useNavigate();
  const onEnrollment = async (enrollmentData) => {
    console.log({ enrollmentData });
    try {
      // TODO: implement enroll api request
      await wait(2000);
      navigate("/");
      // TODO: show success message
    } catch (e) {
      // TODO: show error message
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
