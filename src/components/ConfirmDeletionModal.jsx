import { Box, Button, Stack, Typography } from "@mui/material";
import { useModal } from "../contexts/modalContext";
import CustomTextField from "./CustomTextField";
import { useAuth } from "../contexts/authContext";
import { useState } from "react";

const ConfirmDeletionModal = ({ onConfirm, title }) => {
  const { closeModal } = useModal();
  const {
    auth: { user },
  } = useAuth();
  const [confirmWord, setConfirmWord] = useState("");
  const handleModalConfirm = async () => {
    try {
      console.log("test");
      await onConfirm();

      closeModal();
    } catch (e) {}
  };
  return (
    <Box>
      <Typography color="dark" variant="h6" mb={2} textAlign="center">
        {title}
      </Typography>
      <Typography
        sx={{
          textTransform: "capitalize",
          color: "dark",
        }}
      >
        write your username :
      </Typography>
      <CustomTextField
        value={confirmWord}
        onChange={(e) => setConfirmWord(e.target.value)}
        fullWidth
        sx={{
          my: "15px",
          "& input": {
            padding: "8px",
          },
        }}
      />
      <Stack gap={2} direction="row">
        <Button
          color="success"
          fullWidth
          variant="contained"
          onClick={() => handleModalConfirm()}
          disabled={confirmWord !== user?.username}
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

export default ConfirmDeletionModal;
