import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../customHooks/useAuth";
import { useState, useEffect } from "react";
import { Avatar, message } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import avater from "../assets/avater.png";
import Menu from "./Menu";

const Navbar = () => {
  const { role, user } = useAuth();
  const [cartCount, setCartCount] = useState(0);
  const [showLogout, setShowLogout] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleIsopen = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const totalItems = storedCartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );
    setCartCount(totalItems);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("***");
    localStorage.removeItem("cartItems");
    message.success("Successfully logged out");
    navigate("/login");
  };

  return (
    <nav className="bg-slate-900 fixed w-full z-10">
      <div className="align-element gap-10 h-20 flex justify-between items-center relative">
        <Link to="/">
          <span className="text-white font-bold text-xl lg:text-2xl ">
            FurniConnect
          </span>
        </Link>

        <div className="flex gap-5 lg:hidden">
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `text-white font-bold text-lg px-3 p-2 ${
                isActive ? "text-blue-500 text-bold rounded" : ""
              }`
            }
          >
            Cart{" "}
            {cartCount > 0 ? (
              <span className="bg-blue-500 absolute top-5 text-white rounded-full px-2 py-1 text-xs">
                {cartCount}
              </span>
            ) : (
              <span className="bg-blue-500 absolute top-5 text-white rounded-full px-2 py-1 text-xs">
                0
              </span>
            )}
          </NavLink>
          <button onClick={handleIsopen} className="text-white text-xl">
            <MenuOutlined />
          </button>
        </div>

        {isOpen && <Menu onClick={handleIsopen} />}

        <div className="hidden lg:flex gap-8 items-center">
          <NavLink
            to="/products"
            className={({ isActive }) =>
              `text-white font-bold text-lg ${
                isActive ? "text-blue-500 text-bold p-2 px-3 rounded" : ""
              }`
            }
          >
            Products
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `text-white font-bold text-lg px-3 p-2 ${
                isActive ? "text-blue-500 text-bold rounded" : ""
              }`
            }
          >
            About
          </NavLink>

          {user && (
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `text-white font-bold text-lg p-2 px-3 ${
                  isActive ? "text-blue-500 text-bold rounded" : ""
                }`
              }
            >
              Profile
            </NavLink>
          )}
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `text-white font-bold text-lg px-3 p-2 ${
                isActive ? "text-blue-500 text-bold rounded" : ""
              }`
            }
          >
            Cart{" "}
            {cartCount > 0 ? (
              <span className="bg-blue-500 absolute top-0 text-white rounded-full px-2 py-1 text-xs">
                {cartCount}
              </span>
            ) : (
              <span className="bg-blue-500 absolute top-5 ml-1 text-white rounded-full px-2 py-1 text-xs">
                0
              </span>
            )}
          </NavLink>
          <NavLink
            to="/checkout"
            className={({ isActive }) =>
              `text-white font-bold text-lg p-2 px-3 ${
                isActive ? "text-blue-500 text-bold rounded" : ""
              }`
            }
          >
            Checkout
          </NavLink>
          {role === "admin" && (
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `text-white font-bold text-lg p-2 px-3 ${
                  isActive ? "text-blue-500 text-bold rounded" : ""
                }`
              }
            >
              Dashboard
            </NavLink>
          )}

          {user && (
            <div
              className="relative w-10 h-10"
              onMouseEnter={() => setShowLogout(true)}
              onMouseLeave={() => setShowLogout(false)}
            >
              <Avatar
                src={`${user.photo || avater}`}
                className="w-full h-full rounded-full cursor-pointer"
              />
              {showLogout && (
                <div
                  className="absolute right-0 mt-0 w-24 bg-white rounded-md shadow-lg py-2"
                  onMouseEnter={() => setShowLogout(true)}
                  onMouseLeave={() => setShowLogout(false)}
                >
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
