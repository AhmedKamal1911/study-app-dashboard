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
import createCourseFormSchema, {
  fileValidationSchema,
} from "../schemas/createCourseFormSchema";
import { useRef } from "react";
import getFieldError from "../utils/getFieldError";

const instructorFilterOptions = createFilterOptions({
  matchFrom: "any",
  stringify: (option) => `${option.id} ${option.fullName}`,
});
const CreateCourseForm = ({ onCourseCreation }) => {
  // TODO: Image Validation using formik instead of normal validation
  const formRef = useRef(null);
  const certifiedCheckBoxRef = useRef(null);
  const formik = useFormik({
    initialValues: {
      courseImgFile: null,
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
      console.log({ formRef });
      const formData = new FormData(formRef.current);
      console.log({ formData });
      console.table([...formData.entries()]);
      // FIXME: structure the data for the api request
      // TODO: idea of resizing image into different sizes (small - medium - large)
      // TODO: possible to check image dimensions if you want more than 1 course image
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
  const onFileInputChange = (file) => {
    formik.setFieldValue("courseImgFile", file ?? null);
  };
  const onFileDrop = (files, onDropSuccess) => {
    if (files.length > 1) {
      formik.setFieldError("courseImgFile", "You cant drop more than 1 image");
    } else {
      onDropSuccess(files[0]);
    }
  };
  return (
    <Box borderRadius={2}>
      <form onSubmit={formik.handleSubmit} ref={formRef}>
        <Stack gap={4} mb={2}>
          {/* File Input */}
          <DragZone
            name="courseImgFile"
            error={getFieldError(formik, "courseImgFile")}
            fileValidationSchema={fileValidationSchema}
            onChange={onFileInputChange}
            onDrop={onFileDrop}
          />
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
