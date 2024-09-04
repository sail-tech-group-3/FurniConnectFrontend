/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom";

const Sidebar = ({ links }) => {
  return (
    <div className="hidden lg:flex px-10 py-20 flex-col w-[20rem] fixed top-[5rem] h-[calc(100svh-5rem)] bg-[#1E1F68]">
      {links.map((link, index) => (
        <NavLink
          key={index}
          to={link.path}
          end={true}
          className={({ isActive }) =>
            `font-bold text-sm flex mb-8 gap-4 text-white ${
              isActive ? "bg-[#2E3192] " : ""
            } p-2 rounded  `
          }
        >
          {link.icon}
          {link.label}
        </NavLink>
      ))}
    </div>
  );
};

export default Sidebar;
