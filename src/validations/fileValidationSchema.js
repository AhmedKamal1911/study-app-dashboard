import * as Yup from "yup";
const generateFileValidationSchema = (
  sizeInMB = 2.5,
  imageType = "Course",
  isRequired
) => {
  return Yup.mixed()
    [isRequired ? "required" : "nullable"](
      isRequired ? `${imageType} image is required` : undefined
    )
    .test("fileType", "Invalid file type, file must be an image", (value) => {
      if (!isRequired && !value) return true;
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
        if (!isRequired && !value) return true;
        const maxFileSizeInMB = sizeInMB;
        const selectedFileSizeInMB = value.size / (1024 * 1024);
        return selectedFileSizeInMB <= maxFileSizeInMB;
      }
    );
};
export default generateFileValidationSchema;
