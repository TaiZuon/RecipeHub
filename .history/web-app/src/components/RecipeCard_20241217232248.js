import React from "react";
import { Link } from "react-router-dom";

const RecipeCard = ({ recipe, lastPostElementCallback }) => {
  return (
    <div className="w-full p-2" ref={lastPostElementCallback}>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <img
          alt={recipe.title}
          src={recipe.recipeImages[0]?.imageUrl}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h3 className="text-lg font-bold">{recipe.title}</h3>
          <p>{recipe.description}</p>
          <Link to={`/recipe/${recipe.recipeId}`} className="text-blue-600">
            Xem chi tiết
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;