import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Stack,

  // createFilterOptions,
} from "@mui/material";

// import CustomAutoComplete from './CustomAutoComplete';
import { useFormik } from "formik";
import createCourseFormSchema, {
  fileValidationSchema,
} from "../validations/createCourseFormSchema";
import { useRef } from "react";
import { getFieldError } from "../utils";
import { FieldError, CustomTextField, CustomSelectField, DragZone } from ".";

// const instructorFilterOptions = createFilterOptions({
//   matchFrom: 'any',
//   stringify: (option) => `${option.id} ${option.fullName}`,
// });
function removeExtraSpacesAndNewlines(str) {
  return str.trim().replace(/\s*\n\s*/g, "\n");
}
const CreateCourseForm = ({ onCourseCreation }) => {
  const isCertifiedInputRef = useRef(null);
  const imageBlobURLRef = useRef("");
  const formRef = useRef(null);
  const formik = useFormik({
    initialValues: {
      file: null,
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
      const formData = new FormData(formRef.current);
      formData.set(
        "whatYouWillLearn",
        removeExtraSpacesAndNewlines(values.whatYouWillLearn)
      );
      formData.set(
        "prerequisites",
        removeExtraSpacesAndNewlines(values.prerequisites)
      );
      formData.set("courseLink", values.courseLink);
      formData.set("isCertified", isCertifiedInputRef.current.checked);

      // TODO: idea of resizing image into different sizes (small - medium - large)
      // TODO: possible to check image dimensions if you want more than 1 course image
      try {
        await onCourseCreation(formData);
        if (imageBlobURLRef.current) {
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
    formik.setFieldValue("file", file ?? null);
  };
  const onFileDrop = (files, onDropSuccess) => {
    if (files.length > 1) {
      formik.setFieldError("file", "You cant drop more than 1 image");
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
            name="file"
            error={getFieldError(formik, "file")}
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
              label="Course name"
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
              label="Course category"
              name="category"
              value={formik.values.category}
              onChange={formik.handleChange}
            >
              <MenuItem value="frontend">Front End</MenuItem>
              <MenuItem value="backend">Back End</MenuItem>
              <MenuItem value="fullStack">Full Stack</MenuItem>
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
                inputRef={isCertifiedInputRef}
                id="isCertified"
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
