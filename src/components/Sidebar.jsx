/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom";

const Sidebar = ({ links }) => {
  return (
    <div className="hidden lg:flex px-10 py-20 flex-col w-[20rem] fixed top-[5rem] h-[calc(100svh-5rem)] bg-slate-100">
      {links.map((link, index) => (
        <NavLink
          key={index}
          to={link.path}
          end={true}
          className={({ isActive }) =>
            `font-bold text-lg flex mb-8 gap-4 ${
              isActive ? "bg-blue-500 text-white" : "text-black"
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
