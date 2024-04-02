import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Stack,
  TextField,
  createFilterOptions,
} from "@mui/material";

import CustomSelectField from "./CustomSelectField";
import CustomAutoComplete from "./CustomAutoComplete";
import DragZone from "./DragZone";
import { useFormik } from "formik";
import createCourseFormSchema from "../schemas/createCourseFormSchema";
import { useRef } from "react";
import getFieldError from "../utils/getFieldError";

const instructorFilterOptions = createFilterOptions({
  matchFrom: "any",
  stringify: (option) => `${option.id} ${option.fullName}`,
});
const CreateCourseForm = ({ onCourseCreation }) => {
  // TODO: Image Validation using formik instead of normal validation
  const certifiedCheckBoxRef = useRef(null);
  const formik = useFormik({
    initialValues: {
      courseImgFile: undefined,
      courseName: "",
      courseCat: "",
      courseDesc: "",
      courseReq: "",
      courseLearning: "",
      courseLang: "",
      courseLevel: "",
      courseInstructor: null,
    },
    validationSchema: createCourseFormSchema,
    onSubmit: async (values) => {
      if (!certifiedCheckBoxRef.current) return;
      // FIXME: structure the data for the api request
      // TODO: image for data object
      // TODO: idea of resizing image into different sizes (small - medium - large)
      const courseData = {
        title: values.courseName,
        description: values.courseDesc,
        skillLevel: values.courseLevel,
        language: values.courseLang,
        category: values.courseCat,
        instructorId: values.courseInstructor.id,
        thumbnails: {
          medium: "url",
        },
        learn: {
          learnValues: [
            {
              id: "1",
              text: "",
            },
          ],
        },
        requirement: {
          requirements: [{ id: "2", text: "dasdasda" }],
        },
      };
      await onCourseCreation(courseData);
      formik.setSubmitting(false);
    },
  });
  const onCourseInstructorChange = (e, value) => {
    formik.setFieldValue("courseInstructor", value);
  };
  const onFileInputChange = (selectedFile) => {
    formik.setFieldValue("courseImgFile", selectedFile);
  };
  return (
    <Box borderRadius={2}>
      <form onSubmit={formik.handleSubmit}>
        <Stack gap={4} mb={2}>
          {/* File Input */}
          <div>
            <DragZone name="courseImgFile" onChange={onFileInputChange} />
            <p
              style={{
                color: "red",
                margin: 0,
              }}
            >
              {formik.touched.courseImgFile && formik.errors.courseImgFile}
            </p>
          </div>

          <TextField
            id="courseName"
            label="Course Name"
            variant="outlined"
            placeholder="ex: React JS"
            FormHelperTextProps={{
              style: {
                color: "red",
              },
            }}
            helperText={getFieldError(formik, "courseName")}
            value={formik.values.courseName}
            onChange={formik.handleChange}
          />
          <div>
            <CustomSelectField
              label="Course Category"
              name="courseCat"
              value={formik.values.courseCat}
              onChange={formik.handleChange}
            >
              <MenuItem value="frontend">Front End</MenuItem>
              <MenuItem value="backend">Back End</MenuItem>
              <MenuItem value="fullstack">Full Stack</MenuItem>
            </CustomSelectField>
            <p
              style={{
                margin: 0,
                color: "red",
              }}
            >
              {getFieldError(formik, "courseCat")}
            </p>
          </div>
          <TextField
            label="Course description"
            name="courseDesc"
            value={formik.values.courseDesc}
            onChange={formik.handleChange}
            id="courseDesc"
            variant="outlined"
            placeholder="ex: Master Python by building 100 projects in 100 days. Learn data science, automation, build websites, games and apps!"
            FormHelperTextProps={{
              style: {
                color: "red",
              },
            }}
            helperText={getFieldError(formik, "courseDesc")}
          />

          <TextField
            id="courseReq"
            label="Course Requirements"
            variant="outlined"
            name="courseReq"
            value={formik.values.courseReq}
            onChange={formik.handleChange}
            multiline
            rows={3}
            placeholder="Requirements"
            FormHelperTextProps={{
              style: {
                color: "red",
              },
            }}
            helperText={getFieldError(formik, "courseReq")}
          />
          <TextField
            id="courseLearning"
            label="Course Learning"
            name="courseLearning"
            value={formik.values.courseLearning}
            onChange={formik.handleChange}
            variant="outlined"
            multiline
            rows={3}
            placeholder="What to learn in this course?"
            FormHelperTextProps={{
              style: {
                color: "red",
              },
            }}
            helperText={getFieldError(formik, "courseLearning")}
          />
          <div>
            <CustomSelectField
              value={formik.values.courseLevel}
              onChange={formik.handleChange}
              label="Course Level"
              name="courseLevel"
            >
              <MenuItem value="student">Basic</MenuItem>
              <MenuItem value="admin">Expert</MenuItem>
            </CustomSelectField>
            <p
              style={{
                margin: 0,
                color: "red",
              }}
            >
              {getFieldError(formik, "courseLevel")}
            </p>
          </div>
          <div>
            <CustomSelectField
              name="courseLang"
              label="Course Language"
              value={formik.values.courseLang}
              onChange={formik.handleChange}
            >
              <MenuItem value="english">English</MenuItem>
              <MenuItem value="arabic">Arabic</MenuItem>
            </CustomSelectField>
            <p
              style={{
                margin: 0,
                color: "red",
              }}
            >
              {getFieldError(formik, "courseLang")}
            </p>
          </div>
          <div>
            <CustomAutoComplete
              textFieldName="courseInstructor"
              label="Course Instructor"
              endPointSlug="/instructors"
              getOptionLabel={(option) => option.fullName}
              filterOptions={instructorFilterOptions}
              filterSelectedOptions
              noOptionsText="No Such Instructor"
              value={formik.values.courseInstructor}
              onChange={onCourseInstructorChange}
            />
            <p
              style={{
                margin: 0,
                color: "red",
              }}
            >
              {getFieldError(formik, "courseInstructor")}
            </p>
          </div>

          <FormControlLabel
            control={<Checkbox inputRef={certifiedCheckBoxRef} />}
            sx={{
              userSelect: "none",
            }}
            label="Certified Course"
          />
        </Stack>

        <Button
          fullWidth
          sx={{
            mt: 2,
            p: 1.5,
          }}
          variant="contained"
          type="submit"
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? "Creating" : "Create"}
        </Button>
      </form>
    </Box>
  );
};

export default CreateCourseForm;
