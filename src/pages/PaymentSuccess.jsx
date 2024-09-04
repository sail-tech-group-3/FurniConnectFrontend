import { Card, Button, Result } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  const handleBackHome = () => {
    navigate("/");
  };

  return (
    <div
      className="flex justify-center items-center "
      style={{ height: "calc(100vh - 5rem)" }}
    >
      <Card className="shadow-lg rounded-lg max-w-[30rem] w-[90%]">
        <Result
          icon={<SmileOutlined style={{ color: "#52c41a" }} />}
          title="Payment Successful!"
          subTitle="Thank you for your purchase. Your order has been processed successfully."
          extra={
            <Button type="primary" size="large" onClick={handleBackHome}>
              Go to Homepage
            </Button>
          }
        />
      </Card>
    </div>
  );
};

export default PaymentSuccess;
