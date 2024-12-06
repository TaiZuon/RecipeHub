import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";

const AddCategory = () => {
  const [category, setCategory] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: category }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Category added successfully!");
        setCategory("");
      })
      .catch((err) => console.error(err));
  };

  return (
    <Box sx={{ maxWidth: 400, margin: "auto", mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Add Category
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Category Name"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default AddCategory;
