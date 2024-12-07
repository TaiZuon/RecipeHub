package com.recipehub.recipe_service.dto.response;

import com.recipehub.recipe_service.Enum.UnitType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.util.UUID;

@Data
@AllArgsConstructor
@Builder
public class IngredientResponse {
    private UUID ingredientId;
    private String name;
    private BigDecimal quantity;
    private UnitType unit;
}
