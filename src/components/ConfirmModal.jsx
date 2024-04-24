import { Box, Button, Stack, Typography } from "@mui/material";
import { useModal } from "../contexts/modalContext";

const ConfirmModal = ({ onConfirm, title }) => {
  const { closeModal } = useModal();
  const handleModalConfirm = async () => {
    try {
      await onConfirm();
      closeModal();
    } catch (e) {}
  };
  return (
    <Box>
      <Typography variant="h5" mb={2} textAlign="center">
        {title}
      </Typography>
      <Stack gap={2} direction="row">
        <Button
          color="success"
          fullWidth
          variant="contained"
          onClick={() => handleModalConfirm()}
        >
          Confirm
        </Button>
        <Button
          color="warning"
          fullWidth
          variant="outlined"
          onClick={() => closeModal()}
        >
          Cancel
        </Button>
      </Stack>
    </Box>
  );
};

export default ConfirmModal;
