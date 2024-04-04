import { North, South } from "@mui/icons-material";
import { Box, Chip, Stack, Typography } from "@mui/material";
import { TinyLineChart } from "../components";
import { formatNumber } from "../utils/formatNumber";
import PercentageArrow from "./PercentageArrow";

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
          <PercentageArrow percentage={50.2} />
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
