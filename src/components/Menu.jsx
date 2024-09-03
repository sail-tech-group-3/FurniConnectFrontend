/* eslint-disable react/prop-types */
import { CloseOutlined, DownOutlined, UpOutlined } from "@ant-design/icons";
import { useState } from "react";

const Menu = ({ onClick }) => {
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const toggleDashboard = () => setIsDashboardOpen(!isDashboardOpen);
  const toggleProfile = () => setIsProfileOpen(!isProfileOpen);

  return (
    <div className="h-[100svh] absolute top-0 left-0 w-[100vw] bg-slate-900 p-8 text-white">
      <div
        className="absolute right-8 top-8 text-2xl cursor-pointer"
        onClick={onClick}
      >
        <CloseOutlined className="text-white hover:text-red-500 transition duration-300" />
      </div>
      <div className="mt-20 space-y-8">
        {/* Dashboard Dropdown */}
        <div className="mb-4">
          <div
            onClick={toggleDashboard}
            className="cursor-pointer font-bold flex items-center justify-between bg-slate-800 p-3 rounded-lg hover:bg-slate-700 transition duration-300"
          >
            Dashboard
            {isDashboardOpen ? (
              <UpOutlined className="ml-2 text-white" />
            ) : (
              <DownOutlined className="ml-2 text-white" />
            )}
          </div>
          {isDashboardOpen && (
            <div className="pl-6 mt-2 space-y-2">
              <div className="text-sm bg-slate-800 p-2 rounded-md hover:bg-slate-700 transition duration-300">
                Create User
              </div>
              <div className="text-sm bg-slate-800 p-2 rounded-md hover:bg-slate-700 transition duration-300">
                Manage Users
              </div>
            </div>
          )}
        </div>

        {/* Profile Dropdown */}
        <div>
          <div
            onClick={toggleProfile}
            className="cursor-pointer font-bold flex items-center justify-between bg-slate-800 p-3 rounded-lg hover:bg-slate-700 transition duration-300"
          >
            Profile
            {isProfileOpen ? (
              <UpOutlined className="ml-2 text-white" />
            ) : (
              <DownOutlined className="ml-2 text-white" />
            )}
          </div>
          {isProfileOpen && (
            <div className="pl-6 mt-2 space-y-2">
              <div className="text-sm bg-slate-800 p-2 rounded-md hover:bg-slate-700 transition duration-300">
                View Profile
              </div>
              <div className="text-sm bg-slate-800 p-2 rounded-md hover:bg-slate-700 transition duration-300">
                Edit Profile
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu;
