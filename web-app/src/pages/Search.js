import React from "react";
import { Typography, Container, Box } from "@mui/material";

const Recipes = () => {
  return (
    <Container>
      <Box sx={{ textAlign: "center", marginTop: 4 }}>
        <Typography variant="h4">Recipe List</Typography>
        <Typography variant="body1" sx={{ marginTop: 2 }}>
          Coming soon!
        </Typography>
      </Box>
    </Container>
  );
};

export default Recipes;
