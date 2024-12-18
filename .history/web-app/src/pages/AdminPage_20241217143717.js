import React, { useEffect, useState } from "react";
// import { Layout, Table, Button, message } from "antd";
import axios from "axios";


// const { Header, Content, Footer } = Layout;

// Hàm để cấm người dùng
const handleBanUser = async (username, fetchUsers) => {
  try {
    await axios.put(`http://localhost:8080/api/auth/ban/${username}`);
    fetchUsers(); // Cập nhật danh sách sau khi cấm
  } catch (error) {
    console.error(error);
  }
};

// Hàm để kích hoạt người dùng
const handleActivateUser = async (username, fetchUsers) => {
  try {
    await axios.put(`http://localhost:8080/api/auth/activate/${username}`);
    fetchUsers(); // Cập nhật danh sách sau khi kích hoạt
  } catch (error) {
    console.error(error);
  }
};


const AdminPage = () => {
  const [userData, setUserData] = useState([]); // Dữ liệu người dùng
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPendingRecipes();
  }, []);

  const fetchPendingRecipes = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8082/api/recipes/status", {
        params: { status: "PENDING" }
      });
      setRecipes(response.data);
      console.log(recipes)
    } catch (error) {
      console.error("Error fetching pending recipes:", error);
      // alert("Error fetching pending recipes");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (recipeId, userName) => {
    try {
      await axios.put(`http://localhost:8082/api/recipes/${recipeId}/approve`, null, {
        params: { userName: userName }
      });
      alert("Recipe approved successfully");
      fetchPendingRecipes();
    } catch (error) {
      console.error("Error approving recipe:", error);
      alert("Error approving recipe");
    }
  };

  const handleReject = async (recipeId, user) => {
    try {
      await axios.put(`http://localhost:8082/api/recipes/${recipeId}/reject`, null, {
        params: { userName: userName }

      });
      alert("Recipe rejected successfully");
      fetchPendingRecipes();
    } catch (error) {
      console.error("Error rejecting recipe:", error);
      alert("Error rejecting recipe");
    }
  };

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
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl">Manage Pending Recipes</h1>
      </header>
      <main className="container mx-auto p-4">
      {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Image</th>
                <th className="py-2 px-4 border-b">Title</th>
                <th className="py-2 px-4 border-b">Description</th>
                <th className="py-2 px-4 border-b">Created By</th>
                <th className="py-2 px-4 border-b">Created At</th>
                <th className="py-2 px-4 border-b">Updated At</th>
                <th className="py-2 px-4 border-b">Status</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {recipes.map((recipe) => (
                <tr key={recipe.recipeId}>
                  <td className="py-2 px-4 border-b">
                    {recipe.recipeImages.map((image, index) => (
                      <img key={index} className="w-20 h-20 rounded-md" src={image.imageUrl} alt="Item" />
                    ))}
                  </td>
                  <td className="py-2 px-4 border-b">{recipe.title}</td>
                  <td className="py-2 px-4 border-b">{recipe.description}</td>
                  <td className="py-2 px-4 border-b">{recipe.createdBy}</td>
                  <td className="py-2 px-4 border-b">{new Date(recipe.createdAt).toLocaleString()}</td>
                  <td className="py-2 px-4 border-b">{new Date(recipe.updatedAt).toLocaleString()}</td>
                  <td className="py-2 px-4 border-b">{recipe.status}</td>
                  <td className="py-2 px-4 border-b">
                    <button
                      className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                      onClick={() => handleApprove(recipe.recipeId)}
                    >
                      Approve
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded"
                      onClick={() => handleReject(recipe.recipeId)}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>
      <footer className="bg-gray-800 text-white text-center py-4">
        ©2024 RecipeHub
      </footer>
    </div>
  );
};

export default AdminPage;
