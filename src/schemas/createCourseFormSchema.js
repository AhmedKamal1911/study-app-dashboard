import * as Yup from "yup";
const createCourseFormSchema = Yup.object({
  courseImgFile: Yup.mixed()
    .required("Course image is required.")
    .test(
      "fileType",
      "Invalid file type, file must be an image",
      (value, context) => {
        console.log({ fileTypeContext: context, value });
        const acceptedTypes = [
          "image/jpeg",
          "image/png",
          "image/jpg",
          "image/webp",
        ];
        return acceptedTypes.includes(value.type);
      }
    )
    .test(
      "fileSize",
      "Course Image is too large must be maximum of 2.5mb",
      (value) => {
        const maxFileSizeInMB = 2.5;
        const selectedFileSizeInMB = value.size / (1024 * 1024);
        return selectedFileSizeInMB <= maxFileSizeInMB;
      }
    ),
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
