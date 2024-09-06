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
      form.setFieldsValue({
        fullName: user.fullName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
      });
    }
  }, [user, form]);

  const handleFinish = (values) => {
    if (user) {
      const updateValues = {
        ...values,
        id: user._id,
        password: values.password || undefined,
        passwordConfirm: values.passwordConfirm || undefined,
      };

      if (values.password || values.passwordConfirm) {
        if (values.password !== values.passwordConfirm) {
          return form.setFields([
            { name: "passwordConfirm", errors: ["Passwords do not match"] },
          ]);
        }
        onUpdateUser(user._id, updateValues);
      } else {
        onUpdateUser(user._id, updateValues);
      }
    } else {
      onCreateUser(values);
    }
  };

  return (
    <Card className="max-w-[40rem] w-[95%] mx-auto">
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

        {!user && (
          <Form.Item
            name="userName"
            label="Username"
            rules={[{ required: true, message: "Username is required" }]}
          >
            <Input />
          </Form.Item>
        )}

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
              rules={[
                { required: true, message: "Password is required" },
                {
                  min: 8,
                  message: "Password must be at least 8 characters long",
                },
              ]}
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
        <Button
          type="primary"
          loading={loading}
          htmlType="submit"
          block
          className="bg-[#2E3192]"
        >
          {user ? "Update User" : "Create User"}
        </Button>
      </Form>
    </Card>
  );
};

export default CreateUser;
