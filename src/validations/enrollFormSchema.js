import * as Yup from "yup";

const enrollFormSchema = Yup.object({
  // enrolledStudent: Yup.object().nonNullable(
  //   "You must select student for enrollment process"
  // ),
  enrolledCourse: Yup.object().nonNullable(
    "You must select course for enrollment process"
  ),
});
export default enrollFormSchema;
