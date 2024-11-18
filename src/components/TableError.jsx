import { Stack, Typography } from "@mui/material";
import React from "react";

const TableError = ({ errorText }) => {
  return (
    <Stack
      sx={{
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          color: "red",
          fontSize: { xs: "17px", sm: "25px" },
          textAlign: "center",
        }}
      >
        {errorText}
      </Typography>
    </Stack>
  );
};

export default TableError;
