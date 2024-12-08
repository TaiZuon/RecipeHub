package com.recipehub.ingredient_service.dto.request;

import com.recipehub.ingredient_service.Enum.UnitType;
import com.recipehub.ingredient_service.dto.IngredientImageDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class IngredientRequest {
    private String name;
    private List<IngredientImageDto> imageUrls;
}
