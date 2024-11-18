import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Stack,
} from "@mui/material";
import { useFormik } from "formik";
import createCourseFormSchema, {
  fileValidationSchemaNotReq,
  fileValidationSchemaReq,
} from "../validations/createCourseFormSchema";
import { useRef } from "react";
import { getFieldError } from "../utils";
import { FieldError, CustomSelectField, DragZone, CustomTextField } from ".";

function removeExtraSpacesAndNewlines(str) {
  return str.trim().replace(/\s*\n\s*/g, "\n");
}

const CreateCourseForm = ({
  onCourseCreation,
  course = {},
  fileRequired = true,
}) => {
  const imageBlobURLRef = useRef("");
  const formRef = useRef(null);

  const formik = useFormik({
    initialValues: {
      file: null,
      title: course?.title ?? "",
      courseLink: course?.courseLink ?? "",
      category: course?.category ?? "",
      courseDescription: course?.courseDescription ?? "",
      prerequisites: course?.prerequisites ?? "",
      whatYouWillLearn: course?.whatYouWillLearn ?? "",
      language: course?.language ?? "",
      skillLevel: course?.skillLevel ?? "",
      isCertified: course?.isCertified ?? false,
    },
    enableReinitialize: true,
    validationSchema: createCourseFormSchema(fileRequired),
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
      formData.set("isCertified", values.isCertified.toString());
      if (formik.values.file === null) formData.delete("file");
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

  const onFileInputChange = (file) => {
    formik.setFieldValue("file", file ?? null);
  };

  const onFileDrop = (files, onDropSuccess) => {
    if (files.length > 1) {
      formik.setFieldError("file", "You can't drop more than 1 image");
    } else {
      onDropSuccess(files[0]);
    }
  };
  // console.log(formik.values.category, "category");

  return (
    <Box borderRadius={2}>
      <form onSubmit={formik.handleSubmit} ref={formRef}>
        <Stack gap={4} mb={2}>
          {/* File Input */}
          <DragZone
            name="file"
            error={getFieldError(formik, "file")}
            fileValidationSchema={
              fileRequired
                ? fileValidationSchemaReq
                : fileValidationSchemaNotReq
            }
            onChange={onFileInputChange}
            onDrop={onFileDrop}
            onBlur={formik.handleBlur}
            imageBlobURLRef={imageBlobURLRef}
            initialImg={course?.thumbnails ?? ""}
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
              label={"Course category"}
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
          <FormControlLabel
            control={
              <Checkbox
                name="isCertified"
                checked={formik.values.isCertified}
                onChange={formik.handleChange}
                id="isCertified"
              />
            }
            sx={{
              userSelect: "none",
              color: "lightDark",
            }}
            label="Certified Course"
          />
          <FieldError errorText={getFieldError(formik, "isCertified")} />
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
