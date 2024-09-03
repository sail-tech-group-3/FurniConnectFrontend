/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <Link
      key={product._id}
      to={`/products/${product._id}`}
      className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      <img
        src={product.images[0]}
        alt={product.name}
        className="w-full h-56 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800">{product.name}</h3>
        <p className="text-gray-700 font-semibold mt-2">
          Price: ${product.price.toFixed(2)}
        </p>
        <p className="text-gray-700 text-sm font-semibold mt-2">
          Created By: {product.createdBy}
        </p>
      </div>
    </Link>
  );
};

export default ProductCard;
