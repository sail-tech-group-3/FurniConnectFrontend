import { Outlet } from "react-router-dom";
import { Navbar } from "../components";

const HomeLayout = () => {
  return (
    <div>
      <Navbar />
      <section className="py-10 lg:py-20 relative ">
        <Outlet />
      </section>
    </div>
  );
};

export default HomeLayout;
