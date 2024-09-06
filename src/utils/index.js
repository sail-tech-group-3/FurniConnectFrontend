import axios from "axios";

const productionUrl = "http://localhost:8000/api/v1/";
// const productionUrl = "https://furniconnect-backend.onrender.com/api/v1/";

const axiosInstance = axios.create({
  baseURL: productionUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("***");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("***");
    }
    return Promise.reject(error);
  }
);

export { axiosInstance };

export const formatPrice = (price) => {
  const dollarsAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "NGN",
  }).format(price);
  return dollarsAmount;
};
