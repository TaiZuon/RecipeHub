package com.recipehub.recipe_service.dto.request;

import com.recipehub.recipe_service.Enum.UnitType;
import com.recipehub.recipe_service.dto.IngredientImageDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.List;


@Data
@AllArgsConstructor
@Builder
public class RecipeIngredientRequest {
    private  Long recipeId;
    private Long ingredientId;
}
