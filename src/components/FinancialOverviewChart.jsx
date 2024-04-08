import { Box, Stack, Typography } from "@mui/material";
import { formatNumber } from "../utils";
import { PercentageArrow, SimpleLineChart } from ".";

const FinancialOverviewChart = ({ img, statName, total, data, percentage }) => {
  console.log(statName, "nanana");
  return (
    <Stack gap={2}>
      <Stack direction="row" gap={1}>
        <Box>
          <img style={{ width: "50px", height: "50px" }} src={img} alt="" />
        </Box>
        <Box>
          <Typography color="lightDark">Total {statName}</Typography>
          <Stack direction="row" gap={1}>
            <Typography color="dark" variant="h5">
              ${formatNumber(total)}
            </Typography>
            <PercentageArrow percentage={percentage} />
          </Stack>
        </Box>
      </Stack>
      <Box>
        <SimpleLineChart data={data} property={statName} />
      </Box>
    </Stack>
  );
};

export default FinancialOverviewChart;
