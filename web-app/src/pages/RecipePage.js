import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function RecipePage() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    axios
      .get(`/api/recipes/${id}`)
      .then((response) => {
        setRecipe(response.data);
      })
      .catch((error) => console.log(error));
  }, [id]);

  return (
    <div>
      {recipe ? (
        <div>
          <h1>{recipe.name}</h1>
          <img src={recipe.image} alt={recipe.name} />
          <p>{recipe.description}</p>
          <h3>Nguyên liệu:</h3>
          <ul>
            {recipe.ingredients.map((ingredient) => (
              <li key={ingredient}>{ingredient}</li>
            ))}
          </ul>
          <h3>Hướng dẫn:</h3>
          <p>{recipe.instructions}</p>
        </div>
      ) : (
        <p>Đang tải công thức...</p>
      )}
    </div>
  );
}

export default RecipePage;
