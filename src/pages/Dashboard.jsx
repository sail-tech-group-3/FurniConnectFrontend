import {
  AppstoreAddOutlined,
  UserOutlined,
  UserAddOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Sidebar } from "../components";
import { Outlet } from "react-router-dom";

const dashboardLinks = [
  { path: "/dashboard", label: "Overview", icon: <UserOutlined /> },
  {
    path: "/dashboard/products",
    label: "Manage Products",
    icon: <AppstoreAddOutlined />,
  },
  {
    path: "/dashboard/users",
    label: "Manage Users",
    icon: <SettingOutlined />,
  },
  {
    path: "/dashboard/createUser",
    label: "Create Users",
    icon: <UserAddOutlined />,
  },
  {
    path: "/dashboard/orderHistory",
    label: "Order History",
    icon: <UserAddOutlined />,
  },
];

const Dashboard = () => {
  return (
    <>
      <Sidebar links={dashboardLinks} />
      <div className="px-4 py-20 lg:ml-[20rem] lg:px-10">
        <Outlet />
      </div>
    </>
  );
};

export default Dashboard;
