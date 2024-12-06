import React, { useEffect, useState } from "react";
import { Table } from "antd";
import axios from "../axios";

function RecipeList() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("/recipes");
        setRecipes(response.data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };
    fetchRecipes();
  }, []);

  const columns = [
    {
      title: "Recipe Name",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <span>
          <a>Edit</a>
        </span>
      ),
    },
  ];

  return (
    <div>
      <h2>Recipes</h2>
      <Table dataSource={recipes} columns={columns} rowKey="id" />
    </div>
  );
}

export default RecipeList;
