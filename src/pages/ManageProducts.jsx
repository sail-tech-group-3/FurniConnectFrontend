/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useState, useEffect } from "react";
import { SearchOutlined } from "@ant-design/icons";
import {
  Button,
  Input,
  Space,
  Table,
  message,
  Popconfirm,
  Image,
  Tag,
} from "antd";
import Highlighter from "react-highlight-words";
import { useNavigate } from "react-router-dom";
import useProducts from "../customHooks/useProducts";
import { axiosInstance, formatPrice } from "../utils";
import { SectionTitle } from "../components";

const ManageProducts = () => {
  const { products, fetchProducts } = useProducts();
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const searchInput = useRef(null);
  const navigate = useNavigate();

  const loadProducts = async (page = 1) => {
    setLoading(true);
    try {
      await fetchProducts(page, pageSize);
      setTotal(products.length);
    } catch {
      message.error("Failed to fetch products. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    loadProducts(page);
  };

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button type="link" size="small" onClick={() => close()}>
            Close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const handleDelete = async (_id) => {
    try {
      const response = await axiosInstance.delete(`/products/${_id}`);
      if (response.status === 204 || response.status === 200) {
        message.success("Product deleted successfully");
        loadProducts(currentPage);
      } else {
        message.error("Failed to delete product");
      }
    } catch {
      message.error("Failed to delete product");
    }
  };

  const handleEdit = (product) => {
    navigate("/profile/createProduct", { state: { product } });
  };

  const columns = [
    {
      title: "Image",
      dataIndex: "images",
      key: "images",
      render: (images) => (
        <Image
          width={60}
          height={60}
          src={images[0]}
          alt="Product"
          style={{ borderRadius: "8px", objectFit: "cover" }}
          preview={false}
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      ...getColumnSearchProps("description"),
      ellipsis: true,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => formatPrice(price),
    },
    {
      title: "Product Type",
      dataIndex: "productType",
      key: "productType",
      filters: [
        { text: "Chairs", value: "Chairs" },
        { text: "Beds", value: "Beds" },
        { text: "Tables", value: "Tables" },
      ],
      onFilter: (value, record) => record.productType.includes(value),
    },
    {
      title: "Created By",
      dataIndex: "createdBy",
      key: "createdBy",
      ...getColumnSearchProps("createdBy"),
    },
    {
      title: "Status",
      key: "status",
      render: (_, record) => (
        <Tag color={record.price ? "green" : "yellow"}>
          {record.price == 0 ? "Not Verified" : "Verified"}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, product) => (
        <Space size="middle">
          <Button type="link" onClick={() => handleEdit(product)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this product?"
            onConfirm={() => handleDelete(product._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const dataSource = products.map((product, index) => ({
    key: index,
    images: product.images,
    name: product.name,
    description: product.description,
    price: product.price,
    createdBy: product.createdBy,
    productType: product.productType,
    _id: product._id,
  }));

  return (
    <>
      <SectionTitle text="Manage Products" />
      <div className="mt-10">
        <Table
          columns={columns}
          dataSource={dataSource}
          loading={loading}
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            total: total,
            onChange: handlePageChange,
          }}
          rowKey={(record) => record._id}
          scroll={{ x: 800 }}
        />
      </div>
    </>
  );
};

export default ManageProducts;
