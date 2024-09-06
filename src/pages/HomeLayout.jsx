/* eslint-disable react/prop-types */
import { Outlet } from "react-router-dom";
import { Navbar } from "../components";
import { useAuth } from "../customHooks/useAuth";

const HomeLayout = ({ cartCount }) => {
  const { user, role } = useAuth();

  return (
    <div>
      <Navbar user={user} role={role} cartCount={cartCount} />
      <section className="py-10 lg:py-20 relative ">
        <Outlet />
      </section>
    </div>
  );
};

export default HomeLayout;
