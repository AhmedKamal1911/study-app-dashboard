import * as Yup from 'yup';
import generateFileValidationSchema from './fileValidationSchema';
export const fileValidationSchema = generateFileValidationSchema(2.5);
const createCourseFormSchema = Yup.object({
  thumbnails: fileValidationSchema,
  title: Yup.string().required('You must write course name.'),
  category: Yup.string().required('Course category is required.'),
  courseDescription: Yup.string().required('Course description is required.'),
  prerequisites: Yup.string().required('You must set course requirements.'),
  whatYouWillLearn: Yup.string().required('Course learning value is required.'),
  language: Yup.string().required('Course language is required.'),
  skillLevel: Yup.string().required('Course level is required.'),
  courseLink: Yup.string()
    .required('Course link is required.')
    .matches(
      // Regular expression for YouTube video and playlist URLs
      /^(https?:\/\/)?(www\.youtube\.com|youtu\.?be)\/(watch\?v=.+|playlist\?.+)$/,
      'Invalid Youtube video link or playlist link'
    ),
  // courseInstructor: Yup.object().nonNullable(
  //   "You must select course instructor."
  // ),
});
export default createCourseFormSchema;
