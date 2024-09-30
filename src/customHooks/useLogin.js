import { useState } from "react";
import { axiosInstance } from "../utils";
import { endpoints } from "../utils/endpoints";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onLogin = async (request) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post(endpoints.auth.login, {
        email: request.email,
        password: request.password,
      });
      setLoading(false);
      message.success("Successfully Logged In");
      if (response.data?.status === "success") {
        const token = response.data?.token;
        localStorage.setItem("***", token);

        setTimeout(() => {
          return navigate("/", {
            replace: true,
          });
        }, 2000);
      } else {
        message.error("Something went wrong");
      }
    } catch {
      setLoading(false);
      message.error("Incorrect email or password");
    }
  };

  return {
    onLogin,
    loading,
  };
};

export default useLogin;
