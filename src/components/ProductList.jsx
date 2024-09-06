import { useEffect, useState } from "react";
import { axiosInstance, formatPrice } from "../utils";

function ProductList() {
  const [products, setProducts] = useState([]);

  async function fetchProduct() {
    try {
      const res = await axiosInstance.get("/products/featured");
      const products = res.data.data.products;
      console.log(res.data);
      setProducts(products);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <div className="pt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => {
        const { name, price, images } = product;

        const formattedPrice = formatPrice(price);
        return (
          <div
            key={product._id}
            className="w-full overflow-hidden cursor-pointer rounded-lg shadow-xl hover:shadow-2xl transition duration-300"
          >
            <img
              src={images[0]}
              alt={name}
              className="w-full h-48 object-cover "
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-4">{name}</h3>
              <p className="text-lg text-gray-700">{formattedPrice}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ProductList;
