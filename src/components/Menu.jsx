/* eslint-disable react/prop-types */
import { CloseOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import { useAuth } from "../customHooks/useAuth";
import { Button } from "antd";

const Menu = ({ onClick }) => {
  const { role, user } = useAuth();
  return (
    <div className="h-[100svh] absolute top-0 left-0 w-[100vw] bg-white p-8 ">
      <div
        className="absolute right-8 top-8 text-2xl cursor-pointer "
        onClick={onClick}
      >
        <CloseOutlined className="text-black font-bold" />
      </div>
      <div className="mt-20 space-y-8 grid">
        <NavLink
          to="/products"
          className="text-[#1B1D21] font-semibold text-lg border-b-2 pb-4"
          onClick={onClick}
        >
          Products
        </NavLink>
        <NavLink
          to="/about"
          className="text-[#1B1D21] font-semibold text-lg border-b-2 pb-4 "
          onClick={onClick}
        >
          About
        </NavLink>
        {user && (
          <NavLink
            to="/profile"
            className="text-[#1B1D21] font-semibold text-lg border-b-2 pb-4 "
            onClick={onClick}
          >
            Profile
          </NavLink>
        )}

        {!user && (
          <NavLink
            to="/login"
            className="text-[#1B1D21] font-bold text-lg  p-2  rounded"
            onClick={onClick}
          >
            <Button type="primary" className="px-8">
              {" "}
              login
            </Button>
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default Menu;
