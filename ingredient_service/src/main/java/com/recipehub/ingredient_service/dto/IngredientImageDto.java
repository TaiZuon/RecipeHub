package com.recipehub.ingredient_service.dto;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Builder
@Getter
@Setter
public class IngredientImageDto {
    private String imageUrl;
    private Boolean isPrimary;

}
