/* eslint-disable react/prop-types */

const DashboardOverviewCard = ({ products, users, orders }) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 ">
      <div className="bg-[#FFEBA4] p-10 w-full max-w-2xl text-center rounded-md cursor-pointer hover:bg-[#fde99e] transition-all">
        <h1 className="font-bold text-md text-black">Number of Users</h1>
        <h3 className="font-bold text-xl mt-4 text-black">{users?.length}</h3>
      </div>
      <div className="bg-[#BAEDBF] p-10 w-full max-w-2xl text-center rounded-md cursor-pointer hover:bg-[#b6eebb]  transition-all">
        <h1 className="font-bold text-md text-black">
          Number of Available Products
        </h1>
        <h3 className="font-bold mt-4 text-xl text-black">{products.length}</h3>
      </div>
      <div className="bg-[#E7F2FF]  p-10 w-full max-w-2xl text-center rounded-md cursor-pointer hover:bg-[#ddeafa]  transition-all">
        <h1 className="font-bold text-md text-blacke">Number of Orders</h1>
        <h3 className="font-bold mt-4 text-xl text-black">{orders}</h3>
      </div>
    </div>
  );
};

export default DashboardOverviewCard;
