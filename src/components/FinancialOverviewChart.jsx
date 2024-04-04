import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import { formatNumber } from "../utils/formatNumber";
import PercentageArrow from "./PercentageArrow";
import SimpleLineChart from "./SimpleLineChart";

const FinancialOverviewChart = ({ img, statName, total, data }) => {
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
            <PercentageArrow percentage={65} />
          </Stack>
        </Box>
      </Stack>
      <Box>
        <SimpleLineChart data={data} />
      </Box>
    </Stack>
  );
};

export default FinancialOverviewChart;
