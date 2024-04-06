import { Box, Typography } from "@mui/material";

const Unauthorized = ({ message }) => {
  return (
    <Box minHeight="83.4vh">
      <Typography>{message}</Typography>
    </Box>
  );
};

export default Unauthorized;
