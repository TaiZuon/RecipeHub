import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Home() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    axios
      .get("/api/recipes")
      .then((response) => {
        setRecipes(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <h1>Danh Sách Công Thức</h1>
      <div>
        {recipes.map((recipe) => (
          <div key={recipe.id}>
            <h3>{recipe.name}</h3>
            <p>{recipe.description}</p>
            <Link to={`/recipe/${recipe.id}`}>Xem chi tiết</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
