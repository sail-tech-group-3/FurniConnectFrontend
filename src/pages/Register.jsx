import { Card, Form, Input, Button } from "antd";
import { Link } from "react-router-dom";
import useRegister from "../customHooks/useRegister.js";
import loginbg from "../assets/loginbg.png";

const Register = () => {
  const { onRegister, loading } = useRegister();

  return (
    <div className="m-h-[100svh] flex items-center">
      <div className="hidden lg:block w-[50%] h-[100svh] overflow-hidden relative">
        <img src={loginbg} alt="" className="object-contain w-full" />
        <h1 className="absolute flex justify-center top-[40%] leading-10 left-[40%] text-white font-bold text-3xl">
          FurniConnect <br />
          Get the Experience <br />
          of Furniture Shoping
        </h1>
      </div>
      <div className="w-[90%] lg:max-w-[40rem] mx-auto ">
        <Card className="w-full h-full">
          <h1 className="font-bold text-center text-2xl text-[#1B1D21] ">
            Register
          </h1>
          <p className="text-[#94A3B8] text-center mt-4 mb-4 text-lg">
            Register your account to continue
          </p>
          <Form
            layout="vertical"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            onFinish={onRegister}
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
                {
                  type: "email",
                  message: "Invalid email address",
                },
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
              name="password"
              label="Password"
              rules={[
                { required: true, message: "Password is required" },
                {
                  pattern:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message: "Password not strong enough",
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
            <Button
              type="primary"
              loading={loading}
              htmlType="submit"
              block
              className="bg-[#2E3192]"
            >
              Register
            </Button>
            <div className="my-10 text-center text-lg text-[#1B1D21]">
              Already have an account?{" "}
              <Link to="/login" className="text-[#2E3192]">
                Login
              </Link>
            </div>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default Register;
