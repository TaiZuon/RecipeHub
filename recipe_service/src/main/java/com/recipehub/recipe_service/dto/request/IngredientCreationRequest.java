package com.recipehub.recipe_service.dto.request;

import com.recipehub.recipe_service.Enum.UnitType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class IngredientCreationRequest {
    private String name;
    private BigDecimal quantity;
    private UnitType unit;
}
