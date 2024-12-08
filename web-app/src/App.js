import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import RecipeDetails from "./pages/RecipeDetails";
import AdminPage from "./pages/AdminPage";
import AddRecipePage from "./pages/AddRecipePage";
import AddIngredientPage from "./pages/AddIngredientPage";
import "./App.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/recipe/:id" element={<RecipeDetails />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/add-recipe" element={<AddRecipePage />} />
        <Route path="/add-ingredient" element={<AddIngredientPage />} />
      </Routes>
    </Router>
  );
};

export default App;
