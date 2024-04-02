import { Box, Stack } from "@mui/material";
import Lottie from "lottie-react";
import React from "react";
import booksLoader from "../assets/lottiefiles-animations/loading.json";
const Loader = () => {
  return (
    <Stack
      bgcolor="primary.dark"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Lottie
        style={{ maxWidth: "800px", height: "600px" }}
        animationData={booksLoader}
      />
    </Stack>
  );
};

export default Loader;
