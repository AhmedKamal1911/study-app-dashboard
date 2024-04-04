import React from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";

const SimpleLineChart = ({ data }) => {
  return (
    <ResponsiveContainer height={400} width="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="7" />
        <Legend />
        <XAxis dataKey="name" color="red" />
        <Tooltip />
        <Line
          tooltip={true}
          type="monotone"
          dataKey="pv"
          stroke="#8884d8"
          strokeWidth={3}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default SimpleLineChart;
