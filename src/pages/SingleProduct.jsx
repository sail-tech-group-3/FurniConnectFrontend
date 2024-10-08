/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../utils";
import { message } from "antd";
import { SectionTitle, Loading } from "../components";
import Product from "../components/SingleProduct";

const SingleProduct = ({ updateCartCount }) => {
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { _id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axiosInstance.get(`products/${_id}`);
        setProduct(res.data.data.product);
      } catch (error) {
        console.error("Error fetching product", error);
      }
    };
    fetchProduct();
  }, [_id]);

  if (!product) {
    return <Loading />;
  }

  const handleQuantityChange = (e) => {
    setQuantity(parseInt(e.target.value, 10));
  };

  const handleAddToCart = () => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const existingItemIndex = cartItems.findIndex(
      (item) => item._id === product._id
    );

    if (existingItemIndex >= 0) {
      cartItems[existingItemIndex].quantity += quantity;
    } else {
      cartItems.push({ ...product, quantity });
    }

    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    message.success("Product added to cart!");

    updateCartCount();
  };

  return (
    <div className="align-element pt-20">
      <div className="mb-10">
        <SectionTitle text="Simple Product Design" />
      </div>
      <Product
        product={product}
        quantity={quantity}
        onQuantityChange={handleQuantityChange}
        onAddToCart={handleAddToCart}
      />
      <div className="mt-20">
        <SectionTitle text="Related images" />
      </div>
      <div className="flex flex-wrap mt-20 gap-4 justify-center">
        {product.images.map((image, index) => (
          <div
            className="w-full lg:w-[15rem] h-[20rem] bg-slate-100 p-2 shadow-2xl"
            key={index}
          >
            <img src={image} alt="images" className="w-full h-full" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SingleProduct;
