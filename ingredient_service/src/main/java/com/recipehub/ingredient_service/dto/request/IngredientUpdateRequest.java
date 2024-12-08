package com.recipehub.ingredient_service.dto.request;

import com.recipehub.ingredient_service.Enum.UnitType;
import com.recipehub.ingredient_service.dto.IngredientImageDto;
import lombok.Data;

import java.util.List;

@Data
public class IngredientUpdateRequest {
    private String name;

    private List<IngredientImageDto> ingredientImages;
    private List<String> newImages;

    public boolean hasNewImages() {
        return newImages != null && newImages.isEmpty();
    }
}
