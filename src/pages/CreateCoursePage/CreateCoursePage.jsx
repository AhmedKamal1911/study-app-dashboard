import { Box } from "@mui/material";
import React from "react";
import InfoBoxWrapper from "../../components/InfoBoxWrapper";
import CreateCourseForm from "../../components/CreateCourseForm";
import { wait } from "@testing-library/user-event/dist/utils";
import { useNavigate } from "react-router-dom";

const CreateCoursePage = () => {
  const navigate = useNavigate();
  const onCourseCreation = async (data) => {
    // TODO: implement create course api request
    console.log({ data });
    try {
      await wait(2000);
      // navigate('/')
      // TODO: Show Sucess message
    } catch (e) {
      // TODO: Show Error Message
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
