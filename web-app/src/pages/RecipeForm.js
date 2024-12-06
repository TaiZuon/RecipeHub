import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import axios from "../axios";

function RecipeForm() {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await axios.post("/recipes", {
        title,
        ingredients,
        instructions,
      });
      message.success("Recipe added successfully");
    } catch (error) {
      message.error("Error adding recipe");
    }
  };

  return (
    <div>
      <h2>Add Recipe</h2>
      <Form onFinish={handleSubmit}>
        <Form.Item label="Title" name="title" rules={[{ required: true }]}>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        </Form.Item>
        <Form.Item
          label="Ingredients"
          name="ingredients"
          rules={[{ required: true }]}
        >
          <Input
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          label="Instructions"
          name="instructions"
          rules={[{ required: true }]}
        >
          <Input.TextArea
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default RecipeForm;
