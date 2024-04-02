const getFieldError = (formikInstance, fieldKey) =>
  formikInstance.touched[fieldKey] && formikInstance.errors[fieldKey];

export default getFieldError;
