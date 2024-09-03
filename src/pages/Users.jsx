import { Table, Avatar, Button, Popconfirm, message } from "antd";
import { UserOutlined, EditOutlined } from "@ant-design/icons";
import useUsers from "../customHooks/useUsers";
import { axiosInstance } from "../utils";
import { useNavigate } from "react-router-dom";
import { SectionTitle } from "../components";

const Users = () => {
  const { users, setUsers } = useUsers();
  const navigate = useNavigate();

  const handleDelete = async (userId) => {
    try {
      await axiosInstance.delete(`/admins/${userId}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
      message.success("User deleted successfully");
    } catch (error) {
      console.error(error);
      message.error("Failed to delete user");
    }
  };

  const handleEdit = (user) => {
    navigate("/dashboard/createUser", { state: { user } });
  };

  const columns = [
    {
      title: "Profile Photo",
      dataIndex: "photo",
      key: "photo",
      render: (photo) =>
        photo ? <Avatar src={photo} /> : <Avatar icon={<UserOutlined />} />,
    },
    {
      title: "Name",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Products Created",
      dataIndex: "NumOfCreatedProduct",
      key: "NumOfCreatedProduct",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <>
          <Button
            type="link"
            onClick={() => handleEdit(record)}
            icon={<EditOutlined />}
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this user?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger>
              Delete
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  const dataSource = users.map((user, index) => ({
    key: index,
    _id: user._id,
    photo: user.photo,
    fullName: user.fullName,
    NumOfCreatedProduct: user.NumOfCreatedProduct,
    phoneNumber: user.phoneNumber,
    email: user.email,
  }));

  return (
    <>
      <SectionTitle text="Users" />
      <div className="mt-8">
        <Table columns={columns} dataSource={dataSource} />
      </div>
    </>
  );
};

export default Users;
