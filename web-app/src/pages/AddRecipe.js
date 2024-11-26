import React, { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";

const AddRecipe = () => {
  const [recipe, setRecipe] = useState({
    title: "",
    ingredients: "",
    instructions: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleFileChange = (e) => {
    setRecipe({ ...recipe, image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Gửi dữ liệu đến backend
    const formData = new FormData();
    formData.append("title", recipe.title);
    formData.append("ingredients", recipe.ingredients);
    formData.append("instructions", recipe.instructions);
    formData.append("image", recipe.image);

    fetch("/api/recipes", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Recipe added successfully!");
        setRecipe({
          title: "",
          ingredients: "",
          instructions: "",
          image: null,
        });
      })
      .catch((err) => console.error(err));
  };

  return (
    <Box sx={{ maxWidth: 600, margin: "auto", mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Add a Recipe
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          label="Recipe Title"
          name="title"
          value={recipe.title}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Ingredients"
          name="ingredients"
          value={recipe.ingredients}
          onChange={handleChange}
          multiline
          rows={4}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Instructions"
          name="instructions"
          value={recipe.instructions}
          onChange={handleChange}
          multiline
          rows={6}
        />
        <Button variant="contained" component="label" sx={{ mt: 2 }}>
          Upload Image
          <input type="file" hidden onChange={handleFileChange} />
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default AddRecipe;
