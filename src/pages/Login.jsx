import { Card, Form, Input, Button } from "antd";
import { Link } from "react-router-dom";
import useLogin from "../customHooks/useLogin.js";
import loginbg from "../assets/loginbg.png";

const Login = () => {
  const { onLogin, loading } = useLogin();
  return (
    <div className="m-h-[100svh] flex items-center ">
      <div className="hidden lg:block w-[50%] h-[100svh] overflow-hidden relative">
        <img src={loginbg} alt="" className="object-contain w-full" />
        <h1 className="absolute flex justify-center top-[40%] leading-10 left-[40%] text-white font-bold text-3xl">
          FurniConnect <br />
          Get the Experience <br />
          of Furniture Shoping
        </h1>
      </div>
      <div className="w-[90%] lg:max-w-[40rem] mx-auto pt-24 ">
        <Card className="w-full h-full ">
          <h1 className="font-bold text-center text-2xl text-[#1B1D21] ">
            Sign in
          </h1>
          <p className="text-[#94A3B8] text-center mt-4 mb-4 text-lg">
            Login to your account to continue
          </p>
          <Form
            layout="vertical"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            onFinish={onLogin}
          >
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
              name="password"
              label="Password"
              rules={[{ required: true, message: "Password is required" }]}
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
              Login
            </Button>
            <div className="my-10 text-center text-lg text-[#1B1D21]">
              Dont have an account?{" "}
              <Link to="/register" className="text-[#2E3192] ">
                Register
              </Link>
            </div>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default Login;
