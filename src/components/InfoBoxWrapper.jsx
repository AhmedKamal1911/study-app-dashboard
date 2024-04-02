import { Box, Typography } from "@mui/material";

const InfoBoxWrapper = ({ title, children }) => {
  return (
    <Box borderRadius={2}>
      <Typography
        variant="h5"
        fontWeight="bold"
        color="dark"
        mb={3}
        sx={{
          pb: "8px",
          borderBottom: (theme) => `2px solid ${theme.palette.lightDark}`,
        }}
      >
        {title}
      </Typography>
      {children}
    </Box>
  );
};

export default InfoBoxWrapper;
