/* eslint-disable react/prop-types */

const DashboardOverviewCard = ({ products, users, orders }) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 ">
      <div className="bg-slate-800 p-10 w-full max-w-2xl text-center rounded-md cursor-pointer hover:bg-slate-700  transition-all">
        <h1 className="font-bold text-xl text-white">Number of Users</h1>
        <h3 className="font-bold text-xl mt-4 text-white">{users?.length}</h3>
      </div>
      <div className="bg-slate-800 p-10 w-full max-w-2xl text-center rounded-md cursor-pointer hover:bg-slate-700  transition-all">
        <h1 className="font-bold text-xl text-white">
          Number of Available Products
        </h1>
        <h3 className="font-bold mt-4 text-xl text-white">{products.length}</h3>
      </div>
      <div className="bg-slate-800  p-10 w-full max-w-2xl text-center rounded-md cursor-pointer hover:bg-slate-700  transition-all">
        <h1 className="font-bold text-xl text-white">Number of Orders</h1>
        <h3 className="font-bold mt-4 text-xl text-white">{orders}</h3>
      </div>
    </div>
  );
};

export default DashboardOverviewCard;
