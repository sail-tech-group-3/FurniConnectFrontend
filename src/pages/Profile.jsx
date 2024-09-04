import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import {
  UserOutlined,
  LockOutlined,
  AppstoreAddOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";

const profileLinks = [
  { path: "/profile", label: "Update Profile", icon: <UserOutlined /> },
  { path: "changePassword", label: "Change Password", icon: <LockOutlined /> },
  {
    path: "createdProducts",
    label: "Created Products",
    icon: <AppstoreAddOutlined />,
  },
  {
    path: "createProduct",
    label: "Create A Product",
    icon: <PlusCircleOutlined />,
  },
  {
    path: "orderHistory",
    label: "Order History",
    icon: <PlusCircleOutlined />,
  },
];

function Profile() {
  return (
    <div>
      <Sidebar links={profileLinks} />
      <div className="px-4 py-14 lg:ml-[20rem] lg:px-20">
        <Outlet />
      </div>
    </div>
  );
}

export default Profile;
