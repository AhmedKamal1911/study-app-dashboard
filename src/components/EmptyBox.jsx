import Lottie from "lottie-react";
import emptyCart from "../assets/lottiefiles-animations/emptyCart.json";
import { Stack } from "@mui/system";
import { Typography } from "@mui/material";

const EmptyBox = ({ text }) => {
  return (
    <Stack sx={{ justifyContent: "center", alignItems: "center" }}>
      <Lottie
        style={{ maxWidth: "900px", height: "500px" }}
        animationData={emptyCart}
      />
      <Typography
        variant="h4"
        sx={{
          color: "red",
          textAlign: "center",
          fontWeight: "bold",
          fontSize: { xs: "20px", sm: "28px" },
        }}
      >
        {text}
      </Typography>
    </Stack>
  );
};

export default EmptyBox;
