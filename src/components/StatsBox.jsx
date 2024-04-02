import { Box, Stack, Typography } from "@mui/material";
import React from "react";

const StatsBox = ({ itemImg, subTitle, itemTitle, total }) => {
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Box>
        <img
          style={{
            width: "40px",
            height: "40px",
          }}
          src={itemImg}
          alt=""
        />
      </Box>
      <Box flex={1} ml={2}>
        <Typography variant="body1" fontSize="15px" color="lightDark">
          {subTitle}
        </Typography>
        <Typography variant="h6" fontSize="17px" color="dark">
          {itemTitle}
        </Typography>
      </Box>
      <Typography
        variant="h6"
        color="dark"
        display="flex"
        alignItems="center"
        fontSize="17px"
        gap={0.5}
      >
        +${total}
        <Typography color="lightDark" fontSize="inherit">
          USD
        </Typography>
      </Typography>
    </Stack>
  );
};

export default StatsBox;
