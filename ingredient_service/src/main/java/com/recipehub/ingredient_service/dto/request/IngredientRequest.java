package com.recipehub.ingredient_service.dto.request;

import com.recipehub.ingredient_service.Enum.UnitType;
import com.recipehub.ingredient_service.dto.IngredientImageDto;
import com.recipehub.ingredient_service.model.IngredientImage;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class IngredientRequest {
    private String name;
    private UnitType unit;
    private List<IngredientImageDto> imageUrls;
}
