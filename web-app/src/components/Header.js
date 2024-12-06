import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            RecipeHub
          </Link>
        </Typography>
        <Box>
          {/* Thêm công thức */}
          <Button color="inherit">
            <Link
              to="/add-recipe"
              style={{ textDecoration: "none", color: "white" }}
            >
              Add Recipe
            </Link>
          </Button>

          {/* Hiển thị công thức */}
          <Button color="inherit">
            <Link
              to="/recipes"
              style={{ textDecoration: "none", color: "white" }}
            >
              Browse Recipes
            </Link>
          </Button>

          {/* Thêm danh mục */}
          <Button color="inherit">
            <Link
              to="/add-category"
              style={{ textDecoration: "none", color: "white" }}
            >
              Add Category
            </Link>
          </Button>

          {/* Thêm nguyên liệu */}
          <Button color="inherit">
            <Link
              to="/add-ingredient"
              style={{ textDecoration: "none", color: "white" }}
            >
              Add Ingredient
            </Link>
          </Button>

          {/* Quản lý của admin */}
          <Button color="inherit">
            <Link
              to="/admin"
              style={{ textDecoration: "none", color: "white" }}
            >
              Admin
            </Link>
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
