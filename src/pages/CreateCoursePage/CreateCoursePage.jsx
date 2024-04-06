import { Box } from "@mui/material";
import React from "react";
import InfoBoxWrapper from "../../components/InfoBoxWrapper";
import CreateCourseForm from "../../components/CreateCourseForm";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "../../contexts/snackbarContext";
import fetchFromAPI from "../../utils/constans/fetchFromApi";
import { useAuth } from "../../contexts/authContext";

const CreateCoursePage = () => {
  const navigate = useNavigate();
  const { openSnackbar } = useSnackbar();
  const { auth } = useAuth();
  const onCourseCreation = async (data) => {
    // TODO: implement create course api request
    console.log({ data });
    try {
      // const response = await fetchFromAPI({
      //   url: "/courses",
      //   method: "POST",
      //   headers: {
      //     Authorization: `Bearer ${auth.token}`,
      //   },
      //   data,
      // });
      // console.log(response);
      // navigate("/");
      openSnackbar("Course created successfully.");
    } catch (e) {
      openSnackbar(
        "Failed to create course due to network error, try again.",
        "error"
      );
    }
  };
  return (
    <Box p={3} bgcolor="background.paper" borderRadius="8px">
      <InfoBoxWrapper title="Create New Course">
        <CreateCourseForm onCourseCreation={onCourseCreation} />
      </InfoBoxWrapper>
    </Box>
  );
};

export default CreateCoursePage;
