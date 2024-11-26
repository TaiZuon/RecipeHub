import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Recipes from "./pages/Recipes";
import RecipesList from "./pages/RecipeList";
import AddRecipe from "./pages/AddRecipe";
import AdminDashboard from "./pages/AdminDashboard";
import AddCategory from "./pages/AddCategory";
import AddIngredient from "./pages/AddIngredient";
import ReviewRecipe from "./pages/ReviewRecipe";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<RecipesList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/add-recipe" element={<AddRecipe />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/add-category" element={<AddCategory />} />
        <Route path="/add-ingredient" element={<AddIngredient />} />
        <Route
          path="/recipe/:id/review"
          element={<ReviewRecipe recipeId="1" />}
        />{" "}
        {/* Replace 1 with dynamic ID */}
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
