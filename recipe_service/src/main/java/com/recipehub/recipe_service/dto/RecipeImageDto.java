package com.recipehub.recipe_service.dto;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Builder
@Getter
@Setter
public class RecipeImageDto {
    private String imageUrl;
    private Boolean isPrimary;
}
