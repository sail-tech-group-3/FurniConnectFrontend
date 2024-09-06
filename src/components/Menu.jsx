/* eslint-disable react/prop-types */
import { CloseOutlined, DownOutlined, UpOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import { Button } from "antd";
import { useState } from "react";

const MenuComponent = ({ onClick, role, user }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
    if (isDashboardOpen) {
      setIsDashboardOpen(false);
    }
  };

  const toggleDashboard = () => {
    setIsDashboardOpen(!isDashboardOpen);
    if (isProfileOpen) {
      setIsProfileOpen(false);
    }
  };

  return (
    <div className="min-h-[100svh] absolute top-0 left-0 w-[100vw] bg-white p-8 ">
      <div
        className="absolute right-8 top-8 text-2xl cursor-pointer"
        onClick={onClick}
      >
        <CloseOutlined className="text-black font-bold" />
      </div>
      <div className="mt-20  grid">
        <NavLink
          to="/products"
          className="text-[#1B1D21] font-semibold text-lg border-b-2 py-3"
          onClick={onClick}
        >
          Products
        </NavLink>
        <NavLink
          to="/about"
          className="text-[#1B1D21] font-semibold text-lg border-b-2 py-3 "
          onClick={onClick}
        >
          About
        </NavLink>

        {/* Profile Dropdown */}
        {user && (
          <div>
            <div
              className="text-[#1B1D21]  font-semibold text-lg border-b-2 py-3 cursor-pointer flex items-center justify-between"
              onClick={toggleProfile}
            >
              Profile{" "}
              {isProfileOpen ? (
                <UpOutlined className="text-sm font-bold" />
              ) : (
                <DownOutlined className="text-sm font-bold" />
              )}
            </div>
            {isProfileOpen && (
              <div className=" pl-4 grid">
                <NavLink
                  to="/profile"
                  onClick={onClick}
                  className="text-[#1B1D21] font-semibold text-lg border-b-2 py-3 "
                >
                  Profile
                </NavLink>
                <NavLink
                  to="/profile/createProduct"
                  onClick={onClick}
                  className="text-[#1B1D21] font-semibold text-lg border-b-2 py-3 "
                >
                  Create Product
                </NavLink>
                <NavLink
                  to="/profile/changePassword"
                  onClick={onClick}
                  className="text-[#1B1D21] font-semibold text-lg border-b-2 py-3 "
                >
                  Change Password
                </NavLink>
                <NavLink
                  to="/profile/createdProducts"
                  onClick={onClick}
                  className="text-[#1B1D21] font-semibold text-lg border-b-2 py-3 "
                >
                  Created Products
                </NavLink>
                <NavLink
                  to="/profile/orderHistory"
                  onClick={onClick}
                  className="text-[#1B1D21] font-semibold text-lg border-b-2 py-3 "
                >
                  Order History
                </NavLink>
              </div>
            )}
          </div>
        )}

        {/* Dashboard Dropdown */}
        {role === "admin" && (
          <div>
            <div
              className="text-[#1B1D21] font-semibold text-lg border-b-2 py-3 cursor-pointer flex items-center justify-between"
              onClick={toggleDashboard}
            >
              Dashboard{" "}
              {isDashboardOpen ? (
                <UpOutlined className="text-sm font-bold" />
              ) : (
                <DownOutlined className="text-sm font-bold" />
              )}
            </div>
            {isDashboardOpen && (
              <div className="pl-4 grid">
                <NavLink
                  to="/dashboard/users"
                  onClick={onClick}
                  className="text-[#1B1D21] font-semibold text-lg border-b-2 py-3 "
                >
                  Manage Users
                </NavLink>
                <NavLink
                  to="/dashboard/products"
                  onClick={onClick}
                  className="text-[#1B1D21] font-semibold text-lg border-b-2 py-3 "
                >
                  Manage Products
                </NavLink>
                <NavLink
                  to="/dashboard/orderHistory"
                  onClick={onClick}
                  className="text-[#1B1D21] font-semibold text-lg border-b-2 py-3 "
                >
                  Orders
                </NavLink>
                <NavLink
                  to="/dashboard/createUser"
                  onClick={onClick}
                  className="text-[#1B1D21] font-semibold text-lg border-b-2 py-3 "
                >
                  Create User
                </NavLink>
              </div>
            )}
          </div>
        )}

        {/* Login Button */}
        {!user && (
          <NavLink
            to="/login"
            className="text-[#1B1D21] font-bold text-lg p-2 rounded"
            onClick={onClick}
          >
            <Button type="primary" className="px-8">
              Login
            </Button>
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default MenuComponent;
