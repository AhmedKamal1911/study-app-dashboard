import { Box, IconButton, Stack, Typography } from "@mui/material";
import { MoreVert, North, South } from "@mui/icons-material";
import { formatNumber } from "../utils/formatNumber";
import PercentageArrow from "./PercentageArrow";

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
        <PercentageArrow percentage={percentage} />
      </Box>
    </Box>
  );
};

export default InfoCard;
