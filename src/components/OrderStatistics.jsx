import { Box, Typography } from "@mui/material";
import BoxHeader from "./BoxHeader";
import { formatNumber } from "../utils/formatNumber";

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
