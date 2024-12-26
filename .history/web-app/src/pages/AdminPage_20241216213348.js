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
    <div className="flex flex-col min-h-screen">
      <header className="bg-blue-600 text-white text-center py-4">
        <h1 className="text-2xl">Quản lý Người Dùng</h1>
      </header>
      <main className="flex-grow p-4">
        <h2 className="text-xl mb-4">Danh sách Người Dùng</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead>
              <tr>
                <th className="px-4 py-2 border">ID</th>
                <th className="px-4 py-2 border">Tên người dùng</th>
                <th className="px-4 py-2 border">Vai trò</th>
                <th className="px-4 py-2 border">Trạng thái</th>
                <th className="px-4 py-2 border">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {userData.map((user) => (
                <tr key={user.id}>
                  <td className="px-4 py-2 border">{user.id}</td>
                  <td className="px-4 py-2 border">{user.username}</td>
                  <td className="px-4 py-2 border">{user.role}</td>
                  <td className="px-4 py-2 border">{user.status === 'ACTIVE' ? 'Hoạt động' : 'Bị cấm'}</td>
                  <td className="px-4 py-2 border">
                    {user.status === 'ACTIVE' ? (
                      <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={() => handleBanUser(user.username, fetchUsers)}>Cấm</button>
                    ) : (
                      <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={() => handleActivateUser(user.username, fetchUsers)}>Kích hoạt</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
      <footer className="bg-gray-800 text-white text-center py-4">
        ©2024 RecipeHub
      </footer>
    </div>
  );
};

export default AdminPage;
