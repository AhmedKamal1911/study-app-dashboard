import { Typography } from "@mui/material";
const FieldError = ({ errorText }) => {
  return (
    <Typography
      sx={{
        color: "red",
        mt: "10px",
        fontSize: "14px",
      }}
    >
      {errorText}
    </Typography>
  );
};

export default FieldError;
