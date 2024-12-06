import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RecipeList from "./pages/RecipeList";
import RecipeForm from "./pages/RecipeForm";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";
import { Layout } from "antd";

function App() {
  return (
    <Layout>
      <Navbar />
      <Layout.Content style={{ padding: "50px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/recipes" element={<RecipeList />} />
          <Route path="/add-recipe" element={<RecipeForm />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </Layout.Content>
    </Layout>
  );
}

export default App;
