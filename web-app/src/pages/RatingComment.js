import React, { useState } from "react";
import { TextField, Button, Box, Typography, Rating } from "@mui/material";

const ReviewRecipe = ({ recipeId }) => {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`/api/recipes/${recipeId}/reviews`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ review, rating }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Review submitted successfully!");
        setReview("");
        setRating(0);
      })
      .catch((err) => console.error(err));
  };

  return (
    <Box sx={{ maxWidth: 600, margin: "auto", mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Leave a Review
      </Typography>
      <form onSubmit={handleSubmit}>
        <Rating
          value={rating}
          onChange={(e, newValue) => setRating(newValue)}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Your Review"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          multiline
          rows={4}
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default ReviewRecipe;
