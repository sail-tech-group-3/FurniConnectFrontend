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
    } catch {
      message.error("Failed to fetch orders. Please try again.");
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
