/* eslint-disable react/prop-types */
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Avatar, Dropdown, Menu, message, Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import avater from "../assets/avater.png";
import HamburgerMenu from "./Menu";

const Navbar = ({ role, user, cartCount }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleIsopen = () => {
    setIsOpen((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem("***");
    localStorage.removeItem("cartItems");
    message.success("Successfully logged out");
    navigate("/login");
  };

  const menu = (
    <Menu>
      <Menu.Item key="0">
        <button
          onClick={handleLogout}
          className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
        >
          Logout
        </button>
      </Menu.Item>
      <Menu.Item key="1">
        <NavLink
          to="/profile"
          className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
        >
          Profile
        </NavLink>
      </Menu.Item>
      {role === "admin" && (
        <Menu.Item key="2">
          <NavLink
            to="/dashboard"
            className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
          >
            Dashboard
          </NavLink>
        </Menu.Item>
      )}
    </Menu>
  );

  return (
    <nav className="bg-[#F6F6F6] fixed w-full z-10">
      <div className="align-element gap-10 h-20 flex justify-between items-center relative">
        <Link to="/">
          <span className="text-[#1B1D21] font-bold text-sm lg:text-2xl">
            FurniConnect
          </span>
        </Link>

        <div className="flex item-center gap-5 lg:hidden">
          <NavLink
            to="/cart"
            className="text-[#1B1D21] font-bold  p-2 px-3 rounded text-sm"
          >
            Cart
            <span className="bg-[#2E3192] absolute top-5 text-white rounded-full px-2 py-1 text-xs">
              {cartCount}
            </span>
          </NavLink>
          {user && (
            <Dropdown overlay={menu} trigger={["click"]}>
              <Avatar
                src={`${user.photo || avater}`}
                className="w-8 h-8 rounded-full cursor-pointer"
              />
            </Dropdown>
          )}
          <button
            onClick={handleIsopen}
            className="text-black font-bold text-xl"
          >
            <MenuOutlined />
          </button>
        </div>

        {isOpen && (
          <HamburgerMenu onClick={handleIsopen} role={role} user={user} />
        )}

        <div className="hidden lg:flex gap-8 items-center">
          <NavLink
            to="/products"
            className="text-[#1B1D21] font-bold text-lg  p-2 px-3 rounded"
          >
            Products
          </NavLink>
          <NavLink
            to="/about"
            className="text-[#1B1D21] font-bold text-lg  p-2 px-3 rounded"
          >
            About
          </NavLink>

          <NavLink
            to="/cart"
            className="text-[#1B1D21] font-bold text-lg  p-2 px-3 rounded"
          >
            Cart
            <span className="bg-[#2E3192] absolute top-4 text-white rounded-full px-2 py-1 text-xs">
              {cartCount}
            </span>
          </NavLink>
          {user && (
            <NavLink
              to="/checkout"
              className="text-[#1B1D21] font-bold text-lg  p-2 px-3 rounded"
            >
              Checkout
            </NavLink>
          )}
          {!user && (
            <NavLink
              to="/login"
              className="text-[#1B1D21] font-bold text-lg  p-2  rounded"
            >
              <Button type="primary" className="px-8 bg-[#2E3192]">
                {" "}
                Login
              </Button>
            </NavLink>
          )}

          {user && (
            <Dropdown overlay={menu} trigger={["hover"]}>
              <Avatar
                src={`${user.photo || avater}`}
                className="w-10 h-10 rounded-full cursor-pointer"
              />
            </Dropdown>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
