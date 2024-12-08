import React, { useState } from "react";
import { Layout, Table, Button, message } from "antd";
import axios from "axios"; // Đảm bảo bạn đã cài đặt axios

const { Header, Content, Footer } = Layout;

const recipes = [
  {
    id: 1,
    name: "Bánh mì Việt Nam",
    author: "Nguyễn Văn A",
    status: "Approved",
  },
  { id: 2, name: "Phở bò", author: "Trần Thị B", status: "Pending" },
  // Thêm dữ liệu mẫu khác
];

const users = [
  { id: 1, username: "Nguyễn Văn A", status: "Active" },
  { id: 2, username: "Trần Thị B", status: "Banned" },
  // Thêm dữ liệu người dùng mẫu khác
];

const recipeColumns = [
  { title: "ID", dataIndex: "id", key: "id" },
  { title: "Tên công thức", dataIndex: "name", key: "name" },
  { title: "Tác giả", dataIndex: "author", key: "author" },
  { title: "Trạng thái", dataIndex: "status", key: "status" },
  {
    title: "Hành động",
    key: "action",
    render: (_, record) => (
      <>
        <Button type="link" style={{ marginRight: 10 }}>
          Duyệt
        </Button>
        <Button type="link" danger>
          Xóa
        </Button>
      </>
    ),
  },
];

const userColumns = [
  { title: "ID", dataIndex: "id", key: "id" },
  { title: "Tên người dùng", dataIndex: "username", key: "username" },
  { title: "Trạng thái", dataIndex: "status", key: "status" },
  {
    title: "Hành động",
    key: "action",
    render: (_, record) => (
      <>
        {record.status === "Active" ? (
          <Button type="link" danger onClick={() => handleBanUser(record.id)}>
            Cấm
          </Button>
        ) : (
          <Button type="link" onClick={() => handleActivateUser(record.id)}>
            Kích hoạt
          </Button>
        )}
      </>
    ),
  },
];

// Hàm để cấm người dùng
const handleBanUser = async (userId) => {
  try {
    await axios.put(`http://localhost:8080/api/auth/ban/${userId}`); // Đổi URL theo API của bạn
    message.success("Người dùng đã bị cấm");
    // Cập nhật trạng thái người dùng (Giả sử bạn có cách để làm mới danh sách người dùng)
  } catch (error) {
    message.error("Lỗi khi cấm người dùng");
    console.error(error);
  }
};

// Hàm để kích hoạt người dùng
const handleActivateUser = async (userId) => {
  try {
    await axios.put(`http://localhost:8080/api/auth/activate/${userId}`); // Đổi URL theo API của bạn
    message.success("Người dùng đã được kích hoạt");
    // Cập nhật trạng thái người dùng (Giả sử bạn có cách để làm mới danh sách người dùng)
  } catch (error) {
    message.error("Lỗi khi kích hoạt người dùng");
    console.error(error);
  }
};

const AdminPage = () => {
  const [userData, setUserData] = useState(users); // Dữ liệu người dùng

  return (
    <Layout>
      <Header style={{ color: "white", textAlign: "center" }}>
        <h1>Quản lý công thức</h1>
      </Header>
      <Content style={{ padding: "20px" }}>
        <h2>Danh sách Công Thức</h2>
        <Table dataSource={recipes} columns={recipeColumns} rowKey="id" />
        <h2>Danh sách Người Dùng</h2>
        <Table dataSource={userData} columns={userColumns} rowKey="id" />
      </Content>
      <Footer style={{ textAlign: "center" }}>©2024 RecipeHub</Footer>
    </Layout>
  );
};

export default AdminPage;
