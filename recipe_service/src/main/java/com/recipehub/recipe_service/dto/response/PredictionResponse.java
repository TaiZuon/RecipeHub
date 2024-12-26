package com.recipehub.recipe_service.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class PredictionResponse {
    @JsonProperty("Ingredients")
    private List<String> ingredients;
    @JsonProperty("Instructions")
    private String instructions;

    // Getter và Setter
    public List<String> getIngredients() {
        return ingredients;
    }

    public void setIngredients(List<String> ingredients) {
        this.ingredients = ingredients;
    }

    public String getInstructions() {
        return instructions;
    }

    public void setInstructions(String instructions) {
        this.instructions = instructions;
    }
}
