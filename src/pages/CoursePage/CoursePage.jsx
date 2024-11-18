import { CreateCourseForm, InfoBoxWrapper, Loading } from "../../components";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "../../contexts/snackbarContext";
import { Box } from "@mui/material";
import { useAuth } from "../../contexts/authContext";
import useFetch from "../../hooks/useFetch";
import withHelmet from "../../components/withHelmet";
import fetchFromAPI from "../../services/api";

const CoursePage = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const { openSnackbar } = useSnackbar();
  const { auth } = useAuth();
  const {
    error,
    responseData: courseData,
    isLoading,
  } = useFetch({
    url: `/courses/${slug}`,
  });
  const onCourseUpdate = async (formData) => {
    const updatedData = formData;
    const currentFormData = { ...Object.fromEntries(updatedData.entries()) };

    console.log(
      courseData.whatYouWillLearn === currentFormData.whatYouWillLearn
    );
    if (
      courseData.title === currentFormData.title &&
      courseData.category === currentFormData.category &&
      courseData.courseDescription === currentFormData.courseDescription &&
      courseData.courseLink === currentFormData.courseLink &&
      courseData.isCertified === JSON.parse(currentFormData.isCertified) &&
      courseData.language === currentFormData.language &&
      courseData.prerequisites.split("\r").join("") ===
        currentFormData.prerequisites &&
      courseData.skillLevel === currentFormData.skillLevel &&
      courseData.whatYouWillLearn === currentFormData.whatYouWillLearn
    ) {
      navigate(`/courses`);
    } else {
      try {
        await fetchFromAPI({
          url: `/courses/${slug}`,
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
          data: currentFormData,
        });
        navigate(`/courses`);
        openSnackbar("Course Has Been Updated successfully.");
      } catch (e) {
        openSnackbar("Failed to update course due to network error", "error");
      }
    }
  };

  return (
    <Box p={3} bgcolor="background.paper" borderRadius="8px">
      <Loading error={error} isLoading={isLoading}>
        <InfoBoxWrapper title="Update Course">
          <CreateCourseForm
            onCourseCreation={onCourseUpdate}
            course={courseData}
            fileRequired={false}
          />
        </InfoBoxWrapper>
      </Loading>
    </Box>
  );
};

export default withHelmet(CoursePage, "CoursePage");
