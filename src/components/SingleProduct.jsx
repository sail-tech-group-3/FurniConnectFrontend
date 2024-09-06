/* eslint-disable react/prop-types */
import { Button } from "antd";
import { formatPrice } from "../utils";
import { generateAmountOptions } from "../utils/generateAmountOptions";

const Product = ({ product, quantity, onQuantityChange, onAddToCart }) => {
  const { name, price, description, images } = product;
  const formattedPrice = formatPrice(price);

  return (
    <div className="grid   place-content-center md:grid-cols-2 md:gap-10">
      <img
        src={images?.[0]}
        alt={name}
        className="w-full object-ccover h-[20rem] rounded-lg "
      />
      <div className="mt-10 lg:mt-0">
        <h1 className="text-3xl font-semibold">
          {name || "No Name Available"}
        </h1>
        <p className="text-2xl mt-4 text-gray-700">
          {formattedPrice || "No Price Available"}
        </p>
        <p className="mt-4 text-lg">
          {description || "No Description Available"}
        </p>
        <div className="mt-6 flex gap-4 items-center">
          <label htmlFor="quantity" className="text-lg font-medium mb-2">
            Quantity:
          </label>
          <select
            id="quantity"
            value={quantity}
            onChange={onQuantityChange}
            className="p-2 border border-gray-300 rounded"
          >
            {generateAmountOptions(10)}
          </select>
        </div>
        <Button
          type="primary"
          className="w-full mt-8 bg-[#2E3192]"
          onClick={onAddToCart}
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default Product;
