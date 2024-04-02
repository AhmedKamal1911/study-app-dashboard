import { MoreVert } from "@mui/icons-material";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import React from "react";

const BoxHeader = ({ children, title }) => {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignSelf="flex-start"
      mb={2}
    >
      <Box>
        <Typography variant="h5" color="dark" mb={1}>
          {title}
        </Typography>
        {children}
      </Box>
      <IconButton sx={{ alignSelf: "flex-start" }} size="medium">
        <MoreVert fontSize="20px" />
      </IconButton>
    </Stack>
  );
};

export default BoxHeader;
