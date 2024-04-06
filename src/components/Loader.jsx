import { Stack } from "@mui/material";
import Lottie from "lottie-react";
import React from "react";
import booksLoader from "../assets/lottiefiles-animations/loading.json";
const Loader = () => {
  return (
    <Stack
      bgcolor="background.paper"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Lottie
        style={{ maxWidth: "900px", height: "800px" }}
        animationData={booksLoader}
      />
    </Stack>
  );
};

export default Loader;
