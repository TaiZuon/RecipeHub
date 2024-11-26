import React from "react";
import { Typography, Box } from "@mui/material";

const Footer = () => {
  return (
    <Box sx={{ textAlign: "center", padding: 2, backgroundColor: "#f5f5f5" }}>
      <Typography variant="body2">
        © 2024 RecipeHub. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
