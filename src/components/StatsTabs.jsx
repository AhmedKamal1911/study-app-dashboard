import { Stack, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { walletImg, paymentsImg, profitImg } from "../assets/images";

import { FinancialOverviewChart } from ".";
import { calculateTotal } from "../utils/calculateTotal";
const incomeData = [
  {
    name: "Jan",
    income: 5750,
  },
  {
    name: "Feb",

    income: 8200,
  },
  {
    name: "Mar",

    income: 12000,
  },
  {
    name: "Apr",

    income: 10000,
  },
  {
    name: "May",

    income: 18000,
  },
  {
    name: "Jun",

    income: 18500,
  },
  {
    name: "Jul",

    income: 22000,
  },
];
const expensesData = [
  {
    name: "Jan",
    expenses: 200,
  },
  {
    name: "Feb",

    expenses: 500,
  },
  {
    name: "Mar",

    expenses: 1200,
  },
  {
    name: "Apr",

    expenses: 2500,
  },
  {
    name: "May",

    expenses: 833,
  },
  {
    name: "Jun",

    expenses: 792,
  },
  {
    name: "Jul",

    expenses: 588,
  },
];
const profitData = [
  {
    name: "Jan",
    profit: 1000,
  },
  {
    name: "Feb",

    profit: 7837,
  },
  {
    name: "Mar",

    profit: 9000,
  },
  {
    name: "Apr",

    profit: 10000,
  },
  {
    name: "May",

    profit: 15000,
  },
  {
    name: "Jun",

    profit: 20000,
  },
  {
    name: "Jul",

    profit: 25000,
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

const totalChartData = {
  income: calculateTotal(incomeData, "income"),
  incomePercentage: "195.6",
  expenses: calculateTotal(expensesData, "expenses"),
  expensesPercentage: "-7",
  profit: calculateTotal(profitData, "profit"),
  profitPercentage: "87.8",
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
        total={totalChartData[statTab]}
        percentage={
          statTab === "income"
            ? totalChartData.incomePercentage
            : statTab === "expenses"
            ? totalChartData.expensesPercentage
            : totalChartData.profitPercentage
        }
      />
    </Stack>
  );
};

export default StatsTabs;
