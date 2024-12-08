package com.recipehub.ingredient_service.dto;

import com.recipehub.ingredient_service.Enum.UnitType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class IngredientDto {
    private Long id;
    private String name;
    private List<IngredientImageDto> ingredientImages;
}
