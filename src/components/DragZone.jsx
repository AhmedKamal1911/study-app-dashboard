import { Close } from "@mui/icons-material";
import { Button } from "@mui/material";
import Lottie from "lottie-react";
import uploadFileAnimation from "../assets/lottiefiles-animations/upload-file.json";
import styled from "@emotion/styled";
import { useRef, useState } from "react";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const DragZone = ({ onChange, name }) => {
  const [selectedImageURL, setSelectedImageURL] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const alreadyDroppedRef = useRef(false);
  const dragzoneElRef = useRef(null);
  const fileInputRef = useRef(null);

  function closeCurrentViewedImage() {
    if (!fileInputRef.current) return;
    URL.revokeObjectURL(selectedImageURL);
    setSelectedImageURL("");
    // clearInputFileList();
    onChange(null);
    alreadyDroppedRef.current = false;
  }

  // function validateFileType(selectedFile) {
  //   const inputAcceptType = fileInputRef.current.accept.split("/")[0];
  //   const selectedFileType = selectedFile.type.split("/")[0];

  //   if (inputAcceptType !== selectedFileType) {
  //     console.log("Invalid file type: Please select an image file");
  //     return false;
  //   }

  //   return true;
  // }

  // function validateFileSize(selectedFile) {
  //   const maxFileSizeInMB = 2.5;
  //   const selectedFileSizeInMB = selectedFile.size / (1024 * 1024);

  //   if (selectedFileSizeInMB > maxFileSizeInMB) {
  //     console.log("Invalid file size: File size should be less than 2.5 MB");
  //     return false;
  //   }

  //   return true;
  // }

  // function clearInputFileList() {
  //   const emptyFileList = new DataTransfer().files;
  //   fileInputRef.current.files = emptyFileList;
  // }

  // function validateSelectedFile(selectedFile) {
  //   if (!selectedFile) {
  //     console.log("No file selected");
  //     return false;
  //   }

  //   const isValidType = validateFileType(selectedFile);
  //   const isValidSize = validateFileSize(selectedFile);

  //   if (!isValidType || !isValidSize) {
  //     clearInputFileList();
  //     // TODO: Show Proper Error Message
  //     return false;
  //   }

  //   return true;
  // }

  function handleInputFileChange(files) {
    // if (!fileInputRef.current || !files.length) return;

    const selectedFile = files[0];
    // if (!validateSelectedFile(selectedFile)) return;
    // validateFile.then(() =>

    // )
    console.log({ fileIs: selectedFile });
    onChange(selectedFile);
    // i want to set selectedImgURL only if the image is valid
    // setSelectedImageURL(URL.createObjectURL(selectedFile));
    // alreadyDroppedRef.current = true;
  }

  // function handleDrop(e) {
  //   e.preventDefault();
  //   setIsDragging(false);
  //   if (!fileInputRef.current || alreadyDroppedRef.current) return;
  //   const dt = e.dataTransfer;
  //   const files = dt.files;
  //   if (files.length > 1) {
  //     console.log("Only one image is accepted dont drag more than 1 image");
  //     // TODO: Show Proper Error Message
  //     return;
  //   }
  //   fileInputRef.current.files = files;
  //   handleInputFileChange(files);
  //   console.log({ droppedFiles: files, event: e });
  // }

  // function handleDragEnter() {
  //   setIsDragging(true);
  //   console.log("drag enter");
  // }

  // function handleDragLeave(e) {
  //   if (!dragzoneElRef.current) return;
  //   if (
  //     e.target === dragzoneElRef.current &&
  //     !dragzoneElRef.current.contains(e.relatedTarget)
  //   ) {
  //     setIsDragging(false);
  //   } else {
  //     setIsDragging(true);
  //   }
  //   console.log("drag leave", e);
  // }

  return (
    <div>
      <div
        style={{
          position: "relative",
          marginInline: "auto",
          maxWidth: "500px",
          aspectRatio: 1 / 0.8,
          border: selectedImageURL
            ? ""
            : !isDragging
            ? "2px dotted rgb(105, 108, 255) "
            : "2px dotted yellowgreen ",
          borderRadius: "4px",
          overflow: "hidden",
        }}
      >
        <label
          ref={dragzoneElRef}
          // onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          // onDragEnter={handleDragEnter}
          // onDragLeave={handleDragLeave}
          htmlFor="image-input"
          style={{
            cursor: "pointer",
            display: "block",
            height: "100%",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              textAlign: "center",
            }}
          >
            <Lottie animationData={uploadFileAnimation} />
          </div>
        </label>
        <VisuallyHiddenInput
          onChange={(e) => handleInputFileChange(e.target.files)}
          name={name}
          id="image-input"
          type="file"
          accept="image/*"
          ref={fileInputRef}
        />
        {selectedImageURL && (
          <>
            <img
              src={selectedImageURL}
              style={{
                position: "absolute",
                inset: "0",
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
              alt=""
            />
            <Button
              sx={{
                background: "#ff274b",
                border: "none",
                borderRadius: "6px",
                color: "white",
                position: "absolute",
                right: "5px",
                top: "5px",
                cursor: "pointer",
                pointerEvents: "auto",
                transition: "0.3s",

                "&:hover": {
                  background: "#ff274bc4",
                },
                "&": {
                  minWidth: "45px",
                },
              }}
              onClick={() => {
                closeCurrentViewedImage();
              }}
            >
              <Close />
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default DragZone;
