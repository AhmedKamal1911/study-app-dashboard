import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Stack,

  // createFilterOptions,
} from "@mui/material";

import CustomSelectField from "./CustomSelectField";
// import CustomAutoComplete from './CustomAutoComplete';
import DragZone from "./DragZone";
import { useFormik } from "formik";
import createCourseFormSchema, {
  fileValidationSchema,
} from "../schemas/createCourseFormSchema";
import { useRef } from "react";
import getFieldError from "../utils/getFieldError";
import FieldError from "./FieldError";
import CustomTextField from "./CustomTextField";

// const instructorFilterOptions = createFilterOptions({
//   matchFrom: 'any',
//   stringify: (option) => `${option.id} ${option.fullName}`,
// });
function convertStringToArrayByNewLine(str) {
  return str
    .split("\n")
    .filter(Boolean)
    .map((strValue) => strValue.trim()); // Use '\r\n' if you're dealing with Windows-style line endings
}
const CreateCourseForm = ({ onCourseCreation }) => {
  const imageBlobURLRef = useRef("");
  const formRef = useRef(null);
  const certifiedCheckBoxRef = useRef(null);
  const formik = useFormik({
    initialValues: {
      thumbnails: null,
      title: "",
      courseLink: "",
      category: "",
      courseDescription: "",
      prerequisites: "",
      whatYouWillLearn: "",
      language: "",
      skillLevel: "",
    },
    validationSchema: createCourseFormSchema,
    onSubmit: async (values) => {
      if (!certifiedCheckBoxRef.current) return;
      const whatYouWillLearnArray = convertStringToArrayByNewLine(
        values.whatYouWillLearn
      );
      const prerequisitesArray = convertStringToArrayByNewLine(
        values.prerequisites
      );
      console.log({ whatYouWillLearnArray, prerequisitesArray });
      console.log({ formRef });
      const formData = new FormData(formRef.current);
      formData.set("isCertified", certifiedCheckBoxRef.current.checked);
      formData.set("whatYouWillLearn", whatYouWillLearnArray);
      formData.set("prerequisites", prerequisitesArray);
      console.log({ formData });
      console.table([...formData.entries()]);

      // FIXME: structure the data for the api request
      // TODO: idea of resizing image into different sizes (small - medium - large)
      // TODO: possible to check image dimensions if you want more than 1 course image
      try {
        await onCourseCreation(formData);
        console.log("refValue before if", { imageBlobURLRef });
        if (imageBlobURLRef.current) {
          console.log("refValue inside if", { imageBlobURLRef });
          URL.revokeObjectURL(imageBlobURLRef.current);
        }
      } finally {
        formik.setSubmitting(false);
      }
    },
  });
  // const onCourseInstructorChange = (e, value) => {
  //   formik.setFieldValue('courseInstructor', value);
  // };
  const onFileInputChange = (file) => {
    formik.setFieldValue("thumbnails", file ?? null);
  };
  const onFileDrop = (files, onDropSuccess) => {
    if (files.length > 1) {
      formik.setFieldError("thumbnails", "You cant drop more than 1 image");
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
            name="thumbnails"
            error={getFieldError(formik, "thumbnails")}
            fileValidationSchema={fileValidationSchema}
            onChange={onFileInputChange}
            onDrop={onFileDrop}
            onBlur={formik.handleBlur}
            imageBlobURLRef={imageBlobURLRef}
          />
          <div>
            <CustomTextField
              id="title"
              name="title"
              label="Course Title"
              variant="outlined"
              placeholder="ex: React JS"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              fullWidth
            />
            <FieldError errorText={getFieldError(formik, "title")} />
          </div>
          <div>
            <CustomSelectField
              label="Course Category"
              name="category"
              value={formik.values.category}
              onChange={formik.handleChange}
            >
              <MenuItem value="frontend">Front End</MenuItem>
              <MenuItem value="backend">Back End</MenuItem>
              <MenuItem value="fullstack">Full Stack</MenuItem>
            </CustomSelectField>

            <FieldError errorText={getFieldError(formik, "category")} />
          </div>
          <div>
            <CustomTextField
              fullWidth
              label="Course Description"
              name="courseDescription"
              value={formik.values.courseDescription}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="courseDescription"
              variant="outlined"
              placeholder="ex: Master Python by building 100 projects in 100 days. Learn data science, automation, build websites, games and apps!"
            />
            <FieldError
              errorText={getFieldError(formik, "courseDescription")}
            />
          </div>
          <div>
            <CustomTextField
              id="courseLink"
              name="courseLink"
              label="Course Link"
              variant="outlined"
              placeholder="ex: https://www.youtube.com/playlist?list=PLMC9KNkIncKtPzgY-5rmhvj7fax8fdxoj"
              value={formik.values.courseLink}
              fullWidth
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />

            <FieldError errorText={getFieldError(formik, "courseLink")} />
          </div>
          <div>
            <CustomTextField
              id="prerequisites"
              name="prerequisites"
              label="Course Prerequisites"
              variant="outlined"
              value={formik.values.prerequisites}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              fullWidth
              multiline
              rows={3}
              placeholder="Prerequisites"
            />
            <FieldError errorText={getFieldError(formik, "prerequisites")} />
          </div>
          <div>
            <CustomTextField
              id="whatYouWillLearn"
              name="whatYouWillLearn"
              label="What you will learn?"
              value={formik.values.whatYouWillLearn}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              variant="outlined"
              fullWidth
              multiline
              rows={3}
              placeholder="What to learn in this course?"
            />
            <FieldError errorText={getFieldError(formik, "whatYouWillLearn")} />
          </div>
          <div>
            <CustomSelectField
              value={formik.values.skillLevel}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              label="Course Level"
              name="skillLevel"
            >
              <MenuItem value="beginner">Beginner</MenuItem>
              <MenuItem value="intermediate">Intermediate</MenuItem>
              <MenuItem value="advanced">Advanced</MenuItem>
            </CustomSelectField>
            <FieldError errorText={getFieldError(formik, "skillLevel")} />
          </div>
          <div>
            <CustomSelectField
              name="language"
              label="Course Language"
              value={formik.values.language}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <MenuItem value="english">English</MenuItem>
              <MenuItem value="arabic">Arabic</MenuItem>
            </CustomSelectField>
            <FieldError errorText={getFieldError(formik, "language")} />
          </div>
          {/* <div>
            <CustomAutoComplete
              CustomTextFieldName="courseInstructor"
              label="Course Instructor"
              endPointSlug="/instructors"
              getOptionLabel={(option) => option.fullName}
              filterOptions={instructorFilterOptions}
              filterSelectedOptions
              noOptionsText="No Such Instructor"
              value={formik.values.courseInstructor}
              onChange={onCourseInstructorChange}
              onBlur={formik.handleBlur}
            />
            <p
              style={{
                margin: 0,
                marginTop: '5px',
                color: 'red',
              }}
            >
              {getFieldError(formik, 'courseInstructor')}
            </p>
          </div> */}

          <FormControlLabel
            control={
              <Checkbox
                name="isCertified"
                id="isCertified"
                inputRef={certifiedCheckBoxRef}
              />
            }
            sx={{
              userSelect: "none",
              color: "lightDark",
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
