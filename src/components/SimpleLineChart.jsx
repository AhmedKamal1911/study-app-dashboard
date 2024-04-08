import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";

const SimpleLineChart = ({ data, property }) => {
  return (
    <ResponsiveContainer height={500} width="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="0.1" />
        <Legend />
        <XAxis dataKey="name" color="red" />
        <Tooltip />
        <Line
          tooltip={true}
          type="monotone"
          dataKey={property}
          stroke="#3884d6"
          strokeWidth={3}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default SimpleLineChart;
