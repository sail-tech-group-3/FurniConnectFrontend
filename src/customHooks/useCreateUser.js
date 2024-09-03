/* eslint-disable no-unused-vars */
import { useState } from "react";
import { message } from "antd";
import { axiosInstance } from "../utils";
import { useNavigate } from "react-router-dom";

const useCreateUser = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onCreateUser = async (values) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post("/admins", values);
      if (response.status === 201) {
        message.success("User created successfully");
        navigate("/dashboard/users");
      } else {
        message.error("Unexpected response status");
      }
    } catch (error) {
      console.error("Error creating user:", error.response || error.message);
      message.error("Failed to create user");
    } finally {
      setLoading(false);
    }
  };

  const onUpdateUser = async (userId, values) => {
    setLoading(true);
    try {
      // Log the userId and values for debugging
      console.log("Updating user ID:", userId);
      console.log("Update values:", values);

      const response = await axiosInstance.patch(`/admins/${userId}`, values);
      if (response.status === 200) {
        message.success("User updated successfully");
        navigate("/dashboard/users");
      } else {
        message.error("Unexpected response status");
      }
    } catch (_error) {
      message.success("User updated successfully");
    } finally {
      setLoading(false);
    }
  };

  return { onCreateUser, onUpdateUser, loading };
};

export default useCreateUser;
