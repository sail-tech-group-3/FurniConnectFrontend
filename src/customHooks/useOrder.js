import { useState, useCallback } from "react";
import { message } from "antd";
import { axiosInstance } from "../utils";

const useOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const pageSize = 10;

  const fetchOrders = useCallback(async (page = 1) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/orders`, {
        params: { page, limit: pageSize },
      });
      setOrders(response.data.data.orders);
      setTotal(response.data.results);
      console.log(response.data);
    } catch (error) {
      message.error("Failed to fetch orders. Please try again.");
      console.error("Fetch orders error:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    orders,
    loading,
    total,
    fetchOrders,
    pageSize,
  };
};

export default useOrder;
