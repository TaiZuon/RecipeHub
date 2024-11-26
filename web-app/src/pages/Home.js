import React from "react";
import { Typography, Container, Box } from "@mui/material";

const Home = () => {
  return (
    <Container>
      <Box sx={{ textAlign: "center", marginTop: 4 }}>
        <Typography variant="h4">Welcome to RecipeHub!</Typography>
        <Typography variant="body1" sx={{ marginTop: 2 }}>
          Discover and share your favorite recipes.
        </Typography>
      </Box>
    </Container>
  );
};

export default Home;
