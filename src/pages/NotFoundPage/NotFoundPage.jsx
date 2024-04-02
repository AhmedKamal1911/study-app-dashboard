import React from "react";

import notFound from "../../assets/lottiefiles-animations/not-found.json";

import { Stack } from "@mui/material";
import Lottie from "lottie-react";

const NotFoundPage = () => {
  return (
    <Stack justifyContent="center" alignItems="center" height="100vh">
      <Lottie
        animationData={notFound}
        style={{
          width: "100%",
          height: "500px",
        }}
      />
    </Stack>
  );
};

export default NotFoundPage;
