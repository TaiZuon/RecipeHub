// src/components/Home.js
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";

function Home() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome to RecipeHub</h1>
      <p>Discover and share your favorite recipes.</p>
      <div>
        <Button type="primary" style={{ marginRight: "10px" }}>
          <Link to="/login">Login</Link>
        </Button>
        <Button type="default">
          <Link to="/register">Register</Link>
        </Button>
      </div>
    </div>
  );
}

export default Home;
