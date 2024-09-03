import { useEffect } from "react";
import { Card, Form, Input, Button, Select } from "antd";
import { useLocation } from "react-router-dom";
import useCreateUser from "../customHooks/useCreateUser";

const { Option } = Select;

const CreateUser = () => {
  const { onCreateUser, onUpdateUser, loading } = useCreateUser();
  const location = useLocation();
  const { user } = location.state || {};

  const [form] = Form.useForm();

  useEffect(() => {
    if (user) {
      // If editing, set form fields to user data
      form.setFieldsValue({
        fullName: user.fullName,
        email: user.email,
        userName: user.userName,
        phoneNumber: user.phoneNumber,
        role: user.role,
      });
    }
  }, [user, form]);

  const handleFinish = (values) => {
    if (user) {
      // If editing, call update function
      const updateValues = {
        ...values,
        id: user._id,
        password: values.password || undefined, // Only send if defined
        passwordConfirm: values.passwordConfirm || undefined, // Only send if defined
      };

      if (values.password || values.passwordConfirm) {
        // Ensure password fields are present when updating passwords
        if (values.password !== values.passwordConfirm) {
          return form.setFields([
            { name: "passwordConfirm", errors: ["Passwords do not match"] },
          ]);
        }
        // Update user with password fields
        onUpdateUser(user._id, updateValues);
      } else {
        // Update user without changing password
        onUpdateUser(user._id, updateValues);
      }
    } else {
      // If creating, call create function
      onCreateUser(values);
    }
  };

  return (
    <Card className="max-w-[40rem] w-[90%] mx-auto">
      <h1 className="font-bold text-center text-2xl">
        {user ? "Edit User" : "Create User"}
      </h1>
      <Form
        form={form}
        layout="vertical"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        onFinish={handleFinish}
      >
        <Form.Item
          name="fullName"
          label="Full Name"
          rules={[{ required: true, message: "Full name is required" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email Address"
          rules={[
            { required: true, message: "Email is required" },
            { type: "email", message: "Invalid email address" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="userName"
          label="Username"
          rules={[{ required: true, message: "Username is required" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="phoneNumber"
          label="Phone Number"
          rules={[
            { required: true, message: "Phone number is required" },
            {
              pattern:
                /^\+?[1-9]\d{1,14}$|^(\+?[0-9]{1,3})?[-.\s]?\(?[0-9]{1,4}?\)?[-.\s]?[0-9]{1,4}[-.\s]?[0-9]{1,9}$/,
              message: "Invalid phone number",
            },
          ]}
        >
          <Input addonBefore="+234" />
        </Form.Item>
        <Form.Item
          name="role"
          label="Role"
          initialValue="user"
          rules={[{ required: true, message: "Role is required" }]}
        >
          <Select>
            <Option value="user">User</Option>
            <Option value="admin">Admin</Option>
          </Select>
        </Form.Item>
        {!user && (
          <>
            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: true, message: "Password is required" }]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              name="passwordConfirm"
              label="Confirm Password"
              rules={[
                {
                  required: true,
                  message: "Password confirmation is required",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("The two passwords do not match!")
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
          </>
        )}
        <Button type="primary" loading={loading} htmlType="submit" block>
          {user ? "Update User" : "Create User"}
        </Button>
      </Form>
    </Card>
  );
};

export default CreateUser;
