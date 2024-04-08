import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Jan",
    end: 4000,
    beg: 2400,
    amt: 2400,
  },
  {
    name: "Feb",
    end: 3000,
    beg: 1398,
    amt: 2210,
  },
  {
    name: "Mar",
    end: 5200,
    beg: 3000,
    amt: 2290,
  },
  {
    name: "Apr",
    end: 2780,
    beg: 3908,
    amt: 2000,
  },
  {
    name: "Jun",
    end: 3400,
    beg: 2500,
    amt: 2181,
  },
  {
    name: "Jul",
    end: 2390,
    beg: 3800,
    amt: 2500,
  },
];

const BarChartBox = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        width={500}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar
          dataKey="beg"
          fill="#8884d8"
          activeBar={<Rectangle fill="#2196F3" />}
        />
        <Bar
          dataKey="end"
          fill="#8eea9d"
          activeBar={<Rectangle fill="#e91e74" />}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartBox;
