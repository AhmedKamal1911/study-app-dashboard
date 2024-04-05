import { Close } from '@mui/icons-material';
import { Button } from '@mui/material';
import Lottie from 'lottie-react';
import uploadFileAnimation from '../assets/lottiefiles-animations/upload-file.json';
import styled from '@emotion/styled';
import { useRef, useState } from 'react';
const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const DragZone = ({
  onChange,
  onBlur,
  onDrop,
  name,
  fileValidationSchema,
  error,
}) => {
  const [selectedImageURL, setSelectedImageURL] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const alreadyDroppedRef = useRef(false);
  const dragzoneElRef = useRef(null);
  const fileInputRef = useRef(null);

  function closeCurrentViewedImage() {
    if (!fileInputRef.current) return;
    URL.revokeObjectURL(selectedImageURL);
    setSelectedImageURL('');
    clearInputFileList();
    onChange(null);
    alreadyDroppedRef.current = false;
  }
  function clearInputFileList() {
    const emptyFileList = new DataTransfer().files;
    fileInputRef.current.files = emptyFileList;
  }
  function handleInputFileChange(file) {
    if (alreadyDroppedRef.current) return;
    onChange(file);
    if (!validateFile(file)) return;
    showPreviewImg(file);
    alreadyDroppedRef.current = true;
  }
  function showPreviewImg(file) {
    setSelectedImageURL(URL.createObjectURL(file));
  }
  function validateFile(file) {
    try {
      fileValidationSchema.validateSync(file);
      return true;
    } catch (e) {
      return false;
    }
  }
  function handleDrop(e) {
    e.preventDefault();
    setIsDragging(false);
    if (alreadyDroppedRef.current) return;
    const dt = e.dataTransfer;
    const files = dt.files;
    onDrop(files, handleInputFileChange);
  }

  function handleDragEnter() {
    setIsDragging(true);
    console.log('drag enter');
  }

  function handleDragLeave(e) {
    if (!dragzoneElRef.current) return;
    if (
      e.target === dragzoneElRef.current &&
      !dragzoneElRef.current.contains(e.relatedTarget)
    ) {
      setIsDragging(false);
    } else {
      setIsDragging(true);
    }
    console.log('drag leave', e);
  }

  return (
    <div>
      <div
        style={{
          position: 'relative',
          marginInline: 'auto',
          maxWidth: '500px',
          aspectRatio: 1 / 0.8,
          border: selectedImageURL
            ? ''
            : !isDragging
            ? '2px dotted rgb(105, 108, 255) '
            : '2px dotted yellowgreen ',
          borderRadius: '4px',
          overflow: 'hidden',
        }}
      >
        <label
          ref={dragzoneElRef}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          htmlFor="image-input"
          style={{
            cursor: 'pointer',
            display: 'block',
            height: '100%',
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
            }}
          >
            <Lottie animationData={uploadFileAnimation} />
          </div>
        </label>
        <VisuallyHiddenInput
          onChange={(e) => handleInputFileChange(e.target.files[0])}
          onBlur={onBlur}
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
                position: 'absolute',
                inset: '0',
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
              alt=""
            />
            <Button
              sx={{
                background: '#ff274b',
                border: 'none',
                borderRadius: '6px',
                color: 'white',
                position: 'absolute',
                right: '5px',
                top: '5px',
                cursor: 'pointer',
                pointerEvents: 'auto',
                transition: '0.3s',

                '&:hover': {
                  background: '#ff274bc4',
                },
                '&': {
                  minWidth: '45px',
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
      <p
        style={{
          color: 'red',
          textAlign: 'center',
        }}
      >
        {error}
      </p>
    </div>
  );
};

export default DragZone;
