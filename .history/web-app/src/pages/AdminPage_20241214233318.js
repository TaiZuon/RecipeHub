import React, { useEffect, useState } from "react";
import { Layout, Table, Button, message } from "antd";
import axios from "axios";

const { Header, Content, Footer } = Layout;

// Hàm để cấm người dùng
const handleBanUser = async (username, fetchUsers) => {
  try {
    await axios.put(`http://localhost:8080/api/auth/ban/${username}`);
    message.success("Người dùng đã bị cấm");
    fetchUsers(); // Cập nhật danh sách sau khi cấm
  } catch (error) {
    message.error("Lỗi khi cấm người dùng");
    console.error(error);
  }
};

// Hàm để kích hoạt người dùng
const handleActivateUser = async (username, fetchUsers) => {
  try {
    await axios.put(`http://localhost:8080/api/auth/activate/${username}`);
    message.success("Người dùng đã được kích hoạt");
    fetchUsers(); // Cập nhật danh sách sau khi kích hoạt
  } catch (error) {
    message.error("Lỗi khi kích hoạt người dùng");
    console.error(error);
  }
};

const AdminPage = () => {
  const [userData, setUserData] = useState([]); // Dữ liệu người dùng

  // Lấy danh sách người dùng từ API
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/auth/users");
      //loại admin khỏi danh sách
      const filteredUsers = response.data.filter(
        (user) => user.role !== "ADMIN"
      );
      setUserData(filteredUsers);
    } catch (error) {
      console.error("Fetch users error:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Cấu hình cột cho bảng
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tên người dùng",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Vai trò",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => (status === "ACTIVE" ? "Hoạt động" : "Bị cấm"),
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_, record) => (
        <>
          {record.status === "ACTIVE" ? (
            <Button
              type="danger"
              onClick={() => handleBanUser(record.username, fetchUsers)}
            >
              Cấm
            </Button>
          ) : (
            <Button
              type="primary"
              onClick={() => handleActivateUser(record.username, fetchUsers)}
            >
              Kích hoạt
            </Button>
          )}
        </>
      ),
    },
  ];

  return (
    <Layout>
      <Header style={{ color: "white", textAlign: "center" }}>
        <h1>Quản lý Người Dùng</h1>
      </Header>
      <Content style={{ padding: "20px" }}>
        <h2>Danh sách Người Dùng</h2>
        <Table
          dataSource={userData}
          columns={columns}
          rowKey="id"
          bordered
          pagination={{ pageSize: 10 }}
        />
      </Content>
      <Footer style={{ textAlign: "center" }}>©2024 RecipeHub</Footer>
    </Layout>
  );
};

export default AdminPage;
