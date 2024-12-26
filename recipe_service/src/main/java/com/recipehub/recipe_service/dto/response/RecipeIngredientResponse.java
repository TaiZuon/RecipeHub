package com.recipehub.recipe_service.dto.response;

import com.recipehub.recipe_service.Enum.UnitType;
import com.recipehub.recipe_service.dto.IngredientDto;
import com.recipehub.recipe_service.dto.IngredientImageDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.List;


@Data
@AllArgsConstructor
@Builder
public class RecipeIngredientResponse {
    private Long id;
    private  Long recipe;
    private Long ingredientId;
    private String name;
    private UnitType unit;
    private List<IngredientImageDto> ingredientImages;
    private Double quantity;
}
