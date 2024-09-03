/* eslint-disable react/prop-types */
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const PieChartComponent = ({ users, products, orders }) => {
  const data = [
    { name: "Users", value: users },
    { name: "Products", value: products },
    { name: "Orders", value: orders },
  ];

  const COLORS = ["#5B8FF9", "#5AD8A6", "#F6BD16"];

  return (
    <div className="flex justify-center items-center h-full">
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={100}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default PieChartComponent;
