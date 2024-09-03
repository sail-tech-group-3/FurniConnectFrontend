/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { Form, Input, Button, Upload, message, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { axiosInstance } from "../utils";
import { useAuth } from "../customHooks/useAuth";

const { Option } = Select;

const CreateProduct = () => {
  const { role } = useAuth();
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const { state } = location;
    if (state?.product) {
      const { product } = state;
      form.setFieldsValue({
        name: product.name,
        description: product.description,
        productType: product.productType,
        price: product.price,
      });

      setFileList(
        product.images.map((image) => ({
          url: image,
          name: image.split("/").pop(),
        }))
      );
    } else {
      if (role !== "admin") {
        form.setFieldsValue({ price: 0 });
      }
    }
  }, [location, form, role]);

  const handleUpload = ({ fileList }) => {
    setFileList(fileList);
  };

  const handleSubmit = async (values) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("productType", values.productType);
    formData.append("price", values.price);

    fileList.forEach((file) => {
      if (file.originFileObj) {
        formData.append("images", file.originFileObj);
      } else if (file.url) {
        formData.append("images", file.url);
      }
    });

    try {
      setUploading(true);
      if (location.state?.product) {
        await axiosInstance.patch(
          `/products/${location.state.product._id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        message.success("Product updated successfully!");
      } else {
        await axiosInstance.post("/products", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        message.success("Product created successfully!");
      }
      form.resetFields();
      setFileList([]);

      if (role === "admin") {
        navigate("/dashboard/products");
      } else {
        navigate("/profile/createdProducts");
      }
    } catch (error) {
      message.error("Failed to save product. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-12 p-8 bg-white shadow-lg rounded-lg ">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        {location.state?.product ? "Edit Product" : "Create Product"}
      </h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        className="space-y-6"
      >
        <Form.Item
          name="name"
          label="Product Name"
          rules={[
            { required: true, message: "Please enter the product name" },
            {
              min: 5,
              message: "Product name must be at least 5 characters long",
            },
          ]}
        >
          <Input
            placeholder="Enter product name"
            className="py-3 px-4 border-gray-300 rounded-md"
          />
        </Form.Item>

        <Form.Item
          name="productType"
          label="Product Type"
          rules={[
            { required: true, message: "Please select the product type" },
          ]}
        >
          <Select
            placeholder="Select a product type"
            className="h-10 border-gray-300 rounded-md"
          >
            <Option value="Chairs">Chairs</Option>
            <Option value="Tables">Tables</Option>
            <Option value="Beds">Beds</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="price"
          label="Product Price"
          rules={[
            { required: true, message: "Please enter the product price" },
          ]}
        >
          <Input
            type="number"
            placeholder="Enter product price"
            className="py-3 px-4 border-gray-300 rounded-md"
            disabled={role !== "admin"}
          />
        </Form.Item>

        <Form.Item
          name="description"
          label="Product Description"
          rules={[
            { required: true, message: "Please enter the product description" },
          ]}
        >
          <Input.TextArea
            placeholder="Enter product description"
            rows={6}
            className="py-3 px-4 border-gray-300 rounded-md"
          />
        </Form.Item>

        <Form.Item
          name="images"
          label="Product Images"
          valuePropName="fileList"
          getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
          extra="Upload product images"
        >
          <Upload
            listType="picture"
            fileList={fileList}
            onChange={handleUpload}
            beforeUpload={() => false}
            showUploadList={{ showPreviewIcon: true, showRemoveIcon: true }}
          >
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={uploading}
            className="w-full"
          >
            {location.state?.product ? "Update Product" : "Create Product"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateProduct;
