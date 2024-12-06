// src/components/AdminDashboard.js
import React, { useState, useEffect } from "react";
import { Table, Button, message } from "antd";
import axios from "../axios";

function AdminDashboard() {
  const [recipes, setRecipes] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const recipesResponse = await axios.get("/recipes");
        const usersResponse = await axios.get("/admin/users");
        setRecipes(recipesResponse.data);
        setUsers(usersResponse.data);
      } catch (error) {
        message.error("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDeleteRecipe = async (recipeId) => {
    try {
      await axios.delete(`/recipes/${recipeId}`);
      setRecipes(recipes.filter((recipe) => recipe.id !== recipeId));
      message.success("Recipe deleted");
    } catch (error) {
      message.error("Failed to delete recipe");
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`/admin/users/${userId}`);
      setUsers(users.filter((user) => user.id !== userId));
      message.success("User deleted");
    } catch (error) {
      message.error("Failed to delete user");
    }
  };

  const recipeColumns = [
    {
      title: "Recipe Name",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Button type="link" onClick={() => handleDeleteRecipe(record.id)}>
          Delete
        </Button>
      ),
    },
  ];

  const userColumns = [
    {
      title: "User Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Button type="link" onClick={() => handleDeleteUser(record.id)}>
          Delete
        </Button>
      ),
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h2>Admin Dashboard</h2>
      <div style={{ marginBottom: "20px" }}>
        <h3>Manage Recipes</h3>
        <Table
          loading={loading}
          dataSource={recipes}
          columns={recipeColumns}
          rowKey="id"
        />
      </div>
      <div>
        <h3>Manage Users</h3>
        <Table
          loading={loading}
          dataSource={users}
          columns={userColumns}
          rowKey="id"
        />
      </div>
    </div>
  );
}

export default AdminDashboard;
