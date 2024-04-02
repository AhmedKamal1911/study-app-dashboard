import * as Yup from "yup";
import generateFileValidationSchema from "./fileValidationSchema";
export const fileValidationSchema = generateFileValidationSchema(2.5);
const createCourseFormSchema = Yup.object({
  courseImgFile: fileValidationSchema,
  courseName: Yup.string().required("You must write course name."),
  courseCat: Yup.string().required("Course category is required."),
  courseDesc: Yup.string().required("Course description is required."),
  courseReq: Yup.string().required("You must set course requirements."),
  courseLearning: Yup.string().required("Course learning value is required."),
  courseLang: Yup.string().required("Course language is required."),
  courseLevel: Yup.string().required("Course level is required."),
  courseInstructor: Yup.object().nonNullable(
    "You must select course instructor."
  ),
});
export default createCourseFormSchema;
