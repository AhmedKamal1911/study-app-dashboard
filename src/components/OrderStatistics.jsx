import { Box, Typography } from "@mui/material";
import { BoxHeader } from ".";
import { formatNumber } from "../utils";

const OrderStatistics = ({ totalSales }) => {
  return (
    <Box>
      <BoxHeader title={"Order Statistics"}>
        <Typography variant="body1" color="lightDark">
          {formatNumber(totalSales)}K Total Sales
        </Typography>
      </BoxHeader>
    </Box>
  );
};

export default OrderStatistics;
