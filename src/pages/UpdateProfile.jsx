import { Upload, Button, message, Input, Form } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { axiosInstance } from "../utils";
import { useAuth } from "../customHooks/useAuth";

const UpdateProfile = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [form] = Form.useForm();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        fullName: user.fullName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        userName: user.userName,
      });

      setImageUrl(user.photo ? `${user.photo}` : null);
    }
  }, [user, form]);

  const handleUpload = async ({ file }) => {
    const formData = new FormData();
    formData.append("photo", file);

    try {
      const response = await axiosInstance.patch("/users/updateMe", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const { user } = response.data.data;
      setImageUrl(`${user.photo}`);
      message.success("Upload successful!");
    } catch (error) {
      message.error("Upload failed.");
      console.error(error);
    }
  };

  const handleSubmit = async (values) => {
    try {
      await axiosInstance.patch("/users/updateMe", values);
      message.success("Profile updated successfully!");
    } catch (error) {
      message.error("Update failed.");
      console.error("Update error:", error);
    }
  };

  return (
    <div className="w-full flex justify-center items-center ">
      <div className="p-6 bg-white rounded-lg shadow-md w-full max-w-xl">
        <h2 className="text-2xl font-semibold mb-4">
          {imageUrl ? "Profile Photo" : "Upload Profile Photo"}
        </h2>
        {imageUrl && (
          <img
            src={imageUrl}
            alt="Profile"
            className="w-52 m-auto h-48 object-contain mb-4 rounded-full shadow-sm"
          />
        )}
        <Upload
          customRequest={handleUpload}
          listType="picture"
          maxCount={1}
          className="mb-4"
        >
          <Button
            icon={<UploadOutlined />}
            className="w-full bg-[#2E3192] text-white "
          >
            Upload Profile Picture
          </Button>
        </Upload>

        <Form
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
          className="mt-6"
        >
          <Form.Item
            name="fullName"
            label="Full Name"
            rules={[{ required: true, message: "Please enter your name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="userName"
            label="userName"
            rules={[{ required: true, message: "Please enter your name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phoneNumber"
            label="Phone Number"
            rules={[
              { required: true, message: "Please enter your phone number" },
            ]}
          >
            <Input />
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="w-full bg-[#2E3192] text-white "
          >
            Update Profile
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default UpdateProfile;
