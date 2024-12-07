package com.recipehub.ingredient_service.dto.request;

import com.recipehub.ingredient_service.Enum.UnitType;

import java.math.BigDecimal;
import java.util.UUID;

public class RecipeIngredientCreation {
    private Long ingredientId;
    private String name;
    private BigDecimal quantity;
    private UnitType unit;
}