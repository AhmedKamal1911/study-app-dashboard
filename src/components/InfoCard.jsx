import { Box, IconButton, Stack, Typography } from "@mui/material";
import { MoreVert, North, South } from "@mui/icons-material";
import { formatNumber } from "../utils/formatNumber";

const InfoCard = ({ img, info, result, percentage }) => {
  return (
    <Box p={3}>
      <Stack direction="row" justifyContent="space-between" mb={2}>
        <img style={{ width: "42px", height: "42px" }} src={img} alt="" />
        <IconButton size="medium">
          <MoreVert fontSize="20px" />
        </IconButton>
      </Stack>
      <Box>
        <Typography color="lightDark">{info}</Typography>
        <Typography color="dark" my={1} variant="h5">
          ${formatNumber(result)}
        </Typography>
        <Stack
          direction="row"
          alignItems="center"
          color={percentage >= 0 ? "rgb(113,221,55)" : "red"}
          gap={1}
        >
          {percentage >= 0 ? (
            <North fontSize="15px" />
          ) : (
            <South fontSize="15px" />
          )}
          {percentage}%
        </Stack>
      </Box>
    </Box>
  );
};

export default InfoCard;
