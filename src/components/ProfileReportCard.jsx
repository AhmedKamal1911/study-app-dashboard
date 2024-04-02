import { North, South } from "@mui/icons-material";
import { Box, Chip, Stack, Typography } from "@mui/material";
import { TinyLineChart } from "../components";
import { formatNumber } from "../utils/formatNumber";

const ProfileReportCard = () => {
  return (
    <Stack direction="row" gap={1}>
      <Box>
        <Box mb={2}>
          <Typography
            mb={1}
            variant="h5"
            color="dark"
            sx={{
              textWrap: "nowrap",
            }}
          >
            Profile Report
          </Typography>
          <Chip
            color="error"
            label="Year 2022"
            disabled={false}
            size="medium"
          />
        </Box>
        <Box>
          <Stack
            direction="row"
            alignItems="center"
            color={50.2 >= 0 ? "rgb(113,221,55)" : "red"}
            gap={1}
          >
            {50.2 >= 0 ? <North fontSize="15px" /> : <South fontSize="15px" />}
            {50.2}%
          </Stack>
          <Typography color="dark" variant="h5">
            ${formatNumber(50500)}
          </Typography>
        </Box>
      </Box>
      <TinyLineChart />
    </Stack>
  );
};

export default ProfileReportCard;
