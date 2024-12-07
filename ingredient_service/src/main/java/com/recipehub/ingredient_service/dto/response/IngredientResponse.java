package com.recipehub.ingredient_service.dto.response;

import com.recipehub.ingredient_service.Enum.UnitType;
import com.recipehub.ingredient_service.model.Ingredient;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.util.UUID;

@Data
@AllArgsConstructor
@Builder
public class IngredientResponse {
    private Long ingredientId;
    private String name;
    private BigDecimal quantity;
    private UnitType unit;
}
