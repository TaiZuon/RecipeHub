import React, { useState, useEffect } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@mui/material";

const AdminDashboard = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch("/api/admin/recipes")
      .then((res) => res.json())
      .then((data) => setRecipes(data))
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = (id) => {
    fetch(`/api/admin/recipes/${id}`, { method: "DELETE" })
      .then((res) => res.json())
      .then(() => {
        alert("Recipe deleted");
        setRecipes(recipes.filter((recipe) => recipe.id !== id));
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Ingredients</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {recipes.map((recipe) => (
            <TableRow key={recipe.id}>
              <TableCell>{recipe.title}</TableCell>
              <TableCell>{recipe.ingredients.substring(0, 50)}...</TableCell>
              <TableCell>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => alert("Edit not implemented")}
                >
                  Edit
                </Button>
                <Button
                  color="secondary"
                  variant="contained"
                  onClick={() => handleDelete(recipe.id)}
                  sx={{ ml: 2 }}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminDashboard;
