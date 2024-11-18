import { Box, Button, Stack, Typography } from "@mui/material";
import { useModal } from "../contexts/modalContext";
import { useState } from "react";

const ConfirmModal = ({ onConfirm, title }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { closeModal } = useModal();
  const handleModalConfirm = async () => {
    try {
      setIsLoading(true);
      await onConfirm();
      closeModal();
    } catch (e) {
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Box>
      <Typography color="dark" variant="h5" mb={2} textAlign="center">
        {title}
      </Typography>
      <Stack gap={2} direction="row">
        <Button
          color="success"
          fullWidth
          variant="contained"
          disabled={isLoading}
          onClick={() => handleModalConfirm()}
        >
          {isLoading ? "Confirming..." : "Confirm"}
        </Button>
        <Button
          color="warning"
          fullWidth
          variant="outlined"
          disabled={isLoading}
          onClick={() => closeModal()}
        >
          Cancel
        </Button>
      </Stack>
    </Box>
  );
};

export default ConfirmModal;
