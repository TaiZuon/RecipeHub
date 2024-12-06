import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";

const AddIngredient = () => {
  const [ingredient, setIngredient] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/api/ingredients", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: ingredient }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Ingredient added successfully!");
        setIngredient("");
      })
      .catch((err) => console.error(err));
  };

  return (
    <Box sx={{ maxWidth: 400, margin: "auto", mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Add Ingredient
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Ingredient Name"
          value={ingredient}
          onChange={(e) => setIngredient(e.target.value)}
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default AddIngredient;
