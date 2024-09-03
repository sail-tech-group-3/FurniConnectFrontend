import DashboardOverviewCard from "../components/DashboardOverviewCard";
import useProducts from "../customHooks/useProducts";
import useUsers from "../customHooks/useUsers";
import useOrder from "../customHooks/useOrder";
import { useEffect } from "react";
import PieChart from "../components/PieChart";
import { SectionTitle } from "../components";

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
            Total Registered Users and Products
          </h2>
          <PieChart
            users={users.length}
            products={products.length}
            orders={total}
          />
        </div>
      </div>
    </>
  );
};

export default DashboardOverview;
