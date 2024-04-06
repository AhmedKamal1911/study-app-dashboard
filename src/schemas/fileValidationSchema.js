import * as Yup from "yup";
const generateFileValidationSchema = (sizeInMB = 2.5, imageType = "Course") => {
  return Yup.mixed()
    .required(`${imageType} image is required`)
    .test("fileType", "Invalid file type, file must be an image", (value) => {
      const acceptedTypes = [
        "image/jpeg",
        "image/png",
        "image/jpg",
        "image/webp",
      ];
      return acceptedTypes.includes(value.type);
    })
    .test(
      "fileSize",
      `${imageType} Image is too large, must be maximum of ${sizeInMB} MB`,
      (value) => {
        const maxFileSizeInMB = sizeInMB;
        const selectedFileSizeInMB = value.size / (1024 * 1024);
        return selectedFileSizeInMB <= maxFileSizeInMB;
      }
    );
};
export default generateFileValidationSchema;
