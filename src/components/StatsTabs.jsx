import { Box, Stack, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";
import SimpleLineChart from "./SimpleLineChart";
import { walletImg, paymentsImg, profitImg } from "../assets/images";
import { formatNumber } from "../utils/formatNumber";
import PercentageArrow from "./PercentageArrow";
import FinancialOverviewChart from "./FinancialOverviewChart";
const incomeData = [
  {
    name: "Jan",
    pv: 1000,
  },
  {
    name: "Feb",

    pv: 1398,
  },
  {
    name: "Mar",

    pv: 9800,
  },
  {
    name: "Apr",

    pv: 3908,
  },
  {
    name: "May",

    pv: 4800,
  },
  {
    name: "Jun",

    pv: 3800,
  },
  {
    name: "Jul",

    pv: 4300,
  },
];
const expensesData = [
  {
    name: "Jan",
    pv: 800,
  },
  {
    name: "Feb",

    pv: 2000,
  },
  {
    name: "Mar",

    pv: 5000,
  },
  {
    name: "Apr",

    pv: 2500,
  },
  {
    name: "May",

    pv: 4800,
  },
  {
    name: "Jun",

    pv: 3800,
  },
  {
    name: "Jul",

    pv: 4300,
  },
];
const profitData = [
  {
    name: "Jan",
    pv: 1600,
  },
  {
    name: "Feb",

    pv: 4000,
  },
  {
    name: "Mar",

    pv: 2000,
  },
  {
    name: "Apr",

    pv: 2500,
  },
  {
    name: "May",

    pv: 3500,
  },
  {
    name: "Jun",

    pv: 3000,
  },
  {
    name: "Jul",

    pv: 4300,
  },
];
const images = {
  income: walletImg,
  expenses: paymentsImg,
  profit: profitImg,
};
const chartData = {
  income: incomeData,
  expenses: expensesData,
  profit: profitData,
};
function getListSum(chartData) {
  return chartData.reduce((accumlator, current) => accumlator + current, 0);
}
const totalChartData = {
  income: incomeData,
  expenses: expensesData,
  profit: profitData,
};
const StatsTabs = () => {
  const [statTab, setStatTab] = useState("income");

  const handleChange = (event, newValue) => {
    setStatTab(newValue);
  };

  return (
    <Stack gap={3} direction="column">
      <Tabs
        value={statTab}
        onChange={handleChange}
        textColor="primary"
        indicatorColor="primary"
        aria-label="secondary tabs example"
      >
        <Tab value="income" label="INCOME" />
        <Tab value="expenses" label="EXPENSES" />
        <Tab value="profit" label="PROFIT" />
      </Tabs>
      <FinancialOverviewChart
        img={images[statTab]}
        statName={statTab}
        data={chartData[statTab]}
      />
      {/* TODO:Create Total Value pv  */}
    </Stack>
  );
};

export default StatsTabs;
