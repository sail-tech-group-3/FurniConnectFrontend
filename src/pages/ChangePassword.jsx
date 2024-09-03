import { Form, Input, Button, message } from "antd";
import { axiosInstance } from "../utils";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const ChangePassword = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const response = await axiosInstance.patch("/users/updatePassword", {
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
        confirmPassword: values.confirmPassword,
      });

      message.success("Password changed successfully!");
      console.log("Password change response:", response.data);

      // Redirect to profile page or another page after successful password change
      navigate("/");
    } catch (error) {
      message.error("Failed to change password.");
      console.error("Password change error:", error);
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex justify-center items-center mt-10">
      <div className="p-6 bg-white rounded-lg shadow-md w-full max-w-xl">
        <h2 className="text-2xl font-semibold mb-4">Change Password</h2>
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="currentPassword"
            label="Current Password"
            rules={[
              { required: true, message: "Please enter your current password" },
            ]}
          >
            <Input.Password placeholder="Enter your current password" />
          </Form.Item>
          <Form.Item
            name="newPassword"
            label="New Password"
            rules={[
              { required: true, message: "Please enter your new password" },
            ]}
          >
            <Input.Password placeholder="Enter your new password" />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            label="Confirm New Password"
            rules={[
              { required: true, message: "Please confirm your new password" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords do not match!"));
                },
              }),
            ]}
          >
            <Input.Password placeholder="Confirm your new password" />
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="w-full bg-blue-500 text-white hover:bg-blue-600"
            loading={loading}
          >
            Change Password
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default ChangePassword;
