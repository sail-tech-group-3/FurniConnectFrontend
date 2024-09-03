import { useState, useEffect } from "react";
import { PaystackButton } from "react-paystack";
import { axiosInstance, formatPrice } from "../utils";
import { useAuth } from "../customHooks/useAuth";
import { SectionTitle } from "../components";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection

const CheckOut = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const { user } = useAuth();
  const navigate = useNavigate(); // Initialize useNavigate

  const publicKey = "pk_test_f060be41f1ddd2d1e5c0430def5a56eb4d5d0ab2";
  const email = user?.email;

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(storedCartItems);
    const total = storedCartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotalAmount(total);
  }, []);
  const handlePaymentSuccess = async (response) => {
    console.log("Payment successful", response);

    const orderData = {
      items: cartItems.map((item) => ({
        product: item._id,
        quantity: item.quantity,
        price: item.price,
      })),
      totalAmount,
      customerName: user.fullName,
      customerEmail: user.email,
    };

    try {
      await axiosInstance.post("/orders", orderData, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      localStorage.removeItem("cartItems");
      setCartItems([]);
      navigate("/payment/success");
    } catch (error) {
      console.error("Error saving order:", error);
    }
  };

  const componentProps = {
    email,
    amount: totalAmount * 100,
    date: Date.now(),
    publicKey,
    text: "Pay Now",
    onSuccess: handlePaymentSuccess,
    onClose: () => console.log("Payment closed"),
  };

  return (
    <div className="align-element mt-20 p-8">
      <SectionTitle text="CheckOut" />
      {cartItems.length > 0 ? (
        <>
          <div className="mb-8 mt-8">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex justify-between items-center border-b-2 py-4"
              >
                <div className="flex items-center">
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="w-20 h-20 object-contain rounded-lg"
                  />
                  <div className="ml-4">
                    <h2 className="text-xl font-medium">{item.name}</h2>
                    <p className="text-lg">
                      {item.quantity} x {formatPrice(item.price)}
                    </p>
                  </div>
                </div>
                <p className="text-lg font-bold">
                  {formatPrice(item.price * item.quantity)}
                </p>
              </div>
            ))}
          </div>
          <div className="text-right">
            <h2 className="text-2xl font-semibold mb-4">
              Total: {formatPrice(totalAmount)}
            </h2>
            <PaystackButton
              {...componentProps}
              className="ant-btn ant-btn-primary"
            />
          </div>
        </>
      ) : (
        <p className="text-2xl font-bold text-center mt-8">
          Your cart is empty
        </p>
      )}
    </div>
  );
};

export default CheckOut;
