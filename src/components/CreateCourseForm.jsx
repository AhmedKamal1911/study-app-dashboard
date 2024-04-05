import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Stack,
  TextField,
  // createFilterOptions,
} from '@mui/material';

import CustomSelectField from './CustomSelectField';
// import CustomAutoComplete from './CustomAutoComplete';
import DragZone from './DragZone';
import { useFormik } from 'formik';
import createCourseFormSchema, {
  fileValidationSchema,
} from '../schemas/createCourseFormSchema';
import { useRef } from 'react';
import getFieldError from '../utils/getFieldError';

// const instructorFilterOptions = createFilterOptions({
//   matchFrom: 'any',
//   stringify: (option) => `${option.id} ${option.fullName}`,
// });
const CreateCourseForm = ({ onCourseCreation }) => {
  const formRef = useRef(null);
  const certifiedCheckBoxRef = useRef(null);
  const formik = useFormik({
    initialValues: {
      thumbnails: null,
      title: '',
      courseLink: '',
      category: '',
      courseDescription: '',
      prerequisites: '',
      whatYouWillLearn: '',
      language: '',
      skillLevel: '',
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
        title: values.title,
        description: values.courseDescription,
        skillLevel: values.skillLevel,
        language: values.language,
        category: values.category,
        // instructorId: values.courseInstructor.id,
        thumbnails: {
          medium: 'url',
        },
        learn: {
          learnValues: [
            {
              id: '1',
              text: '',
            },
          ],
        },
        requirement: {
          requirements: [{ id: '2', text: 'dasdasda' }],
        },
      };
      await onCourseCreation(courseData);
      formik.setSubmitting(false);
    },
  });
  // const onCourseInstructorChange = (e, value) => {
  //   formik.setFieldValue('courseInstructor', value);
  // };
  const onFileInputChange = (file) => {
    formik.setFieldValue('thumbnails', file ?? null);
  };
  const onFileDrop = (files, onDropSuccess) => {
    if (files.length > 1) {
      formik.setFieldError('thumbnails', 'You cant drop more than 1 image');
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
            error={getFieldError(formik, 'thumbnails')}
            fileValidationSchema={fileValidationSchema}
            onChange={onFileInputChange}
            onDrop={onFileDrop}
            onBlur={formik.handleBlur}
          />
          <div>
            <TextField
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
            <p
              style={{
                color: 'red',
              }}
            >
              {getFieldError(formik, 'title')}
            </p>
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
            <p
              style={{
                margin: 0,
                marginTop: '5px',
                color: 'red',
              }}
            >
              {getFieldError(formik, 'category')}
            </p>
          </div>
          <TextField
            label="Course Description"
            name="courseDescription"
            value={formik.values.courseDescription}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="courseDescription"
            variant="outlined"
            placeholder="ex: Master Python by building 100 projects in 100 days. Learn data science, automation, build websites, games and apps!"
            FormHelperTextProps={{
              style: {
                color: 'red',
              },
            }}
            helperText={getFieldError(formik, 'courseDescription')}
          />
          <div>
            <TextField
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
            <p
              style={{
                color: 'red',
              }}
            >
              {getFieldError(formik, 'courseLink')}
            </p>
          </div>
          <TextField
            id="prerequisites"
            name="prerequisites"
            label="Course Prerequisites"
            variant="outlined"
            value={formik.values.prerequisites}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            multiline
            rows={3}
            placeholder="Prerequisites"
            FormHelperTextProps={{
              style: {
                color: 'red',
              },
            }}
            helperText={getFieldError(formik, 'prerequisites')}
          />
          <TextField
            id="whatYouWillLearn"
            name="whatYouWillLearn"
            label="What you will learn?"
            value={formik.values.whatYouWillLearn}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            variant="outlined"
            multiline
            rows={3}
            placeholder="What to learn in this course?"
            FormHelperTextProps={{
              style: {
                color: 'red',
              },
            }}
            helperText={getFieldError(formik, 'whatYouWillLearn')}
          />
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
            <p
              style={{
                margin: 0,
                marginTop: '5px',
                color: 'red',
              }}
            >
              {getFieldError(formik, 'skillLevel')}
            </p>
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
            <p
              style={{
                margin: 0,
                marginTop: '5px',
                color: 'red',
              }}
            >
              {getFieldError(formik, 'language')}
            </p>
          </div>
          {/* <div>
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
              userSelect: 'none',
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
          {formik.isSubmitting ? 'Creating' : 'Create'}
        </Button>
      </form>
    </Box>
  );
};

export default CreateCourseForm;
