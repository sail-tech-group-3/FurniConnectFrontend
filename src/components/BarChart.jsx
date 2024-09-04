/* eslint-disable react/prop-types */
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";

const StackedBarChartComponent = ({ users, products, orders }) => {
  const data = [
    { name: "Users", users },
    { name: "Products", products },
    { name: "Orders", orders },
  ];

  return (
    <div className="flex justify-center items-center h-full">
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="users" stackId="a" fill="#FFEBA4" />
        <Bar dataKey="products" stackId="a" fill="#BAEDBF" />
        <Bar dataKey="orders" stackId="a" fill="#E7F2FF" />
      </BarChart>
    </div>
  );
};

export default StackedBarChartComponent;
