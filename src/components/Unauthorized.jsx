import { Stack, Typography } from "@mui/material";
import Lottie from "lottie-react";
import unauthorizedAnimationData from "../assets/lottiefiles-animations/unauthorized.json";
const Unauthorized = ({ message }) => {
  return (
    <Stack
      borderRadius="6px"
      p={2}
      minHeight="83.4vh"
      bgcolor="background.paper"
      alignItems="center"
      justifyContent="center"
    >
      <Lottie
        style={{
          maxWidth: "500px",
        }}
        animationData={unauthorizedAnimationData}
      />
      <Typography
        color="#ff5722f0"
        variant="h5"
        fontSize={{ xs: "20px", sm: "24px", md: "27px" }}
        textTransform="capitalize"
        fontWeight="bold"
        maxWidth="800px"
        textAlign="center"
      >
        {message}
      </Typography>
    </Stack>
  );
};

export default Unauthorized;
