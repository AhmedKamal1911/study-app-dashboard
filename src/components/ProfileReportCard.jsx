import { Box, Chip, Stack, Typography } from "@mui/material";
import { TinyLineChart, PercentageArrow } from "../components";
import { formatNumber } from "../utils";

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
            label="Year 2024"
            disabled={false}
            size="medium"
          />
        </Box>
        <Box>
          <PercentageArrow percentage={82.8} />
          <Typography color="dark" variant="h5">
            ${formatNumber(87837)}
          </Typography>
        </Box>
      </Box>
      <TinyLineChart />
    </Stack>
  );
};

export default ProfileReportCard;
