package com.recipehub.recipe_service.dto;

import com.recipehub.recipe_service.Enum.UnitType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class IngredientDto {
    private Long id;
    private String name;
    private UnitType unit;
    private List<IngredientImageDto> ingredientImages;
}
