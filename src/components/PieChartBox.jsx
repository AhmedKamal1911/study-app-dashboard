import { CurrencyBitcoin } from "@mui/icons-material";
import { useState } from "react";

import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell,
} from "recharts";
import { coursesData } from "../utils/constants/data";

const PieChartBox = () => {
  const [activeIndex, setActiveIndex] = useState(-1);

  function onPieEnter(_, index) {
    setActiveIndex(index);
  }
  function onPieLeave(_, index) {
    setActiveIndex(-1);
  }

  return (
    <ResponsiveContainer height={400}>
      <PieChart>
        <Pie
          dataKey="value"
          isAnimationActive={true}
          data={coursesData}
          cx="50%"
          cy="50%"
          fill="red"
          outerRadius={90}
          onPointerEnter={onPieEnter}
          onPointerLeave={onPieLeave}
        >
          {coursesData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={activeIndex === index ? "gold" : entry.color}
            />
          ))}
        </Pie>
        <Legend />
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};
export default PieChartBox;
