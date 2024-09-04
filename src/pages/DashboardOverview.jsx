import { useEffect } from "react";
import DashboardOverviewCard from "../components/DashboardOverviewCard";
import useProducts from "../customHooks/useProducts";
import useUsers from "../customHooks/useUsers";
import useOrder from "../customHooks/useOrder";
import PieChartComponent from "../components/PieChart";
import StackedBarChartComponent from "../components/BarChart";
import { SectionTitle } from "../components";
import { Tabs } from "antd";

const DashboardOverview = () => {
  const { products } = useProducts();
  const { users } = useUsers();
  const { total, fetchOrders } = useOrder();

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return (
    <>
      <SectionTitle text="Dashboard" />
      <div className="mt-10">
        <DashboardOverviewCard
          products={products}
          users={users}
          orders={total}
        />
        <div className="mt-10">
          <h2 className="text-xl font-bold mb-4">
            Total Registered Users, Products, and Orders
          </h2>
          <Tabs defaultActiveKey="1">
            <Tabs.TabPane tab="Pie Chart" key="1">
              <PieChartComponent
                users={users.length}
                products={products.length}
                orders={total}
              />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Bar Chart" key="2">
              <StackedBarChartComponent
                users={users.length}
                products={products.length}
                orders={total}
              />
            </Tabs.TabPane>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default DashboardOverview;
