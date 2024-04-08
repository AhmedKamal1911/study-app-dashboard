import { North, South } from "@mui/icons-material";
import { Stack } from "@mui/material";

const PercentageArrow = ({ percentage }) => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      color={percentage >= 0 ? "rgb(113,221,55)" : "red"}
      gap={0.5}
    >
      {percentage >= 0 ? <North fontSize="15px" /> : <South fontSize="15px" />}
      {percentage}%
    </Stack>
  );
};

export default PercentageArrow;
