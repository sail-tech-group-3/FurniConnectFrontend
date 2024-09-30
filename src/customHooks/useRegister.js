import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { endpoints } from "../utils/endpoints";
import { axiosInstance } from "../utils";
import { message } from "antd";

const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onRegister = async (request) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post(
        endpoints.auth.register,
        request
      );
      setLoading(false);
      message.success("Successfully resgistered");
      if (response.data?.status === "success") {
        setTimeout(() => {
          return navigate("/login");
        }, 2000);
      }
    } catch {
      setLoading(false);
      message.error("Something went wrong");
    }
  };

  return {
    onRegister,
    loading,
  };
};

export default useRegister;
