/* eslint-disable no-unused-vars */
import { useState, useEffect, useCallback } from "react";
import { axiosInstance } from "../utils";

const useUserOrderHistory = (userId) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const fetchOrders = useCallback(
    async (page = 1) => {
      if (!userId) return;
      setLoading(true);
      try {
        const response = await axiosInstance.get(`/orders/${userId}`, {
          params: { page, limit: pageSize },
        });
        setOrders(response.data.data.orders);
        setTotal(response.data.results);
      } catch (error) {
        console.error("");
      } finally {
        setLoading(false);
      }
    },
    [userId, pageSize]
  );

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return { orders, loading, total, pageSize, fetchOrders };
};

export default useUserOrderHistory;
