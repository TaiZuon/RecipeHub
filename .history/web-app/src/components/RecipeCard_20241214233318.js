// RecipeCard.js
import React from "react";
import { Card, Col } from "antd";
import { Link } from "react-router-dom";

const RecipeCard = ({ recipe, lastPostElementCallback }) => {
  return (
    <Col span={8} key={recipe.recipeId} ref={lastPostElementCallback}>
      <Card
        title={recipe.title}
        extra={<Link to={`/recipe/${recipe.recipeId}`}>Xem chi tiết</Link>}
        cover={
          <img alt={recipe.title} src={recipe.recipeImages[0]?.imageUrl} />
        }
      >
        {recipe.description}
      </Card>
    </Col>
  );
};

export default RecipeCard;
