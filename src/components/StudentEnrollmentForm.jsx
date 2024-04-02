import enrollFormSchema from "../schemas/enrollFormSchema";
import getFieldError from "../utils/getFieldError";
import CustomAutoComplete from "./CustomAutoComplete";
import { Button, Stack, createFilterOptions } from "@mui/material";
import { useFormik } from "formik";
const studentFilterOptions = createFilterOptions({
  matchFrom: "any",
  stringify: (option) => `${option.id} ${option.fullName}`,
});
const courseFilterOptions = createFilterOptions({
  matchFrom: "any",
  stringify: (option) => `${option.id} ${option.title}`,
});
const StudentEnrollmentForm = ({ onEnrollment }) => {
  const formik = useFormik({
    initialValues: {
      enrolledStudent: null,
      enrolledCourse: null,
    },
    validationSchema: enrollFormSchema,
    onSubmit: async (values) => {
      await onEnrollment({
        courseId: values.enrolledCourse.id,
        studentId: values.enrolledStudent.id,
      });
      formik.setSubmitting(false);
    },
  });
  const onAutoCompleteChange = (fieldName) => (event, value) => {
    formik.setFieldValue(fieldName, value);
    console.log({ fieldName, value });
  };
  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack gap={3}>
        <div>
          <CustomAutoComplete
            textFieldName="enrolledStudent"
            label="Student(s)"
            endPointSlug="/users"
            noOptionsText="No Such Student"
            getOptionLabel={(option) => option.fullName}
            filterOptions={studentFilterOptions}
            filterSelectedOptions
            onChange={onAutoCompleteChange("enrolledStudent")}
            value={formik.values.enrolledStudent}
          />
          <p
            style={{
              color: "red",
              margin: 0,
            }}
          >
            {getFieldError(formik, "enrolledStudent")}
          </p>
        </div>
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
          <p
            style={{
              color: "red",
              margin: 0,
            }}
          >
            {getFieldError(formik, "enrolledCourse")}
          </p>
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
