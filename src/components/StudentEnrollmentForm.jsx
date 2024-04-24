import enrollFormSchema from "../validations/enrollFormSchema";
import { getFieldError } from "../utils";
import { Button, MenuItem, Stack, createFilterOptions } from "@mui/material";
import { useFormik } from "formik";
import { FieldError, CustomAutoComplete, CustomSelectField } from ".";
// const studentFilterOptions = createFilterOptions({
//   matchFrom: "any",
//   stringify: (option) => `${option.id} ${option.fullName}`,
// });
const courseFilterOptions = createFilterOptions({
  matchFrom: "any",
  stringify: (option) => `${option.id} ${option.title}`,
});
const StudentEnrollmentForm = ({ onEnrollment }) => {
  const formik = useFormik({
    initialValues: {
      enrolledCourse: null,
    },
    validationSchema: enrollFormSchema,
    onSubmit: async (values) => {
      await onEnrollment(values.enrolledCourse.slug);
      formik.setSubmitting(false);
    },
  });
  const onAutoCompleteChange = (fieldName) => (event, value) => {
    formik.setFieldValue(fieldName, value);
  };
  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack gap={3}>
        <div>
          <CustomAutoComplete
            textFieldName="enrolledCourse"
            label="Course"
            endPointSlug="/courses"
            getOptionLabel={(option) => option.title}
            filterOptions={courseFilterOptions}
            noOptionsText="No Such Course"
            onChange={onAutoCompleteChange("enrolledCourse")}
            value={formik.values.enrolledCourse}
          />
          <FieldError errorText={getFieldError(formik, "enrolledCourse")} />
        </div>

        <Button
          variant="contained"
          type="submit"
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? "Enrolling" : "Enroll"}
        </Button>
      </Stack>
    </form>
  );
};

export default StudentEnrollmentForm;
