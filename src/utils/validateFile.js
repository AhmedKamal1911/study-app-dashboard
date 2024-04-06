function validateFile(file, fileValidationSchema) {
  try {
    fileValidationSchema.validateSync(file);
    return true;
  } catch (e) {
    return false;
  }
}
export default validateFile;
