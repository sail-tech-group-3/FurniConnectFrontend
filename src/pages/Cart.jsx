import { useState, useEffect } from "react";
import { formatPrice } from "../utils";
import { Button, Popconfirm } from "antd";
import { useAuth } from "../customHooks/useAuth";
import { Link } from "react-router-dom";
const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const { user } = useAuth();
  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(storedCartItems);
  }, []);

  const handleRemoveItem = (productId) => {
    const updatedCartItems = cartItems.filter((item) => item._id !== productId);
    setCartItems(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };

  const calculateTotalPrice = (price, quantity) => {
    return price * quantity;
  };

  const calculateCartTotal = () => {
    return cartItems.reduce(
      (total, item) => total + calculateTotalPrice(item.price, item.quantity),
      0
    );
  };

  if (cartItems.length === 0) {
    return (
      <div className="flex justify-center text-2xl font-bold mt-20">
        Your cart is empty
      </div>
    );
  }

  return (
    <div className="align-element pt-20">
      <h1 className="text-3xl font-semibold mb-8">Your Cart</h1>
      {cartItems.map((item) => (
        <div key={item._id}>
          <div className="lg:flex gap-8 items-center border-b-2 py-8 justify-between mb-4">
            <div className="lg:flex  items-center gap-20">
              <img
                src={item.images[0]}
                alt={item.name}
                className="w-full h-full rounded-lg object-contain lg:w-[10rem] "
              />{" "}
              <div className="mt-10 lg:mt-0">
                <h2 className="text-xl font-medium mb-2">{item.name}</h2>
                <p className="text-lg mb-2">{formatPrice(item.price)}</p>
                <p className="text-lg mb-2">Quantity: {item.quantity}</p>
                <p className="text-lg font-bold mb-2">
                  Total:{" "}
                  {formatPrice(calculateTotalPrice(item.price, item.quantity))}
                </p>
              </div>
            </div>

            <div className="lg:flex gap-20  mt-4 ">
              <Popconfirm
                title="Are you sure to delete this item?"
                onConfirm={() => handleRemoveItem(item._id)}
                okText="Yes"
                cancelText="No"
              >
                <Button type="primary" danger>
                  Remove
                </Button>
              </Popconfirm>
            </div>
          </div>
        </div>
      ))}
      <div className="mt-8 grid md:place-content-end">
        <h1 className="text-2xl font-bold mb-4 text-center">
          {" "}
          Cart Total: {formatPrice(calculateCartTotal())}
        </h1>
        <div>
          {user ? (
            <Link to="/checkout">
              <Button type="primary" className="w-full">
                Proceed to CheckOut
              </Button>
            </Link>
          ) : (
            <Link to="/login">
              <Button type="primary" className="w-full">
                Login to Checkout
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
