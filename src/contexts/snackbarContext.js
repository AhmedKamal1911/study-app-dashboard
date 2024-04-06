import { createContext, useContext, useState } from "react";

import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
const SnackBarContext = createContext();

const SnackBarProvider = ({ children }) => {
  // states
  const [snackbarOptions, setSnackbarOptions] = useState({
    visibility: false,
    message: "Empty",
    status: "success",
    duration: 5000,
  });
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOptions({ ...snackbarOptions, visibility: false });
  };
  function openSnackbar(message, status = "success", duration = 3000) {
    setSnackbarOptions({ message, visibility: true, status, duration });
  }

  return (
    <SnackBarContext.Provider value={{ openSnackbar }}>
      <Snackbar
        open={snackbarOptions.visibility}
        autoHideDuration={snackbarOptions.duration}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleClose}
          severity={snackbarOptions.status}
          variant="filled"
          sx={{ width: "100%", color: "white" }}
        >
          {snackbarOptions.message}
        </Alert>
      </Snackbar>
      {children}
    </SnackBarContext.Provider>
  );
};
export const useSnackbar = () => useContext(SnackBarContext);
export default SnackBarProvider;
